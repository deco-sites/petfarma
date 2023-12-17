import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import PageInfo from "$store/components/search/PageInfo.tsx";
import CategoryBanner, {
  Category,
  Flags,
  LongText,
  ShortText,
} from "$store/components/ui/CategoryBanner.tsx";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  category: Category;
}

type LoaderProps = Omit<Props, "category"> & {
  category?: Category[];
};

export const loader = (
  { category = [], ...rest }: LoaderProps,
  req: Request,
) => {
  const banner = category.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { ...rest, category: banner };
};

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  startingPage = 0,
  category,
}: Omit<Props, "page"> & { page: ProductListingPage; category: Category }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  return (
    <>
      <div class="flex flex-col gap-4 mx-auto max-w-[1300px] w-11/12 py-10">
        <CategoryBanner
          banner={category &&
            { title: category?.title, image: category?.image }}
        />
        <div class="flex flex-row gap-4">
          {filters.length > 0 && (
            <aside class="hidden lg:block w-min min-w-[250px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex flex-col gap-6 flex-grow">
            <ShortText
              shortText={category?.shortText}
              title={category?.title}
            />
            <Flags
              flags={category?.flags?.flags}
              title={category?.flags?.title}
            />
            <SearchControls
              sortOptions={sortOptions}
              filters={filters}
              pageInfo={pageInfo}
              displayFilter={layout?.variant === "drawer"}
              productsInPage={products.length}
            />
            <div class="w-full h-[1px] bg-black bg-opacity-10" />
            <div class="flex-grow" id={id}>
              <ProductGallery
                products={products}
              />
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <PageInfo pageInfo={pageInfo} productsInPage={products.length} />
        </div>
        <LongText longText={category?.longText} />
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page || page.products.length === 0) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
