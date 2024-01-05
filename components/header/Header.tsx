import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert from "./Alert.tsx";
import { Props as AlertProps } from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";
import { getCookies } from "std/http/cookie.ts";
import { AppContext } from "apps/vnda/mod.ts";
import ScrollableContainer from "$store/components/ui/ScrollableContainer.tsx";

export interface NavItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    href?: string;
  }[];
  image?: {
    src?: ImageWidget;
    alt?: string;
  };
}

export interface Props {
  alerts: AlertProps;

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[] | null;

  // quickSearchItems?: QuickSearchProps;

  paths: { loginHref: string; loggedHref: string; helpHref: string };

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };
}

export function loader(props: Props, req: Request, _ctx: AppContext) {
  const cookies = getCookies(req.headers);

  const cookie = cookies["client_id"];

  return {
    ...props,
    paths: {
      ...props.paths,
      loginHref: cookie ? props.paths.loggedHref : props.paths.loginHref,
    },
  };
}

function Header({
  alerts,
  searchbar,
  navItems,
  logo,
  paths,
}: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{
            items,
            paths,
          }}
          logo={logo}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-base-100 fixed lg:w-full z-50 border-b">
          <ScrollableContainer>
            <Alert {...alerts} />
          </ScrollableContainer>
            <Navbar
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
              paths={paths}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
