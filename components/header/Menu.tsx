// import type { INavItem } from "./NavItem.tsx";
import Button from "$store/components/ui/Button.tsx";
import IconChevronRight from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/chevron-right.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import type { NavItem } from "./Header.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  items: NavItem[] | [];
  paths: { loginHref: string; helpHref: string };
}

function Menu({ items, paths }: Props) {
  const {
    displayMenuProducts,
    displayMenu,
    productsChild,
  } = useUI();

  return (
    <div class="flex flex-col h-auto w-full">
      <ul class="flex flex-col uppercase text-xs">
        {items?.map((item, index) => (
          <li class="font-medium">
            {item.children !== undefined && item.children?.length > 0
              ? (
                <Button
                  class={`flex border-b-[1px] items-center justify-between py-3 uppercase m-auto w-full bg-white font-bold text-[14px] leading-[17.5px] ${
                    items.length - 1 === index
                      ? "bg-[#C82926] text-white"
                      : "text-[#202020]"
                  } hover:bg-inherit border-black border-opacity-10`}
                  onClick={() => {
                    displayMenuProducts.value = true;
                    displayMenu.value = false;
                    productsChild.value = {
                      label: item.label,
                      children: item.children,
                      href: item.href,
                      // deno-lint-ignore no-explicit-any
                    } as any;
                  }}
                >
                  {item.label}
                  <IconChevronRight class="w-5 h-5" />
                </Button>
              )
              : (
                <a
                  href={item.href}
                  class={`flex border-b-[1px] items-center justify-between px-4 py-4 uppercase m-auto w-full bg-white font-bold text-[14px] leading-[17.5px]`}
                >
                  <span
                    class={` ${
                      index === items.length - 1
                        ? "bg-[#C82926] text-white px-4 py-2 rounded-md"
                        : "text-[#202020]"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              )}
          </li>
        ))}
      </ul>
      <ul class="flex flex-col text-[#202020]">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href={paths.loginHref}
          >
            <span class="rounded-md w-9 h-9 flex items-center justify-center bg-primary bg-opacity-10">
              <Icon id="UserHeader" size={20} strokeWidth={2} />
            </span>
            <span class="text-[14px] leading-[17.5px] font-semibold">
              Entrar
            </span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href={paths.helpHref}
          >
            <span class="rounded-md w-9 h-9 flex items-center justify-center bg-primary bg-opacity-10">
              <Icon id="QuestionMarkCircleHeader" size={20} strokeWidth={2} />
            </span>
            <span class="text-[14px] leading-[17.5px] font-semibold">
              Ajuda
            </span>
          </a>
        </li>
        <li class="flex items-center gap-4 px-4 py-2">
          <CartButtonVDNA />
          <span class="text-[14px] leading-[17.5px] font-semibold">
            Minha Sacola
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
