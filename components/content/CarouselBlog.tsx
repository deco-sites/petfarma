import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { useState } from "preact/hooks";

export interface Item {
  title: string;
  image: LiveImage;
  alt: string;
  href: string;
   /**
   * @format textarea
   * @format html
   * @description text to be rendered */
  description: string;
}

export interface Props {
  /**
   * @format color
   * @default #FFFFFF
   */
  titleColor?: string;
  title?: string;
  section: Array<Item>;
  /**
   * @format color
   * @default #FFFFF
   */
  textColor: string;
}

function Section(
  { href, image, alt, textColor, title, description }: {
    href: string;
    image: string;
    alt: string;
    textColor: string;
    title: string;
    description: string;
  },
) {
  return (
    <div class="rounded-lg h-[397px] w-[343px] md:w-[400px] p-2 shadow-xl relative bg-white flex flex-col justify-between items-center border-2">
      <Image
        src={image}
        alt={alt}
        class="rounded-lg mb-2"
        width={384}
        height={193}
      />
      <h2
        class="text-base uppercase text-start font-semibold mb-2"
        style={{ color: textColor }}
      >
        {title}
      </h2>
      <div 
        class="text-[12px] font-normal overflow-hidden mb-2"
        dangerouslySetInnerHTML={{ __html: description ?? "" }}
      />
      <button class="bg-[#0F9B3E] bg-opacity-10 text-[#0F9B3E] uppercase rounded-lg w-full h-[34px]"><a href={href}>leia mais</a></button>
    </div>
  );
}

function Carousel(
  {
    section,
    title,
    textColor,
    titleColor,
  }: Props,
) {
  const id = useId();

  return (
    <section
      class="flex justify-between m-auto md:w-85 w-11/12 flex-col max-w-[1300px] gap-8 py-8"
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
      <Slider class="carousel carousel-start gap-8 min-h-[423px] flex items-end bg-transparent">
        {section.map(({ title, image, alt, href, description }, index) => (
          <Slider.Item index={index} class="slider-item">
            <Section
              title={title}
              image={image}
              alt={alt}
              href={href}
              textColor={textColor}
              description={description}
            />
          </Slider.Item>
        ))}
      </Slider>
      <div class="flex flex-row gap-4 justify-center items-center">
        {section.map((_, index) => (
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
