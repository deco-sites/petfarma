import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Rating from "$store/components/product/PDP/Rating.tsx";

export interface Button {
  text: string;
  /**
   * @format color
   * @default #FFFF
   */
  color: string;
  href: string;
}

export interface ImageProps {
  /** @description (124px x 132px) */
  src: ImageWidget;
  alt: string;
}

export interface Style {
  /** @description number in PX */
  gap: number;
}

export interface Props {
  page: ProductDetailsPage | null;
  button: Button;
  image: ImageProps;
  style: Style;
}

function ProductInfo({ page, button, image, style }: Props) {
  if (page === null) {
    return <></>;
  }

  const {
    breadcrumbList,
    product,
  } = page;

  const { description, review } = product;

  return (
    <div class="flex flex-col max-w-[391px]" style={{ gap: `${style.gap}px` }}>
      <Rating />
      {description && (
        <p class="font-normal text-[16px]">
          {description?.length < 423
            ? description
            : `${description?.slice(423)}...`}
        </p>
      )}
      <Image
        src={image.src}
        alt={image.alt}
        width={124}
        height={132}
        class="rounded-full"
      />
      <a
        class="rounded-lg items-center justify-center flex max-w-[292px] h-[38px] border"
        style={{ color: button.color, borderColor: button.color }}
        href={button.href}
      >
        {button.text}
      </a>
    </div>
  );
}

export default ProductInfo;
