import { useId } from "$store/sdk/useId.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  /** @description when user clicks on the image, go to this link */
  href: string;
}

export interface Props {
  visible?: boolean;
  image: Banner;
}

function Alert(
  {
    visible = true,
    image,
  }: Props,
) {
  const id = useId();

  if (!visible) {
    return null;
  }

  const {
    alt,
    mobile,
    desktop,
    href,
  } = image;

  return (
    <div class=" flex justify-center carousel carousel-center w-screen sm:gap-6 h-[40px] mx-auto">
      <a
        id={id}
        href={href ?? "#"}
        aria-label={"alerts"}
        class="relative h-[30px] md:h-[40px] overflow-y-hidden w-full"
      >
        <Picture preload={true}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={"high"}
            src={mobile}
            width={360}
            height={30}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={"high"}
            src={desktop}
            width={1440}
            height={40}
          />
          <img
            class="object-fill w-full h-full"
            loading={"eager"}
            src={desktop}
            alt={alt}
          />
        </Picture>
      </a>
    </div>
  );
}

export default Alert;
