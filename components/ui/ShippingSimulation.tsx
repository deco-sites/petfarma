import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vnda/hooks/useCart.ts";
import type { ShippingMethod } from "apps/vnda/utils/client/types.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  skuId: string;
}

type ShippingResult = { [key: string]: ShippingMethod[] };

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<ShippingResult | null>;
}) {
  const { cart, simulate } = useCart();
  const methods =
    (Object.values(simulation.value ?? {})[0] ?? []) as ShippingMethod[];
  const locale = "pt-BR";

  const currencyCode = "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-4 p-4 bg-base-200 rounded-[4px] relative">
      {methods.map((method: ShippingMethod) => (
        <li class="flex flex-col items-start justify-center border-base-200 not-first-child:border-t flex-wrap gap-4">
          <div class="flex justify-between w-full">
            <span class="text-button text-center text-[14px] font-bold">
              {method.name}
            </span>
            <span class="text-base font-semibold text-right">
              {method.price === 0 ? "Grátis" : (
                formatPrice(method.price, currencyCode, locale)
              )}
            </span>
          </div>
          <span class="text-button text-[12px]">
            {method.description}
          </span>
        </li>
      ))}
      <span class="text-base-300">
        Os prazos de entrega começam a contar a partir da confirmação do
        pagamento e podem variar de acordo com a quantidade de produtos na
        sacola.
      </span>
    </ul>
  );
}

function ShippingSimulation({ skuId }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const isSimulation = useSignal(false);
  const simulateResult = useSignal<ShippingResult | null>(null);
  const { simulate } = useCart();
  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      const data = await simulate({
        skuId,
        zip: postalCode.value,
        quantity: 1,
      });
      console.log({ data });
      simulateResult.value = data as unknown as ShippingResult;
    } catch (error) {
      console.log({ error }, "oi");
    } finally {
      loading.value = false;
    }
  }, []);

  return (
    <div class="flex flex-col gap-2 border rounded-xl p-4">
      <div
        class="flex items-center justify-start gap-4"
        onClick={() => isSimulation.value = isSimulation.value ? false : true}
      >
        <Icon id="TRUCK-FAST" size={16} stroke={"1"} />
        <span class="font-normal text-[14px]">
          Confira o prazo de entrega
        </span>
        <Icon id="ChevronDown" width={25} height={20} class="ml-auto" />
      </div>
      <div>
        {isSimulation.value && (
          <form
            class="join flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSimulation();
            }}
          >
            <div class="relative w-full h-fit">
              <input
                as="input"
                type="text"
                class="input input-bordered rounded-full relative min-w-full"
                placeholder="Informe o seu CEP"
                value={postalCode.value}
                maxLength={8}
                onChange={(e: { currentTarget: { value: string } }) => {
                  postalCode.value = e.currentTarget.value;
                }}
              />
              <Button
                type="submit"
                loading={loading.value}
                class="uppercase rounded-full bg-[#0F9B3E] text-white absolute right-5 z-40 max-h-[20px] min-h-[40px] top-1"
              >
                ok
              </Button>
            </div>
            <a
              href="https://buscacepinter.correios.com.br/app/endereco/index.php"
              class="underline text-black ml-auto text-[12px] font-normal"
              target="_blank"
            >
              Não sei meu CEP
            </a>
          </form>
        )}
      </div>
      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
