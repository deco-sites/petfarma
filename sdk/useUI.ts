/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */
import { Product } from "apps/commerce/types.ts";
import { signal } from "@preact/signals";

const isScrollActive = signal(false);
const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);
const displayMenuProducts = signal(false);
const productsChild = signal({ label: "", children: [], href: "" });
const productsBuyTogether = signal<Product[]>([]);
const filtersUrl = signal("https://petfarma.deco.site/");
function updateQueryParam(
  url: string,
  label: string,
  value: string,
): boolean {
  let isChecked;
  const urlObject = new URL(url);
  const searchParams = urlObject.searchParams;
  const searchParamsArray = Array.from(searchParams);

  const key = `type_tags[${label}][]`;

  const isToRemove = searchParamsArray.some((ele) =>
    JSON.stringify(ele) === JSON.stringify([key, value])
  );

  if (isToRemove) {
    const searchParamsArrayFiltered = searchParamsArray.filter((params) =>
      params[1] !== value
    );

    // Limpar todos os parâmetros
    searchParamsArray.forEach((item) => {
      urlObject.searchParams.delete(item[0]);
    });

    // Adicionar os parâmetros filtrados de volta
    searchParamsArrayFiltered.forEach((item) => {
      urlObject.searchParams.append(item[0], item[1]);
    });

    isChecked = false;
  } else {
    searchParams.append(key, value);
    isChecked = true;
  }
  filtersUrl.value = urlObject.href;
  return isChecked;
}
const selectedFilters = signal<
  {
    label: string;
    filterLabel: string;
    url: string;
    ref: React.RefObject<HTMLDivElement>;
  }[]
>([]);

const getFiltersByUrl = (url: string) => {
  const windowSearchParams = new URL(window.location.href).searchParams;
  const filterSearchParams = new URL(url).searchParams;
  const windowParams = Array.from(windowSearchParams);
  const searchParams = Array.from(filterSearchParams);

  if (windowParams.length > searchParams.length) {
    const [_key, label] = windowParams.find(([key, value]) =>
      !searchParams.some(([k, v]) => k === key && v === value)
    ) as [string, string];

    console.log(label, windowParams, searchParams, url);
    return label;
  }

  const lastParam = searchParams.pop() as [string, string];
  const [_lastKey, lastValue] = lastParam;

  return lastValue;
};

const state = {
  isScrollActive,
  displayCart,
  displayMenu,
  displaySearchPopup,
  displaySearchDrawer,
  displayMenuProducts,
  productsChild,
  productsBuyTogether,
  filtersUrl,
  selectedFilters,
  updateQueryParam,
  getFiltersByUrl,
};

// Keyboard event listeners
addEventListener("keydown", (e: KeyboardEvent) => {
  const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    displaySearchPopup.value = true;
  }
});

export const useUI = () => state;
