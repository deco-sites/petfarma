import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";
import type { Product } from "apps/commerce/types.ts";
import ProductCard from "$store/components/content/ProductCard.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

type Icons = "Dog" | "Cat" | "Bird" | "Horse" | "Bull";

export interface Props {
  /**
   * @format color
   * @default #FFFFFF
   */
  titleColor?: string;
  title?: string;
  mobileBigCard?: boolean;
  sections: {
    section: Product[] | null;
    title?: string;
    icon: Icons;
  }[];
  /**
   * @format color
   * @default #FFFFF
   */
  color?: string;
  /**
   * @format color
   * @default #FFFFF
   */
  backgroundColor?: string;
  /** @default 0 */
  sectionIndex?: number;
}

function Carousel(
  {
    sections,
    title,
    titleColor,
    mobileBigCard,
    color,
    backgroundColor,
    sectionIndex,
  }: Props,
) {
  const id = useId();

  const divider = <div class="w-full h-[1px] bg-black bg-opacity-10" />;
  const section = sections[sectionIndex ?? 0].section;

  return (
    <section
      class="flex justify-between m-auto md:w-85 w-11/12 flex-col max-w-[1300px] gap-4 py-8"
      id={id}
    >
      <div class="flex justify-between flex-row items-center">
        {title && (
          <h2
            class="text-[20px] leading-[25px] uppercase text-center font-bold mr-4"
            style={{ color: titleColor }}
          >
            {title}
          </h2>
        )}
        <div class="lg:flex gap-4 flex-wrap justify-center hidden">
          {sections.length > 1 &&
            sections?.map(({ title, icon }, index) => (
              <button
                data-slice-dot={index}
                aria-label={`go to slider item ${index}`}
                class={`flex gap-4 items-center justify-center rounded-md w-[137px] h-[36px] text-[14px] bg-[#0F9B3E] ${
                  title === sections[sectionIndex ?? 0].title
                    ? "text-white"
                    : "bg-opacity-10 text-[#0F9B3E]"
                } `}
                {...usePartialSection({ props: { sectionIndex: index } })}
              >
                <Icon id={icon} width={26} height={20} />
                {title}
              </button>
            ))}
        </div>
        <div class="flex justify-between gap-4">
          <Slider.PrevButton
            class="no-animation btn btn-circle btn-outline w-[40px] min-h-[40px] max-h-[40px] p-0"
            disabled
            style={{ border: "1px solid rgba(0, 0, 0, 0.08)" }}
          >
            <Icon size={24} id="ChevronLeft" strokeWidth={2} />
          </Slider.PrevButton>

          <Slider.NextButton
            class="no-animation btn btn-circle btn-outline w-[40px] min-h-[40px] max-h-[40px] p-0"
            style={{ border: "1px solid rgba(0, 0, 0, 0.08)" }}
          >
            <Icon size={24} id="ChevronRight" strokeWidth={2} />
          </Slider.NextButton>
        </div>
      </div>
      <>{divider}</>
      <div class="flex gap-4 flex-wrap justify-center lg:hidden">
        {sections.length > 1 &&
          sections?.map(({ title, icon }, index) => (
            <button
              data-slice-dot={index}
              aria-label={`go to slider item ${index}`}
              class={`flex gap-4 items-center justify-center rounded-md w-[137px] h-[36px] text-[14px] bg-[#0F9B3E] ${
                title === sections[sectionIndex ?? 0].title
                  ? "text-white"
                  : "bg-opacity-10 text-[#0F9B3E]"
              } `}
              {...usePartialSection({ props: { sectionIndex: index } })}
            >
              <Icon id={icon} width={26} height={20} />
              {title}
            </button>
          ))}
      </div>
      <Slider class="carousel carousel-start gap-4 min-h-[263px] flex items-end bg-transparent py-[24px]">
        {section?.map((product, index) => (
          <Slider.Item index={index} class="slider-item">
            <ProductCard
              product={product}
              mobileBigCard={mobileBigCard}
              color={color}
              backgroundColor={backgroundColor}
              itemListName={title}
            />
          </Slider.Item>
        ))}
      </Slider>
      <div class="flex flex-row gap-4 justify-center items-center">
        {section?.map((_, index) => (
          <Slider.Dot
            index={index}
            class={`${
              index === 0 && "bg-primary"
            } w-[42px] bg-gray-200 h-2 rounded-full`}
          />
        ))}
      </div>
      <SliderJS rootId={id} />
    </section>
  );
}

export default Carousel;
