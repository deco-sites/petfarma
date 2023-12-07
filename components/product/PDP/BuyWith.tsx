import {Product} from "apps/commerce/types.ts"
import Image from "apps/website/components/Image.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useState } from 'preact/hooks';
import AddAllToCartButton from "$store/components/ui/AddAllToCartButton.tsx"
import type { Props as AddAllToCartButtonProps } from "$store/components/ui/AddAllToCartButton.tsx";

export interface Props {
  products?: Product[] | null;
  button?: AddAllToCartButtonProps;
  onSelect?: () => void;
}

// Função do Card do Produto
function ProductCard({product, isSelected, onSelect}: {product: Product; isSelected: boolean; onSelect: (productId: string) => void;}){
    const {name, image:images, offers} = product;
    const [image] = images ?? [];

    const { listPrice = 0, price = 0, installments } = useOffer(offers);
    const percent = Math.floor(
        ((listPrice - price) / listPrice) * 100,
    );

    return(

        <div class="flex flex-col">
            <div class="flex justify-start gap-4 p-3">
                {image?.url && <Image 
                    src={image?.url}
                    width={105}
                    height={105}
                    alt={image?.alternateName}
                    loading="lazy"
                    decoding="async"
                />}
                <div class="flex flex-col gap-4">
                    <span class="text-sm">{name}</span>
                    <div class="flex flex-row">
                        <p class="font-[700] text-lg rounded-[10px]">
                            {formatPrice(price, offers!.priceCurrency!)}
                        </p>
                        {percent > 0 && price && listPrice && (
                        <p class="bg-secondary text-white rounded-lg font-medium text-xs py-1 px-2">
                            {(((listPrice - price) / listPrice) * 100).toString().split(
                            ".",
                        )[0]}% OFF
                        </p>
                        )}
                    </div>
                    <p class="text-[12px] pb-2 text-[#00000066]">
                        ou {installments}
                    </p>
                </div>
            </div>
            <div class="flex bg-[#E2F0E7] rounded-lg items-center justify-center px-4 py-[10px] gap-[10px]">
                <input type="checkbox" id="meuCheckbox" class="hidden" checked={isSelected} onChange={() => onSelect(product?.sku)} />
                <span class="block w-[14px] h-4 border-2 border-gray-500 rounded"
                    style={{
                        backgroundColor: isSelected ? '#0F9B3E' : 'transparent',
                    }}
                >
                </span>
                <label for="meuCheckbox" className={`font-semibold text-[#0F9B3E] cursor-pointer p-3 rounded ${
                                            isSelected ? 'bg-blue-50' : ''
                                         }`}
                    style={{
                        backgroundColor: isSelected ? '#0F9B3E' : 'transparent',
                    }}> SELECIONAR
                </label>
            </div>
        </div>

    )
}
// Função Principal
function BuyWith({ products, button }: Props) {

    // const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    // const handleSelectProduct = (productId: string) => {
    //   if (selectedProducts.includes(productId)) {
    //     setSelectedProducts(selectedProducts.filter(id => id !== productId));
    //   } else {
    //     setSelectedProducts([...selectedProducts, productId]);
    //   }
    // };

return (
    <>
        {/* Chamada Poduct Card */}
        <div class="flex mx-auto p-16 w-full max-w-[1440px]">
            <div class="flex flex-col p-8 w-full gap-8">
                <h3 class="pt-4 text-xl font-semibold uppercase text-[#202020]">Quem Comprou Levou Junto:</h3>
                <div class="flex flex-col md:flex-row justify-center items-center gap-6">
                    {products?.map((product) => 
                        <ProductCard 
                            product={product}
                            isSelected={false}
                            onSelect={() => {true}} 
                        /> 
                    )}
                </div>
                <AddAllToCartButton {...button} />
            </div>
        </div>
        {/* Aqui vai ser a função principal onde depois que chamarmos os produtos, iremos estar fazendo a chamada do component(addAllToCart.tsx) que vai somar o valor dos produtos selecionados e também vai ter um botão com action para adcionar todos ao carrinnho. PS: Lembre-se que isso será monntado em componente fora e sera uma ilha */}

    </>
  )
  
}

export default BuyWith;
