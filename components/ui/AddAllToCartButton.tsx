import { useState } from "preact/hooks";

export interface Props {
  selectedProducts?: string[];
}

function AddAllToCartButton({ selectedProducts }: Props) {
  const handleAddToCart = () => {
    // lógica de adição carrinho a fazer
    console.log("Produtos selecionados:", selectedProducts);
  };

  return (
    <div class="flex flex-col items-center justify-center gap-4">
      <div class="flex flex-row gap-2 items-center">
        <span class="font-bold">TOTAL:</span>
        <span class="font-bold text-[#0F9B3E] text-2xl">R$ 47,00</span>
        <span class="text-md">ou 3x de R$31,90 sem juros</span>
      </div>
      <button
        class="uppercase text-white font-semibold flex items-center text-center bg-[#0F9B3E] rounded-md border-[#17A087] px-4 py-[10px]"
        onClick={handleAddToCart}
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default AddAllToCartButton;
