import { PropertyValue } from "apps/commerce/types.ts";
import { useCart } from "apps/vnda/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import { useSignal } from "@preact/signals";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  productID: string;
  additionalProperty: PropertyValue[];
}

function AddToCartButton(
  { productID, additionalProperty, eventParams }: Props,
) {
  const { addItem } = useCart();
  const quantity = useSignal(1);
  const onAddItem = () =>
    addItem({
      quantity: quantity.value,
      itemId: productID,
      attributes: Object.fromEntries(
        additionalProperty.map(({ name, value }) => [name, value]),
      ),
    });

  return (
    <div class="flex justify-between items-center relative h-fit gap-4">
      <div class="border rounded-lg flex items-center justify-between flex-grow h-[43px] p-2 max-w-[116px]">
        <button
          class="rounded-full bg-primary bg-opacity-10 w-6 h-6 text-primary"
          onClick={() =>
            quantity.value > 1 ? quantity.value-- : quantity.value = 1}
        >
          -
        </button>
        {quantity.value}
        <button
          class="rounded-full bg-primary bg-opacity-10 w-6 h-6 text-primary"
          onClick={() => {
            quantity.value++;
          }}
        >
          +
        </button>
      </div>

      <Button onAddItem={onAddItem} eventParams={eventParams} />
    </div>
  );
}

export default AddToCartButton;
