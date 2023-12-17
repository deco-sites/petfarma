import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Flags {
  title?: string;
  flags?: {
    image: ImageWidget;
    width: number;
    height: number;
    alt: string;
    text: string;
    url: string;
  }[];
}

/**
 * @titleBy matcher
 */
export interface Category {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: string;
  /**
   * @format textarea
   * @format html
   * @description text to be rendered on top of the image */
  shortText?: string;
  /**
   * @format textarea
   * @format html
   * @description text to be rendered on top of the image */
  longText?: string;
  flags: Flags;
  image: {
    /** @description Image for big screens */
    desktop?: {
      url: ImageWidget;
      width: number;
      height: number;
    };
    /** @description Image for small screens */
    mobile?: {
      url: ImageWidget;
      width: number;
      height: number;
    };
    /** @description image alt text */
    alt?: string;
    isRender?: boolean;
  };
}

function Banner(
  props: { banner: { title?: string; image?: Category["image"] } },
) {
  const { banner } = props;

  if (!banner) {
    return null;
  }

  const { title, image } = banner;

  return (
    <div>
      {image?.isRender && image?.mobile && image?.desktop && (
        <Picture preload>
          <Source
            src={image.mobile.url}
            width={image.mobile.width}
            height={image.mobile.height}
            media="(max-width: 767px)"
          />
          <Source
            src={image.desktop.url}
            width={image.desktop.width}
            height={image.desktop.height}
            media="(min-width: 767px)"
          />
          <img
            class="w-full"
            src={image.desktop.url}
            alt={image.alt ?? title}
          />
        </Picture>
      )}
    </div>
  );
}

export function ShortText(
  { shortText, title }: {
    shortText?: string;
    title?: string;
  },
) {
  if (!shortText || !title) {
    return null;
  }
  const divider = <div class="w-full h-[1px] bg-black bg-opacity-10 gap-4" />;
  return (
    <div class="flex flex-col w-full mx-auto gap-4">
      <h1 class="font-semibold text-[16px]">{title}</h1>
      <>{divider}</>
      <div dangerouslySetInnerHTML={{ __html: shortText }} />
      <a
        class="flex justify-center items-center uppercase font-bold bg-transparent text-primary border border-primary rounded-lg w-[140px] h-[38px]"
        href="#longText"
      >
        saiba MAIS +
      </a>
    </div>
  );
}

export function Flags({ title, flags }: Flags) {
  if (!title || !flags) {
    return null;
  }

  const divider = <div class="w-full h-[1px] bg-black bg-opacity-10 gap-4" />;
  return (
    <div class="flex flex-col w-full mx-auto gap-4">
      <h2 class="font-semibold text-[16px]">{title}</h2>
      <>{divider}</>
      <div class="flex flex-wrap gap-4 w-full">
        {flags.map(({ image, alt, text, url, width, height }) => (
          <a
            href={url}
            class="flex justify-center items-center gap-4 bg-[#0F9B3E] bg-opacity-10 w-[161px] h-[36px] rounded-lg text-primary"
          >
            <Image src={image} alt={alt} width={width} height={height} />
            {text}
          </a>
        ))}
      </div>
    </div>
  );
}

export function LongText({ longText }: { longText?: string }) {
  if (!longText) {
    return null;
  }

  return (
    <div
      class="bg-white flex flex-col w-11/12 max-w-[1300px] mx-auto p-4 rounded-lg"
      id="longText"
    >
      <div dangerouslySetInnerHTML={{ __html: longText }} />
    </div>
  );
}

export default Banner;
