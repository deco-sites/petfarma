import { ProductDetailsPage } from "apps/commerce/types.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Style {
  /** @description number in PX */
  gap: number;
}

export interface ImageProps {
  /** @description (124px x 132px) */
  src: ImageWidget;
  alt: string;
}

export interface Props {
  page: ProductDetailsPage | null;
  style: Style;
  stamp?: ImageProps;
}

const WIDTH = 446;
const HEIGHT = 446;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductImages({ page, style, stamp }: Props) {
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
              {stamp && ( // Adicione essa condição para exibir o selo apenas na primeira imagem
                <div
                  class="absolute top-0 right-12 p-2"
                  style={{ zIndex: 1 }}
                >
                  <Image
                    src={stamp.src} // Certifique-se de que a propriedade src da prop stamp seja um objeto ImageWidget
                    alt={stamp.alt}
                    width={75}
                    height={80}
                    class="rounded-full"
                  />
                </div>
              )}
            </Slider.Item>
          );
        })}
      </Slider>
      <div class="flex flex-row gap-4 justify-center items-center">
        {images?.map((_, index) => (
          <Slider.Dot
            index={index}
            class={`${
              index === 0 && "bg-[#0F9B3E]"
            } w-[42px] bg-[#0F9B3E] h-2 rounded-full`}
          />
        ))}
      </div>
      <SliderJS rootId={id}></SliderJS>
    </div>
  );
}

export default ProductImages;
