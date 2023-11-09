import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import { useId } from "$store/sdk/useId.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";

export interface Props {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  href: string;
}

function MainBanner({ alt, mobile, href, desktop }: Props) {
  const id = useId();

  return (
    <div>
      <a
        id={id}
        href={href}
        class="relative h-[230px] w-11/12 md:h-[340px] max-w-[1300px] "
      >
        <Picture preload={false}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={"auto"}
            src={mobile}
            width={375}
            height={230}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={"auto"}
            src={desktop}
            width={1440}
            height={340}
          />
          <img
            class="flex m-auto object-fill w-11/12 h-full rounded-3xl max-w-[1300px]"
            loading={"lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>
      </a>
      <SendEventOnClick
        id={id}
        event={{
          name: "select_promotion",
          params: {
            promotion_name: alt,
            promotion_id: alt,
            items: [],
          },
        }}
      />
    </div>
  );
}

export default MainBanner;
