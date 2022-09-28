import { useEffect, useState } from "react"

const useCategory = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        //
        fetch("https://res.mdsakir.com/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);
    return [categories, setCategories];
}
export default useCategory;
