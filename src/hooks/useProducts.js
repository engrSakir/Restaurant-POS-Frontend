import { useEffect, useState } from "react"

const useProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      fetch("https://res.mdsakir.com/api/products")
        .then((res) => res.json())
        .then((data) => setProducts(data.items));
    }, []);
    return [products, setProducts];
}
export default useProducts;