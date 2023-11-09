import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { useState } from "preact/hooks";
import type { Product } from "apps/commerce/types.ts";
import ProductCard from "$store/components/content/ProductCard.tsx";

export interface Props {
  /**
   * @format color
   * @default #FFFFFF
   */
  titleColor?: string;
  title?: string;
  mobileBigCard?: boolean;
  section: Product[] | null;
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
}

function Carousel(
  {
    section,
    title,
    titleColor,
    mobileBigCard,
    color,
    backgroundColor,
  }: Props,
) {
  const id = useId();

  const divider = <div class="w-full h-[1px] bg-black bg-opacity-10" />;

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
