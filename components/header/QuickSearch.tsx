import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Categories {
  label?: string;
  href?: string;
}

export interface Props {
  items?: Categories[];
  highlightedItem?: {
    label?: string;
    href?: string;
  };
}

function QuickSearch({ items = [], highlightedItem }: Props) {
  const id = useId();

  return (
    <div class="hidden md:flex flex-row justify-between items-center">
      <ul class="text-sm text-secondary-content flex flex-row justify-between items-center w-screen max-w-[1300px] h-[40px] mx-auto px-16 pb-[6px]">
        {items.map(({ label, href }, index) => (
          <li
            class="px-4 py-2 text-black uppercase rounded-md hover:bg-[#0F9B3E1A] hover:text-[#0F9B3E]"
            key={index}
          >
            <a class="text-sm" href={href}>
              {label}
            </a>
          </li>
        ))}
        <li class="px-4 py-2 justify-center text-white uppercase bg-[#C82926] rounded">
          <a class="text-sm hover:scale-110" href={highlightedItem?.href}>
            {highlightedItem?.label}
          </a>
        </li>
      </ul>
      {/* <SliderJS rootId={id} interval={interval && interval * 1e3} /> */}
    </div>
  );
}

export default QuickSearch;
