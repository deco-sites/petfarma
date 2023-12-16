import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

type CustomFilterToggleValue = FilterToggleValue & {
  filterLabel: string;
};

function ValueItem(
  { url, selected, label, quantity, filterLabel }: CustomFilterToggleValue,
) {
  const { filtersUrl, updateQueryParam, selectedFilters } = useUI();
  const checkboxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    filtersUrl.value = window.location.href;

    if (selected) {
      const isDuplicate = selectedFilters.value.some(
        (item) => item.label === label && item.filterLabel === filterLabel,
      );

      if (!isDuplicate) {
        selectedFilters.value = [
          ...selectedFilters.value,
          { label, filterLabel, ref: checkboxRef },
        ];
      }
    }
  }, [selectedFilters, label, filterLabel]);

  return (
    <button
      onClick={() => {
        const isChecked = updateQueryParam(
          filtersUrl.value,
          filterLabel,
          label.toLowerCase(),
        );
        checkboxRef?.current?.setAttribute(
          "aria-checked",
          isChecked ? "true" : "false",
        );
        if (!isChecked) {
          selectedFilters.value = selectedFilters.value.filter((
            { label: labelF, filterLabel: filterLabelF },
          ) => labelF !== label || filterLabelF !== filterLabel);
        } else {
          selectedFilters.value = [...selectedFilters.value, {
            label,
            filterLabel,
            ref: checkboxRef,
          }];
        }
      }}
      href={url}
      rel="nofollow"
      class="flex items-center gap-2"
    >
      <div aria-checked={selected} ref={checkboxRef} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </button>
  );
}

function FilterValues({ key, values, label }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul class={`flex flex-wrap gap-2 ${flexDirection} pt-2`}>
      {values?.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
              filterLabel={label}
            />
          );
        }

        return <ValueItem {...item} filterLabel={label} />;
      })}
    </ul>
  );
}

function FilterCollapse({ filter }: { filter: FilterToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li class="collapse rounded-lg">
      <input
        type="checkbox"
        onChange={() => setIsOpen((prevState) => !prevState)}
        class={`min-h-[0px]`}
        aria-label="Filtros"
      />
      <div
        class="collapse-title flex justify-between cursor-pointer px-2 p-2 min-h-[0px] rounded-lg"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}
      >
        <span class="font-bold">{filter.label}</span>
        {isOpen
          ? (
            <Icon
              size={30}
              width={35}
              strokeWidth={2.5}
              id={"ChevronDown"}
            />
          )
          : (
            <Icon
              size={30}
              width={35}
              strokeWidth={2.5}
              id={"ChevronUp"}
            />
          )}
      </div>
      <div class="collapse-content transition-all duration-700 p-0 scrollbar-none">
        <FilterValues {...filter} />
      </div>
    </li>
  );
}

function Filters({ filters }: Props) {
  const { filtersUrl, updateQueryParam, selectedFilters } = useUI();
  return (
    <>
      {selectedFilters.value.length > 0 &&
        (
          <>
            <div class="flex flex-col gap-2">
              <span class="font-bold text-[14px]">Filtros:</span>
              <span class="text-[14px]">Selecionados:</span>
            </div>
            <div class="flex flex-col gap-2 pt-4">
              {selectedFilters.value.map(({ label, filterLabel, ref }) => (
                <button
                  class="flex flex-wrap gap-4 font-bold items-center"
                  onClick={() => {
                    const isChecked = updateQueryParam(
                      filtersUrl.value,
                      filterLabel,
                      label.toLowerCase(),
                    );
                    ref?.current?.setAttribute(
                      "aria-checked",
                      isChecked ? "true" : "false",
                    );

                    selectedFilters.value = selectedFilters.value.filter((
                      { label: labelF, filterLabel: filterLabelF },
                    ) => labelF !== label || filterLabelF !== filterLabel);
                  }}
                >
                  <span class="flex items-center justify-center text-red-500">
                    x
                  </span>
                  {label}
                </button>
              ))}
              <button
                class="flex justify-center items-center bg-[#C82926] bg-opacity-10 text-black h-[35px] rounded-lg uppercase"
                onClick={() => {
                  selectedFilters.value.forEach(
                    ({ label, filterLabel, ref }) => {
                      const isChecked = updateQueryParam(
                        filtersUrl.value,
                        filterLabel,
                        label.toLowerCase(),
                      );
                      ref?.current?.setAttribute(
                        "aria-checked",
                        isChecked ? "true" : "false",
                      );

                      selectedFilters.value = selectedFilters.value.filter((
                        { label: labelF, filterLabel: filterLabelF },
                      ) => labelF !== label || filterLabelF !== filterLabel);
                    },
                  );
                }}
              >
                limpar filtros
              </button>
            </div>
          </>
        )}
      <ul class="flex flex-col gap-4 pt-4">
        {filters
          .filter(isToggle)
          .map((filter) => <FilterCollapse filter={filter} />)}
        <li class="h-[75px] lg:h-[36px] flex justify-center items-center lg:relative fixed bottom-0 left-0 w-full lg:border-none bg-white border border-t ">
          <a
            href={filtersUrl.value}
            class="w-11/12 lg:w-full h-[36px] text-[#0F9B3E] bg-[#0F9B3E] bg-opacity-10 flex justify-center items-center rounded-lg uppercase"
          >
            aplicar filtros
          </a>
        </li>
      </ul>
    </>
  );
}

export default Filters;
