import { ProductDetailsPage } from "apps/commerce/types.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";

export interface Style {
  /** @description number in PX */
  gap: number;
}

export interface Props {
  page: ProductDetailsPage | null;
  style: Style;
}

const WIDTH = 446;
const HEIGHT = 446;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductImages({ page, style }: Props) {
  if (page === null) {
    return <></>;
  }

  const { product } = page;

  const images = product.image ?? [];

  const id = useId();

  return (
    <div id={id} class="flex flex-col" style={{ gap: style.gap }}>
      <Slider class="carousel carousel-center gap-6 w-full max-w-[446px] ">
        {images?.map((img, index) => {
          return (
            <Slider.Item
              index={index}
              class={`carousel-item relative w-full `}
            >
              <Image
                class="w-[446px]"
                sizes="(max-width: 446px) 100vw, 40vw"
                style={{ aspectRatio: ASPECT_RATIO }}
                src={img.url!}
                alt={img.alternateName}
                width={WIDTH}
                height={HEIGHT}
                fit="contain"
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          );
        })}
      </Slider>
      <div class="flex flex-row gap-4 justify-center items-center">
        {images?.map((_, index) => (
          <Slider.Dot
            index={index}
            class={`${
              index === 0 && "bg-primary"
            } w-[42px] bg-gray-200 h-2 rounded-full`}
          />
        ))}
      </div>
      <SliderJS rootId={id}></SliderJS>
    </div>
  );
}

export default ProductImages;
