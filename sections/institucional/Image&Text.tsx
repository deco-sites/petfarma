import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  img: ImageWidget;
  alt: string;
  alignment: "left" | "right";
  isBigImage: boolean;
  /**
   * @format color
   * @default #FFFFFF
   */
  titleColor: string;
  title: string;
  /**
   * @format textarea
   * @format html
   * @description text to be rendered */
  text: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  ButtonColor?: string;
  buttonText?: string;
  href?: string;
  /**
   * @format color
   * @default #FFFF
   */
  backgroundColor?: string;
}

function ImageComponent(
  {
    img,
    alt,
    alignment,
    isBigImage,
    titleColor,
    title,
    text,
    ButtonColor,
    buttonText,
    href,
    backgroundColor,
  }: Props,
) {
  return (
    <div
      class="bg-gray-100 flex flex-col m-auto w-full p-4 gap-8 max-w-[1300px] my-16"
      style={{ backgroundColor }}
    >
      <div class="flex justify-center lg:justify-between gap-4 flex-wrap lg:flex-nowrap">
        <div class="flex flex-col items-start justify-center gap-4 w-fit">
          <h2
            style={{ color: titleColor }}
            class="uppercase text-2xl font-bold"
          >
            {title}
          </h2>
          <div
            dangerouslySetInnerHTML={{
              __html: text,
            }}
          />
          {buttonText && (
            <a
              class="text-white p-3 rounded-xl"
              style={{ backgroundColor: ButtonColor }}
              href={href}
            >
              {buttonText}
            </a>
          )}
        </div>
        <Image
          src={img}
          width={isBigImage ? 565 : 250}
          alt={alt}
          height={375}
          class={`${
            alignment === "left" ? "-order-1" : "lg:order-5"
          } rounded-lg -order-1`}
        />
      </div>
    </div>
  );
}

export default ImageComponent;
