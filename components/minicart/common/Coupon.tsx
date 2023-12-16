import Button from "$store/components/ui/Button.tsx";
import { useState } from "preact/hooks";

export interface Props {
  coupon?: string;
  onAddCoupon: (text: string) => Promise<void>;
}

function Coupon({ coupon, onAddCoupon }: Props) {
  const [loading, setLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  return (
    <div class="px-4 flex flex-col gap-4 py-4">
      <div class="flex w-full justify-between items-center gap-2">
        <span class="text-[13px] font-semibold text-[#00000099] uppercase">
          adicionar cupom
        </span>
        {!isFirstTime && (
          <span
            class="text-[13px] font-semibold"
            style={{ color: coupon ? "#21A8A3" : "red" }}
          >
            {coupon ? "Cupom aplicado" : "Cupom inválido"}
          </span>
        )}
      </div>
      <div class="flex justify-between items-center">
        {
          <form
            class="w-full justify-between flex gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const { currentTarget: { elements } } = e;

              const input = elements.namedItem("coupon") as HTMLInputElement;
              const text = input.value;

              if (!text) return;

              try {
                setLoading(true);
                await onAddCoupon(text);
              } finally {
                setLoading(false);
                setIsFirstTime(false);
              }
            }}
          >
            <input
              name="coupon"
              class="border w-full"
              type="text"
              value={coupon ?? ""}
              placeholder={"Cupom"}
            />
            <Button
              class=" bg-primary text-white min-h-[36px] max-h-[36px] w-[36px]"
              type="submit"
              htmlFor="coupon"
              loading={loading}
            >
              Ok
            </Button>
          </form>
        }
      </div>
    </div>
  );
}

export default Coupon;
