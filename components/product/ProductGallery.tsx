import ProductCard from "$store/components/content/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
}

function ProductGallery({ products }: Props) {
  return (
    <div class={`flex justify-center gap-2 items-center flex-wrap sm:gap-10`}>
      {products?.map((product) => (
        <ProductCard
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
