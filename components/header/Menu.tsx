import Icon from "$store/components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";

export interface Props {
  items: SiteNavigationElement[];
  highlightedItem?: {
    label?: string;
    href?: string;
  };
}

interface MenuItemProps {
  item: SiteNavigationElement;
  onBack: () => void;
  onClose?: () => void;
}

function MenuItem({ item, onBack, onClose }: MenuItemProps) {
  const [isOpen, setIsOpen] = useState(false); // Adicione um estado para controlar a abertura do menu

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose(); // Chama onClose se estiver definido
  };

  return (
    <div
      class={`px-4 py-2 flex items-center relative justify-between ${
        isOpen ? "z-10" : ""
      }`}
    >
      <div
        class="flex items-center justify-between w-full"
        onClick={handleToggle}
      >
        <div class="uppercase cursor-pointer leading-[35px]">
          {item.name}
        </div>
        {item.children && item.children.length > 0 && (
          <Icon
            id="ChevronRight"
            class={`mr-[10px] h-4 w-4 transform ${isOpen ? "rotate-90" : ""}`}
            size={20}
            strokeWidth={2}
          />
        )}
      </div>
      {isOpen && (
        <>
          <div
            class="fixed inset-0 bg-black opacity-50 transition-opacity"
            onClick={onBack}
          >
          </div>
          <div class="fixed inset-0 w-full h-full overflow-y-auto bg-white border transform transition-transform duration-300 ease-in-out overflow-scroll">
            <div class="flex justify-between items-center px-4 py-4">
              <div class="flex items-center justify-center w-[40px] h-[40px] bg-[#0F9B3E1A] rounded-md">
                <Icon
                  id="ChevronLeft"
                  class="mr-2 h-4 w-4 cursor-pointer"
                  size={20}
                  strokeWidth={2}
                  onClick={handleClose}
                />
              </div>
              <span class="uppercase leading-[35px] text-lg font-normal">
                {item.name}
              </span>
              <Button
                class="btn btn-ghost bg-[#c829261a] w-[40px] p-[10px] rounded-md"
                onClick={handleClose}
              >
                <Icon id="XMark" size={20} strokeWidth={2} />
              </Button>
            </div>
            <ul>
              {item.children?.map((node) => (
                <li key={node.name}>
                  <div class="px-4 py-2">
                    <a
                      class="uppercase cursor-pointer leading-[35px]"
                      href={node.url}
                    >
                      {node.name}
                    </a>
                  </div>
                </li>
              ))}
              <li class="px-4 py-2">
                <a class="underline text-sm text-[#0F9B3E]" href={item.url}>
                  Ver tudo em {item.name}
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function Menu({ items, highlightedItem }: Props) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleBack = () => {
    setSelectedCategory(null);
  };

  return (
    <div class="flex flex-col">
      <ul class="flex flex-col divide-y divide-base-200">
        {items.map((item) => (
          <li key={item.name}>
            {/* Adicione a propriedade 'onBack' aqui */}
            <MenuItem item={item} onBack={handleBack} />
          </li>
        ))}
        <li class="flex items-center w-auto px-4 py-2 text-white uppercase h-[60px]">
          <a
            class="font-semibold px-4 py-2 bg-[#C82926] text-sm hover:scale-110 rounded-md"
            href={highlightedItem?.href}
          >
            OUTLET
          </a>
        </li>
      </ul>

      <ul class="flex flex-col items-baseline">
        <li class="w-full py-3 px-4">
          <a
            class="btn btn-circle btn-sm btn-ghost flex flex-row w-full gap-[10px] justify-start"
            href="/login"
            aria-label="Log in"
          >
            <div class="flex items-center justify-center w-[35px] h-[35px] bg-[#0F9B3E1A] rounded-md">
              <Icon id="UserHeader" class="" size={20} strokeWidth={2} />
            </div>
            <span class="normal-case">Entrar</span>
          </a>
        </li>
        <li class="w-full py-3 px-4">
          <a
            class="w-full btn btn-circle btn-sm btn-ghost flex flex-row gap-[10px] justify-start"
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
        </li>
        <li class="w-full py-3 px-4">
          <a
            class="w-full btn btn-circle btn-sm btn-ghost flex flex-row gap-[10px] justify-start"
            href="/login"
            aria-label="Help"
          >
            <div class="flex items-center justify-center w-[35px] h-[35px] bg-[#0F9B3E1A] rounded-md">
              <Icon
                id="ShoppingCart"
                class=""
                size={20}
                strokeWidth={2}
              />
            </div>
            <span class="normal-case">Minha Sacola</span>
          </a>
        </li>
        <li>
          {/* <CartButtonVDNA /> */}
        </li>
      </ul>
    </div>
  );
}

export default Menu;
