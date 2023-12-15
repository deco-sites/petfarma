import { useRef } from "preact/hooks";
import { Product } from "apps/commerce/types.ts";
import { useId } from "$store/sdk/useId.ts";
import { useUI } from "$store/sdk/useUI.ts";

function CheckBox({ product }: { product: Product }) {
  const { sku } = product;
  const { productsBuyTogether } = useUI();
  const input = useRef<HTMLInputElement>(null);
  const id = useId();

  console.log(input.current?.checked);
  return (
    <label
      htmlFor={id}
      class={`${
        input && input.current?.checked
          ? " bg-[#E2F0E7] text-[#0F9B3E] opacity-60"
          : "bg-white border border-[#0F9B3E] text-[#0F9B3E]"
      } flex flex-grow justify-center rounded-lg gap-4 p-2 font-semibold`}
    >
      <input
        type="checkbox"
        id={id}
        ref={input}
        onChange={() => {
          const isProduct = productsBuyTogether.value.some((
            { sku: psku },
          ) => psku === sku);

          if (isProduct) {
            productsBuyTogether.value = productsBuyTogether.value.filter((
              { sku: psku },
            ) => psku !== sku);
          } else {
            productsBuyTogether.value = [
              ...productsBuyTogether.value,
              product,
            ];
          }
        }}
      />
      <span>
        {input && input.current?.checked ? "SELECIONADO" : "SELECIONAR"}
      </span>
    </label>
  );
}

export default CheckBox;
