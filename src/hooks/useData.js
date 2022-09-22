import { useEffect, useState } from "react"

const useData = () => {
    const [appData, setAppData] = useState({});
    useEffect(() => {
      // 
      fetch("https://res.mdsakir.com/api/products")
        .then((res) => res.json())
        .then((data) => setAppData(data));
    }, []);
    return [appData];
}
export default useData;