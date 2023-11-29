import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "./Alert.tsx";
import { Props as AlertProps } from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import QuickSearch from "./QuickSearch.tsx";
import { Props as QuickSearchProps } from "./QuickSearch.tsx";
import { headerHeight } from "./constants.ts";

export interface Props {
  alerts: AlertProps;

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  quickSearchItems?: QuickSearchProps;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };
}

function Header({
  alerts,
  searchbar,
  navItems,
  quickSearchItems,
  logo,
}: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-base-100 fixed sm:w-full z-50">
            <Alert {...alerts} />
            <Navbar
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
            />
            <QuickSearch {...quickSearchItems} />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
