import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  desktop: {
    /** @description desktop otimized image */
    url: ImageWidget;
    width: number;
    height: number;
  };
  mobile: {
    /** @description mobile otimized image */
    url: ImageWidget;
    width: number;
    height: number;
  };
  /** @description Image's alt text */
  alt: string;
  /**
   * @format color
   * @default #FFFF
   */
  backgroundColor?: string;
}

function BigImageComponent(
  {
    desktop,
    mobile,
    alt,
    backgroundColor,
  }: Props,
) {
  return (
    <div
      class="bg-gray-100 flex flex-col m-auto w-full gap-8 max-w-[1300px]"
      style={{ backgroundColor }}
    >
      <div class="relative h-fit w-full">
        <Picture preload={false}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={"auto"}
            src={mobile.url}
            width={mobile.width}
            height={mobile.height}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={"auto"}
            src={desktop.url}
            width={desktop.width}
            height={desktop.height}
          />
          <img
            class="flex m-auto object-fit w-full h-full rounded-lg"
            loading={"lazy"}
            src={desktop.url}
            alt={alt}
          />
        </Picture>
      </div>
    </div>
  );
}

export default BigImageComponent;
