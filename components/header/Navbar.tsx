import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import type { NavItem as INavItem } from "./Header.tsx";
import { navbarHeight } from "./constants.ts";

function Navbar({ items, searchbar, logo, paths }: {
  items: INavItem[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
  paths: { loginHref: string; helpHref: string };
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div style={{ height: navbarHeight }} class="flex flex-col lg:hidden">
        <div class="flex flex-row justify-between items-center w-full p-4 gap-2 bg-white">
          <MenuButton />

          {logo && (
            <a
              href="/"
              class="flex-grow inline-flex items-center justify-center"
              // style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <Image src={logo.src} alt={logo.alt} width={185} height={43} />
            </a>
          )}

          <div class="flex gap-1">
            <SearchButton />
            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
          </div>
        </div>
        <div class="flex-none flex items-center justify-end gap-2 w-full border bg-white lg:rounded-md">
          <SearchButton />
          <Searchbar searchbar={searchbar} />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden lg:flex flex-col">
        <div class="flex flex-row justify-between items-center border-b border-base-200 md:border-0 w-11/12 max-w-[1300px] jutify-center py-4 mx-auto gap-4">
          <div class="flex-none">
            {logo && (
              <a
                href="/"
                aria-label="Store logo"
                class="block w-full h-full"
              >
                <Image src={logo.src} alt={logo.alt} width={185} height={43} />
              </a>
            )}
          </div>
          <div class="flex-grow flex items-center justify-end gap-2 border rounded-md">
            <SearchButton />
            <Searchbar searchbar={searchbar} />
          </div>
          <div class="flex h-[35px] md:border-l pl-4 gap-6">
            <a
              class="btn btn-circle btn-sm btn-ghost flex flex-row w-auto gap-[10px]"
              href={paths.loginHref}
              aria-label="Log in"
            >
              <div class="flex items-center justify-center w-[35px] h-[35px] bg-[#0F9B3E1A] rounded-md">
                <Icon id="UserHeader" class="" size={20} strokeWidth={2} />
              </div>
              <span class="normal-case">Entrar ⮟</span>
            </a>
            <a
              class="btn btn-circle btn-sm btn-ghost flex flex-row w-auto gap-[10px]"
              href={paths.helpHref}
              aria-label="Help"
            >
              <div class="flex items-center justify-center w-[35px] h-[35px] bg-[#0F9B3E1A] rounded-md">
                <Icon
                  id="QuestionMarkCircleHeader"
                  class=""
                  size={20}
                  strokeWidth={2}
                />
              </div>
              <span class="normal-case">Ajuda</span>
            </a>
            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
          </div>
        </div>
        <ul class="flex-auto flex justify-between w-11/12 max-w-[1300px] h-[40px] pb-[6px] mx-auto">
          {items.map((item, index) => (
            <NavItem
              item={item}
              isLast={index === (items.length - 1) ? true : false}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
