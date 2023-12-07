import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import Image from "apps/website/components/Image.tsx";
import { lazy, Suspense } from "preact/compat";
import type { ImageWidget } from "apps/admin/widgets.ts";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const MenuProducts = lazy(() =>
  import("$store/components/header/MenuProducts.tsx")
);

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
  logo?: { src: ImageWidget; alt: string };
}

const Aside = (
  { title, onClose, children, chevronClick, logo }: {
    title?: string;
    onClose?: () => void;
    children: ComponentChildren;
    chevronClick?: () => void;
    logo?: { src: ImageWidget; alt: string };
  },
) => (
  <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y w-[100vw] max-w-[425px]">
    <div class="flex justify-between items-center p-4">
      {chevronClick && (
        <Button
          class="btn btn-ghost bg-[#0F9B3E1A] w-[40px] p-[10px] rounded-md"
          onClick={chevronClick}
        >
          <Icon id="ChevronLeft" size={20} strokeWidth={2} />
        </Button>
      )}
      {logo && (
        <Image
          src={logo.src}
          alt={logo.alt}
          width={154}
          height={35}
        />
      )}
      {title && <span class="text-[14px]">{title}</span>}
      {onClose && (
        <Button
          class="btn btn-ghost bg-[#c829261a] w-[40px] p-[10px] rounded-md"
          onClick={onClose}
        >
          <Icon id="XMark" size={20} strokeWidth={2} />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, children, platform, logo }: Props) {
  const {
    displayCart,
    displayMenu,
    displayMenuProducts,
    productsChild,
  } = useUI();

  return (
    <Drawer // left drawer
      open={displayMenu.value}
      onClose={() => {
        displayMenu.value = false;
      }}
      aside={
        <Aside
          onClose={() => {
            displayMenu.value = false;
          }}
          logo={logo}
        >
          {displayMenu.value && <Menu {...menu} />}
        </Aside>
      }
    >
      <Drawer
        open={displayMenuProducts.value}
        onClose={() => displayMenuProducts.value = false}
        aside={
          <Aside
            title={productsChild.value.label}
            onClose={() => displayMenuProducts.value = false}
            chevronClick={() => {
              displayMenuProducts.value = false;
              displayMenu.value = true;
            }}
          >
            <MenuProducts />
          </Aside>
        }
      >
        <Drawer // right drawer
          class="drawer-end"
          open={displayCart.value !== false}
          onClose={() => displayCart.value = false}
          aside={
            <Aside
              title="Minha sacola"
              onClose={() => displayCart.value = false}
            >
              <Cart platform={platform} />
            </Aside>
          }
        >
          {children}
        </Drawer>
      </Drawer>
    </Drawer>
  );
}

export default Drawers;
