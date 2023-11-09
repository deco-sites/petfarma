import type { Product } from "apps/commerce/types.ts";
// import { useAddToCart } from "$store/sdk/useAddToCart.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";

export default function ProductCard(
  {
    product,
    mobileBigCard,
    color,
    backgroundColor,
    itemListName,
    index,
  }: {
    product: Product;
    mobileBigCard?: boolean;
    color?: string;
    backgroundColor?: string;
    itemListName?: string;
    index?: number;
  },
) {
  const {
    url,
    name,
    image: images,
    offers,
    brand,
    sku,
    additionalProperty,
    productID,
    description,
  } = product;
  const { listPrice = 0, price = 0, installments, seller, availability } =
    useOffer(
      offers,
    );
  const [front] = images ?? [];

  const id = `product-card-${productID}`;

  // const props = useAddToCart({
  //   skuId: sku,
  //   sellerId: seller,
  //   discount: price && listPrice ? listPrice - price : 0,
  //   price: price ?? 10000,
  //   productGroupId: product.isVariantOf?.productGroupID ?? "",
  //   name: name ?? "",
  //   quantity: 1,
  //   product,
  //   breadcrumbList: undefined,
  //   listPrice,
  //   itemListName,
  // });

  const percent = Math.floor(
    ((listPrice - price) / listPrice) * 100,
  );

  return (
    <div
      class={`${
        mobileBigCard ? "w-[243px]" : "w-[165px]"
      } md:w-[243px] slider-item relative group h-[435px]`}
    >
      <a href={url} id={id}>
        {
          /* <SendEventOnClick
            id={id}
            event={{
              name: "select_item" as const,
              params: {
                item_list_name: itemListName,
                items: [
                  mapProductToAnalyticsItem({
                    item_list_name: itemListName,
                    product,
                    price,
                    listPrice,
                    index,
                  }),
                ],
              },
            }}
          /> */
        }
        <div class="flex flex-col justify-center gap-2 flex-wrap flex-grow items-center absolute top-4 left-4 z-10">
          {additionalProperty?.filter(({ description }) =>
            description === "highlight"
          ).map(({ value }) => (
            <span class="bg-primary p-2 rounded-lg text-white text-sm font-medium max-h-7 uppercase flex items-center justify-center">
              {value}
            </span>
          ))}
        </div>
        <div
          class={`py-2 flex hover:shadow-2xl transition flex-col justify-between border-[2px] border-[#552B9A1A] border-opacity-10 border-solid rounded-[10px] w-full relative h-full`}
          style={{ backgroundColor }}
        >
          <div class="px-2 rounded-[10px] h-full flex-col justify-between flex">
            <figure class="flex object-contain max-w-[200px] w-auto h-[260px] items-center justify-center mx-auto">
              <img
                class="h-[200px] object-contain"
                src={front.url!}
                alt={name}
                loading="lazy"
                width={200}
              />
            </figure>
            <p class="font-[700] pb-3 uppercase" style={{ color }}>
              {brand?.name}
            </p>
            {name && (
              <>
                <p class="block md:hidden text-[12px] text-[#00000080]">
                  {name.length <= 45 ? name : `${name.slice(0, 42)}...`}
                </p>
                <p class="hidden md:block text-[12px] text-[#00000080] h-10">
                  {name.length <= 70 ? name : `${name.slice(0, 60)}...`}
                </p>
              </>
            )}
            <div class="block md:hidden">
              {percent > 0 && (
                <span class="flex items-center gap-2 mt-2">
                  {listPrice && (
                    <p class="line-through text-[#00000066] text-sm">
                      {formatPrice(listPrice, offers!.priceCurrency!)}
                    </p>
                  )}
                  {price && listPrice && (
                    <p class="bg-secondary text-white rounded-lg font-medium text-xs py-1 px-2">
                      {(((listPrice - price) / listPrice) * 100).toString()
                        .split(
                          ".",
                        )[0]}% OFF
                    </p>
                  )}
                </span>
              )}
              <p class="font-[700] text-lg rounded-[10px]" style={{ color }}>
                {formatPrice(price, offers!.priceCurrency!)}
              </p>
            </div>
            <div class="md:flex hidden items-center gap-3">
              <p class="font-[700] text-lg rounded-[10px]" style={{ color }}>
                {formatPrice(price, offers!.priceCurrency!)}
              </p>
              <span class="flex items-center gap-3 mt-2">
                {percent > 0 && listPrice && (
                  <p class="line-through text-[#00000066] text-sm">
                    {formatPrice(listPrice, offers!.priceCurrency!)}
                  </p>
                )}
                {percent > 0 && price && listPrice && (
                  <p class="bg-secondary text-white rounded-lg font-medium text-xs py-1 px-2">
                    {(((listPrice - price) / listPrice) * 100).toString().split(
                      ".",
                    )[0]}% OFF
                  </p>
                )}
              </span>
            </div>

            <p class="text-[12px] pb-2 text-[#00000066]">
              ou {installments}
            </p>

            <div
              class="text-[12px] font-normal group-hover:hidden overflow-hidden max-h-20"
              dangerouslySetInnerHTML={{ __html: description ?? "" }}
            />
            <div href={url}>
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                  .buyButton:hover {
                    color: white !important;
                  }
                  `,
                }}
              />
              {availability === "https://schema.org/InStock"
                ? (
                  <Button
                    data-deco="add-to-cart"
                    //   {...props}
                    class="hidden group-hover:flex btn-primary buyButton bg-[#0F9B3E] border-none text-white flex-grow-1 max-h-8 min-h-[35px] uppercase  w-full rounded-[5px]"
                  >
                    {mobileBigCard ? "Adicionar à sacola" : "comprar"}
                  </Button>
                )
                : (
                  <button class="w-full text-center">
                    Produto indisponivel
                  </button>
                )}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
