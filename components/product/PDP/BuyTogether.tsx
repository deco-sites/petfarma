import { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import CheckBox from "$store/components/product/PDP/CheckBox.tsx";
import BuyTogetherPrice from "$store/components/product/PDP/BuyTogetherPrice.tsx";

export interface Props {
  products: Product[] | null;
}

function ProductCard({ product }: { product: Product }) {
  const { image: images, offers, name, additionalProperty, isVariantOf } =
    product;
  const [front] = images ?? [];
  const { listPrice = 0, price = 0, installments } = useOffer(offers);
  const percent = Math.floor(
    ((listPrice - price) / listPrice) * 100,
  );

  const marca = additionalProperty?.find(({ name }) => name?.includes("marca"))
    ?.value;
  const marcaFormated = marca ? JSON.parse(marca) : null;
  return (
    <div class="flex flex-col gap-4 w-[400px]">
      <div class="flex justify-start gap-4 border rounded-xl p-3 w-full">
        <Image src={front.url!} width={105} height={105} alt={name} />
        <div class="flex flex-col gap-4">
          {marcaFormated && (
            <p class="text-[#202020] opacity-60 font-semibold">
              {marcaFormated.title}
            </p>
          )}
          {name && (
            <>
              <p class="block md:hidden text-[12px] text-[#202020]">
                {name.length <= 45 ? name : `${name.slice(0, 42)}...`}
              </p>
              <p class="hidden md:block text-[12px] text-[#202020] h-10">
                {name.length <= 70 ? name : `${name.slice(0, 60)}...`}
              </p>
            </>
          )}
          <div>
            <span class="flex items-center gap-3 mt-2">
              {price && (
                <p class="font-[700] text-lg rounded-[10px]">
                  {formatPrice(price, offers!.priceCurrency!)}
                </p>
              )}
              {percent > 0 && price && listPrice && (
                <p class="bg-[#C82926] text-white rounded-lg font-medium text-xs py-1 px-2">
                  {(((listPrice - price) / listPrice) * 100).toString().split(
                    ".",
                  )[0]}% OFF
                </p>
              )}
            </span>
            <p class="text-[12px] pb-2 text-[#00000066]">
              ou {installments}
            </p>
          </div>
        </div>
      </div>
      <CheckBox product={product} />
    </div>
  );
}

function BuyTogether({ products }: Props) {
  return (
    <div class="bg-white rounded-2xl flex flex-col m-auto w-11/12 max-w-[1300px] p-4 gap-4">
      <h2 class="font-semibold text-[20px] uppercase">
        quem comprou, levou junto:
      </h2>
      <div class="w-full h-[1px] bg-black bg-opacity-10" />
      <div class="flex flex-wrap gap-4 justify-center">
        {products?.map((product) => <ProductCard product={product} />)}
      </div>
      <BuyTogetherPrice />
    </div>
  );
}

export default BuyTogether;
