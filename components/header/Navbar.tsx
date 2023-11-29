import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import CartButtonNuvemshop from "$store/islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";

function Navbar({ items, searchbar, logo }: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div // style={{ height: navbarHeight }}
       class="flex flex-col md:hidden">
        <div class="flex flex-row justify-between items-center w-full p-4 sm:pl-2 sm:pr-6 gap-2">
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
        <div class="flex-none flex items-center justify-end gap-2 w-full border rounded-md">
          <SearchButton />
          <Searchbar searchbar={searchbar} />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-between items-center border-b border-base-200 md:border-0 w-full max-w-[1440px] px-16 py-4 md:mx-auto">
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
        {
          /* <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div> */
        }
        <div class="flex-none flex items-center justify-end gap-2 md:w-[48.8%] border rounded-md">
          <SearchButton />
          <Searchbar searchbar={searchbar} />
        </div>
        <div class="flex md:w-[31.7%] h-[35px] md:border-l md:pl-8 gap-6">
          <a
            class="btn btn-circle btn-sm btn-ghost flex flex-row w-auto gap-[10px]"
            href="/login"
            aria-label="Log in"
          >
            <div class="flex items-center justify-center w-[35px] h-[35px] bg-[#0F9B3E1A] rounded-md">
              <Icon id="UserHeader" class="" size={20} strokeWidth={2} />
            </div>
            <span class="normal-case">Entrar ⮟</span>
          </a>
          <a
            class="btn btn-circle btn-sm btn-ghost flex flex-row w-auto gap-[10px]"
            href="/login"
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
          {platform === "wake" && <CartButtonWake />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
          {platform === "nuvemshop" && <CartButtonNuvemshop />}
        </div>
      </div>
    </>
  );
}

export default Navbar;
