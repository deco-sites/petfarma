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
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={126} height={16} />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-between items-center border-b border-base-200 md:border-0 w-full max-w-[1440px] px-10 h-[75px] md:mx-auto">
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
        {/* <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div> */}
        <div class="flex-none flex items-center justify-end gap-2">
          <SearchButton />
          <Searchbar searchbar={searchbar} />
          <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" size={24} strokeWidth={0.4} />
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
