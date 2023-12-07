// deno-lint-ignore-file no-explicit-any
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";

function MenuProducts() {
  const {
    displayMenuProducts,
    productsChild,
  } = useUI();

  return (
    <div class="w-full">
      <ul class="w-full h-full">
        {productsChild.value.children.map((node: any) => (
          <li class="w-full">
            <a
              href={node.href}
              class="flex items-center justify-start gap-4 w-full text-[#202020] px-4 font-semibold text-sm border-b-[1px] py-4 before:block before:w-[4px] before:h-[4px] before:bg-black"
            >
              {node.label}
            </a>
          </li>
        ))}
        <li class="w-full">
          <Button
            class="py-3 border-none w-full text-[#202020] bg-base-100 hover:bg-inherit text-left"
            onClick={() => {
              displayMenuProducts.value = false;
            }}
          >
            {productsChild.value.href && (
              <a
                class="font-semibold w-full text-[#202020]"
                href={productsChild.value.href}
              >
                {`Ver tudo em ${productsChild.value.label}`}
              </a>
            )}
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default MenuProducts;
