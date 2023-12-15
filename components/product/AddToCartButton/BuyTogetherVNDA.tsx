import { PropertyValue } from "apps/commerce/types.ts";
import { useCart } from "apps/vnda/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import { useSignal } from "@preact/signals";
import { useUI } from "$store/sdk/useUI.ts";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  productID: string;
  additionalProperty: PropertyValue[];
}

function AddToCartButton(
  { eventParams }: Props,
) {
  const { productsBuyTogether } = useUI();
  const { addItem } = useCart();
  const onAddItem = async () => {
    await productsBuyTogether.value.forEach(async ({ productID }) =>
      await addItem({
        quantity: 1,
        itemId: productID,
      })
    );
  };

  return (
    <div class="flex justify-between items-center relative h-fit gap-4">
      <Button onAddItem={onAddItem} eventParams={eventParams} />
    </div>
  );
}

export default AddToCartButton;
