import ProductCard from "$store/components/content/ProductCard.tsx";

export interface Product{
    brand: string;
    name: string;
}

export interface Props {
    addToPage: boolean;
    products: Array<Product | null>
    
}
  
function BuyWith({addToPage, products}: Props, ){


    // products.map((product) => <ProductCard product={product} /> )
}

export default BuyWith;



  