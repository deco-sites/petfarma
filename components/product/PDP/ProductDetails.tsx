import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ShippingSimulate from "$store/islands/ShippingSimulation.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";

export interface Style {
  /** @description number in PX */
  gap: number;
}

export interface Props {
  page: ProductDetailsPage | null;
  style: Style;
}

function ProductDetails({ page, style }: Props) {
  if (page === null) {
    return <></>;
  }

  const divider = <div class="w-full h-[1px] bg-black bg-opacity-10" />;

  const { product, breadcrumbList } = page;
  const { offers, productID, additionalProperty = [] } = product;
  const { price, listPrice, seller, installments, availability } = useOffer(
    offers,
  );

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList.itemListElement.slice(0, -1) ?? [],
    numberOfItems: breadcrumbList.itemListElement.length - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  return (
    <div class="flex flex-col max-w-[391px]" style={{ gap: style.gap }}>
      <h1>
        <span class="font-bold text-[20px]">{product.name}</span>
      </h1>
      <>{divider}</>
      {/* Prices */}
      <div>
        <div class="flex flex-row gap-2 items-center">
          <span class="font-bold text-xl text-[#202020]">
            {formatPrice(price)}
          </span>
          <span class="line-through text-base-300 text-xs">
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </span>
        </div>
        {price && (
          <span class="text-sm text-[#00000099]">
            até 10x de {formatPrice(price / 10)} sem juros
          </span>
        )}
      </div>
      {availability === "https://schema.org/InStock"
        ? (
          <AddToCartButtonVNDA
            eventParams={{ items: [eventItem] }}
            productID={productID}
            additionalProperty={additionalProperty}
          />
        )
        : <OutOfStock productID={productID} />}
      <ShippingSimulate skuId={product!.sku} />
    </div>
  );
}

export default ProductDetails;
