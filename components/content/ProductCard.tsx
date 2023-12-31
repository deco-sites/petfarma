import type { Product } from "apps/commerce/types.ts";
// import { useAddToCart } from "$store/sdk/useAddToCart.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";

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

  const marca = additionalProperty?.find(({ name }) => name?.includes("marca"));

  const formatedMarca = marca?.value ? JSON.parse(marca.value) : false;

  const destaque = additionalProperty?.find(({ name }) =>
    name?.includes("destaque")
  );

  const formatedDestaque = destaque?.value ? JSON.parse(destaque.value) : false;

  const hasDogFlag = additionalProperty?.some(({ name }) =>
    name?.includes("cachorro")
  );

  const hasCatFlag = additionalProperty?.some(({ name }) =>
    name?.includes("gato")
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
          <div class="px-2 rounded-[10px] h-full flex-col justify-between flex relative">
            <figure class="flex object-contain max-w-[200px] w-auto h-[260px] items-center justify-center mx-auto">
              <Image
                class="h-[200px] object-contain"
                src={front?.url
                  ? front.url
                  : "https://via.placeholder.com/260x260"}
                alt={name}
                loading="lazy"
                decoding="async"
                height={200}
                width={200}
              />
            </figure>

            <div class="absolute top-2 left-5 flex flex-col gap-2">
              {percent > 0 && price && listPrice && (
                <p class="bg-[#C82926]  text-white rounded-md font-medium text-xs py-1 px-2">
                  {(((listPrice - price) / listPrice) * 100).toString().split(
                    ".",
                  )[0]}% OFF
                </p>
              )}
              {formatedDestaque && (
                <p class="bg-[#0F9B3E]  text-white rounded-md font-medium text-xs py-1 px-2">
                  {formatedDestaque.title}
                </p>
              )}
            </div>
            <div class="absolute top-2 right-5 flex flex-col gap-4">
              {hasDogFlag && (
                <div class="bg-[#F9F9F9] rounded-md p-2">
                  <Icon id="DogShield" width={20} height={21} />
                </div>
              )}
              {hasCatFlag && (
                <div class="bg-[#F9F9F9] rounded-md p-2">
                  <Icon id="CatShield" width={20} height={21} />
                </div>
              )}
            </div>

            {formatedMarca && (
              <p class="font-semibold text-[14px] text-[#202020] text-opacity-60 pb-3">
                {formatedMarca.title}
              </p>
            )}
            {name && (
              <>
                <p class="block md:hidden text-[12px] text-[#00000080]">
                  {name.length <= 45 ? name : `${name.slice(0, 42)}...`}
                </p>
                <p class="hidden md:block text-[12px] text-[#00000080] h-10">
                  {name.length <= 50 ? name : `${name.slice(0, 50)}...`}
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
              </span>
            </div>

            <p class="text-[12px] pb-2 text-[#00000066]">
              ou {installments}
            </p>

            <div
              class="text-[12px] font-normal group-hover:hidden overflow-hidden max-h-20"
              dangerouslySetInnerHTML={{
                __html: description?.length ?? 0 > 50
                  ? `${name?.slice(0, 50)}...`
                  : description ?? "",
              }}
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
