import { useQuery } from "react-query";
import { useOutletContext, useParams } from "react-router-dom";
import { fetchPriceHistory } from "../api";

interface ICoin {
    coinId: string,
}

interface IHistory {
    timestamp: string,
    price: number,
    volume_24h: number,
    market_cap: number,
}

function Price() {
    const { coinId } = useOutletContext<ICoin>();
    const {isLoading, data} = useQuery<IHistory[]>(["priceHistory", coinId], () => fetchPriceHistory(coinId));
    return (<h1>{data}</h1>);
}

export default Price;