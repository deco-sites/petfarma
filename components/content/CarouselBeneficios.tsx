import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Beneficios {
  image: LiveImage;
  alt: string;
  text?: string;
  href?: string;
}

export interface Props {
  section: Beneficios[];
  /**
   * @format color
   * @default #FFFFF
   */
  textColor: string;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Section(
  { href, image, alt, text, textColor }: Beneficios & { textColor: string },
) {
  return (
    <>
      {href
        ? (
          <a
            href={href}
            class="flex justify-start gap-4 items-center w-[310px] h-[102px] p-[24px] bg-white"
          >
            <Image src={image} alt={alt} width={35} height={35} />
            {text && (
              <p
                class="max-w-[237px] text-[14px]"
                style={{ color: textColor }}
              >
                {text}
              </p>
            )}
          </a>
        )
        : (
          <div class="flex justify-start gap-4 items-center w-[310px] h-[102px] p-[24px] bg-white">
            <Image src={image} alt={alt} width={35} height={35} />
            {text && (
              <p
                class="max-w-[237px] text-[14px]"
                style={{ color: textColor }}
              >
                {text}
              </p>
            )}
          </div>
        )}
    </>
  );
}

function Carousel(
  {
    section,
    textColor,
    interval,
  }: Props,
) {
  const id = useId();

  return (
    <section
      class="flex justify-between m-auto md:w-85 w-11/12 flex-col max-w-[1300px] gap-8 py-8"
      id={id}
    >
      <Slider class="carousel carousel-start gap-8 flex items-end bg-transparent">
        {section.map(({ image, alt, href, text }, index) => (
          <Slider.Item
            index={index}
            class="slider-item rounded-md"
          >
            <Section
              image={image}
              text={text}
              alt={alt}
              href={href}
              textColor={textColor}
            />
          </Slider.Item>
        ))}
      </Slider>
      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </section>
  );
}

export default Carousel;
