import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ShippingSimulate from "$store/islands/ShippingSimulation.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { AppContext } from "apps/vnda/mod.ts";

export interface Style {
  /** @description number in PX */
  gap: number;
}

export interface Props {
  page: ProductDetailsPage | null;
  style: Style;
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const [productWithAdditionalProperty] = await ctx.get({
    "__resolveType": "vnda/loaders/productList.ts",
    "tags": [],
    count: 1,
    "ids": [props.page?.product.inProductGroupWithID],
  }) as unknown as Product[];
  return {
    ...props,
    page: {
      ...props.page,
      product: {
        ...props.page?.product,
        additionalProperty: productWithAdditionalProperty.additionalProperty,
      },
    },
  };
};

function ProductDetails({ page, style }: Props) {
  if (page === null) {
    return <></>;
  }

  const divider = <div class="w-full h-[1px] bg-black bg-opacity-10" />;

  const { product, breadcrumbList } = page;
  const { offers, productID, additionalProperty = [] } = product;
  const { price = 0, listPrice = 0, seller, installments, availability } =
    useOffer(
      offers,
    );

  const percent = Math.floor(
    ((listPrice - price) / listPrice) * 100,
  );

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList.itemListElement.slice(0, -1) ?? [],
    numberOfItems: breadcrumbList.itemListElement.length - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const marca = additionalProperty?.find(({ name }) => name?.includes("marca"));

  const formatedMarca = marca?.value ? JSON.parse(marca.value) : false;

  const destaque = additionalProperty?.find(({ name }) =>
    name?.includes("destaque")
  );

  const formatedDestaque = destaque?.value ? JSON.parse(destaque.value) : false;

  const hasDogFlag = additionalProperty?.some(({ name }) =>
    name?.includes("cachorro")
  );

  const hasCatFlag = additionalProperty?.some(({ name }) =>
    name?.includes("gato")
  );

  return (
    <div class="flex flex-col lg:max-w-[391px]" style={{ gap: style.gap }}>
      <div class="flex flex-row gap-4">
        {formatedDestaque && (
          <p class="bg-[#0F9B3E]  text-white rounded-md font-medium text-xs py-1 px-2">
            {formatedDestaque.title}
          </p>
        )}
        {hasDogFlag && (
          <div class="bg-[#F9F9F9] rounded-md p-2">
            <Icon id="DogShield" width={20} height={21} />
          </div>
        )}
        {hasCatFlag && (
          <div class="bg-[#F9F9F9] rounded-md p-2">
            <Icon id="CatShield" width={20} height={21} />
          </div>
        )}
      </div>
      {formatedMarca && (
        <p class="font-semibold text-[14px] text-[#202020] text-opacity-60">
          {formatedMarca.title}
        </p>
      )}
      <h1>
        <span class="font-bold text-[20px]">{product.name}</span>
      </h1>
      <>{divider}</>
      {/* Prices */}
      <div>
        <div class="flex flex-row gap-2 items-center">
          <span class="font-bold text-xl text-[#449E6A]">
            {formatPrice(price)}
          </span>
          <span class="line-through text-base-300 text-xs">
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </span>
          {percent > 0 && price && listPrice && (
            <p class="bg-[#C82926]  text-white rounded-md font-medium text-xs py-1 px-2">
              {(((listPrice - price) / listPrice) * 100).toString().split(
                ".",
              )[0]}% OFF
            </p>
          )}
        </div>
        {price && (
          <span class="text-sm text-base-300">
            até 10x de <b>{formatPrice(price / 10)}</b> sem juros
          </span>
        )}
      </div>
      {availability === "https://schema.org/InStock"
        ? (
          <AddToCartButtonVNDA
            eventParams={{ items: [eventItem] }}
            productID={productID}
            additionalProperty={additionalProperty}
          />
        )
        : <OutOfStock productID={productID} />}
      <ShippingSimulate skuId={product!.sku} />
    </div>
  );
}

export default ProductDetails;
