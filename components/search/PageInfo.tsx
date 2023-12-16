import Icon from "$store/components/ui/Icon.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";

function PageInfo(
  { pageInfo, productsInPage }: {
    pageInfo: ProductListingPage["pageInfo"];
    productsInPage: number;
  },
) {
  const records = pageInfo.records ?? productsInPage;
  const recordPerPage = pageInfo.recordPerPage ?? 1;
  const value = Math.ceil(records / recordPerPage);
  return (
    <div class="join">
      <a
        aria-label="previous page link"
        rel="prev"
        href={pageInfo.previousPage ?? "#"}
        class={`btn btn-ghost join-item`}
      >
        <Icon
          id="ChevronLeft"
          width={30}
          height={30}
          strokeWidth={pageInfo.previousPage ? 1 : 0.5}
        />
      </a>
      <span class="btn btn-ghost join-item">
        {`Página ${pageInfo.currentPage} de ${value}`}
      </span>
      <a
        aria-label="next page link"
        rel="next"
        href={pageInfo.nextPage ?? "#"}
        class="btn btn-ghost join-item"
      >
        <Icon
          id="ChevronRight"
          width={30}
          height={30}
          strokeWidth={pageInfo.nextPage ? 1 : 0.5}
        />
      </a>
    </div>
  );
}

export default PageInfo;
