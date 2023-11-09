import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "$store/sdk/useId.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";

export interface Banner {
  image: LiveImage;
  alt: string;
  href: string;
}

export interface Props {
  images?: Banner[];
  isCarrousel?: boolean;
  title?: string;
  instagramUser?: string;
  description?: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  backgroundColor?: string;
}

function Images(
  { images, isCarrousel, title, description, backgroundColor, instagramUser }:
    Props,
) {
  const id = useId();

  return (
    <section
      class="flex m-auto w-11/12 flex-col gap-4 rounded-lg max-w-[1300px]"
      style={{ backgroundColor }}
    >
      {title && (
        <h2 class="text-primary text-3xl font-bold uppercase text-center">
          {instagramUser && (
            <span class="text-secondary">{instagramUser + " "}</span>
          )}
          {title}
        </h2>
      )}
      {description && <p class="text-base text-center">{description}</p>}
      {isCarrousel
        ? (
          <div class="carousel gap-4 row-start-2 row-end-5 items-end md:py-4 w-full">
            {images?.map(({ image, alt, href }, index) => (
              <a
                id={`${id}:${index}`}
                href={href}
                width={343}
                height={320}
                class="relative carousel-item"
              >
                <Image
                  width={280}
                  height={280}
                  src={image}
                  alt={alt}
                  class="object-fill h-[320px] rounded-2xl w-full"
                />
                <SendEventOnClick
                  id={`${id}:${index}`}
                  event={{
                    name: "select_promotion",
                    params: {
                      promotion_name: alt,
                      promotion_id: alt,
                      items: [],
                    },
                  }}
                />
              </a>
            ))}
          </div>
        )
        : (
          <div class="flex justify-between flex-wrap lg:flex-nowrap w-full m-auto gap-2 py-4 relative">
            {images?.map(({ image, alt, href }, index) => (
              <a
                id={`${id}:${index}`}
                href={href}
                class="flex justify-center w-full lg:w-fit h-fit rounded-lg"
              >
                <Image
                  width={421}
                  height={320}
                  src={image}
                  alt={alt}
                  class="rounded-lg w-full lg:w-[421px] h-[320px]"
                />
                <SendEventOnClick
                  id={`${id}:${index}`}
                  event={{
                    name: "select_promotion",
                    params: {
                      promotion_name: alt,
                      promotion_id: alt,
                      items: [],
                    },
                  }}
                />
              </a>
            ))}
          </div>
        )}
    </section>
  );
}

export default Images;