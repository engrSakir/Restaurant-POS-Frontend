import { useEffect, useState } from "react"

const useProduct = () => {
    const [products, setProducts] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    useEffect(() => {
        //
        fetch("https://res.mdsakir.com/api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setAllProduct(data);

            });

    }, []);
    return [products,allProduct, setProducts];
}
export default useProduct;
