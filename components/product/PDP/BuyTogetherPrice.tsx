import { useUI } from "$store/sdk/useUI.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Button from "$store/components/product/AddToCartButton/BuyTogetherVNDA.tsx";

function BuyTogetherPrice() {
  const { productsBuyTogether } = useUI();
  const totalPrice = productsBuyTogether.value.reduce((acc, curr) => {
    const { price } = useOffer(curr.offers);
    acc += price ?? 0;
    return acc;
  }, 0);
  return (
    <div class="flex flex-col mx-auto max-w-[368px] gap-4">
      <span class="flex gap-2 items-center justify-center">
        <p class="uppercase font-bold">total:</p>
        <p class="text-primary font-bold text-2xl">
          {`${formatPrice(totalPrice, "BRL") ?? "R$ 0,00"}`}
        </p>
      </span>
      <Button
        data-deco="add-to-cart"
        class="btn-primary bg-[#17A087] flex-grow-[2] max-h-8 min-h-[43px] uppercase border-none rounded-lg"
      >
        {`Adicionar (${productsBuyTogether.value.length}) itens no carrinho`}
      </Button>
    </div>
  );
}

export default BuyTogetherPrice;
