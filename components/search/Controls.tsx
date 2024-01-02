import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "pageInfo" | "sortOptions">
  & {
    displayFilter?: boolean;
    productsInPage: number;
  };

function SearchControls(
  { filters, pageInfo, displayFilter, sortOptions, productsInPage }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden w-screen max-w-[475px]">
            <div class="flex justify-start items-center gap-4 w-11/12 mx-auto">
              <Button
                class="btn btn-ghost bg-[#c829261a] w-[40px] p-[10px] rounded-md"
                onClick={() => open.value = false}
              >
                <Icon id="XMark" size={20} strokeWidth={2} />
              </Button>
              <Icon id="sliders" class="text-black" size={20} />
              <h2 class="py-3">
                <span class="font-medium text-2xl">Filtrar</span>
              </h2>
            </div>
            <div class="flex-grow overflow-auto  w-11/12 mx-auto mb-[75px]">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-between items-start lg:items-center gap-4 lg:flex-row lg:h-[53px]">
        <span class="font-semibold text-black text-opacity-60 text-[14px]">
          {pageInfo.records ?? productsInPage} produtos encontrados
        </span>
        <div class="flex flex-row items-center justify-between lg:gap-4 lg:border-none w-full lg:w-[300px]">
          <Button
            class={displayFilter
              ? "btn-ghost flex-grow max-w-[350px]"
              : "btn-ghost lg:hidden flex-grow justify-between font-bold text-black uppercase h-[55px] max-h-[55px] max-w-[350px]"}
            onClick={() => {
              open.value = true;
            }}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
          >
            Filtrar
            <Icon id="sliders" class="text-black" size={20} />
          </Button>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
