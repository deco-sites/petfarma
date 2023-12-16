import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  return (
    <div
      class="flex flex-col justify-between items-center overflow-auto bg-white"
      style={{ minWidth: "calc(min(90%, 425px))", maxWidth: "425px" }}
    >
      {isEmtpy
        ? (
          <div class="flex flex-col gap-6">
            <span class="font-medium text-2xl">Sua sacola está vazia</span>
            <Button
              class="btn-outline"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Escolher produtos
            </Button>
          </div>
        )
        : (
          <>
            {/* Free Shipping Bar */}
            <div class="px-2 py-4 w-full">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div>

            {/* Cart Items */}
            <ul
              role="list"
              class="px-2 flex-grow overflow-y-auto h-[30vh] min-h-[200px] flex flex-col gap-6 w-full py-2"
            >
              {items.map((item, index) => (
                <li
                  key={index}
                  class="flex flex-col gap-4 w-11/12 mx-auto"
                >
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                  <div class="block h-[2px] w-full bg-black opacity-10" />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="w-11/12 flex flex-col mx-auto">
              {/* Subtotal */}

              <div class="flex flex-col">
                {discounts > 0 && (
                  <div class="flex justify-between items-center px-4">
                    <span class="text-sm">Descontos</span>
                    <span class="text-sm">
                      {formatPrice(discounts, currency, locale)}
                    </span>
                  </div>
                )}
                <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
              </div>

              <div class="block h-[2px] w-full bg-black opacity-10" />

              {/* Total */}
              <div class="flex flex-col justify-end items-end gap-2 mx-4 pt-[10px]">
                <div class="flex justify-between items-center w-full">
                  <span class="uppercase font-bold text-[#00000099] opacity-70 text-sm">
                    Total (sem frete)
                  </span>
                  <span class="font-bold text-base text-primary">
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
              </div>

              <div class="p-4 flex flex-col gap-4">
                <a class="inline-block w-full" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="bg-[#0F9B3E] btn-block text-white min-h-10 h-10"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total - discounts,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    FINALIZAR COMPRA
                  </Button>
                </a>
                <Button
                  data-deco="buy-button"
                  class="text-[#0F9B3E] btn-block bg-[#0F9B3E] bg-opacity-10 min-h-10 h-10"
                  disabled={loading || isEmtpy}
                  onClick={() => {
                    displayCart.value = false;
                  }}
                >
                  CONTINUAR COMPRANDO
                </Button>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
