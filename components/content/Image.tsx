import ImageComponent from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @description put the number in Pixels */
  width: number;
  /** @description put the number in Pixels */
  height: number;
  src: ImageWidget;
  alt: string;
}

function Image({ src, alt, height, width }: Props) {
  return (
    <ImageComponent
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ aspectRatio: `${width} / ${height}` }}
      fit="contain"
      loading="lazy"
    />
  );
}

export default Image;
