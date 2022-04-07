import { useQuery } from "react-query";
import { useOutletContext, useParams } from "react-router-dom";
import { fetchPriceHistory } from "../api";
import styled from "styled-components";

interface ICoin {
    coinId: string,
}

interface IHistory {
    timestamp: string,
    price: number,
    volume_24h: number,
    market_cap: number,
}

const PriceContainer = styled.div`
    width: 90%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const PriceTable = styled.table`
    width: 100%;
    height: 100%;
`;

const PriceItem = styled.tr`
    height: 30px;
    font-size: 15px;
    border: 1px solid ${props => props.theme.tableLineColor};
`;

const PriceTitle = styled.th`
    vertical-align: middle;
    color: ${props => props.theme.grayColor};
    text-align: center;
    border: 1px solid ${props => props.theme.tableLineColor};
`;

const PriceInfo = styled.td<{textAlign: string}>`
    vertical-align: middle;
    text-align: ${props => props.textAlign};
    border: 1px solid ${props => props.theme.tableLineColor};
    padding-right: 5px;
    font-size: 14px;
`;

function Price() {
    const { coinId } = useOutletContext<ICoin>();
    const {isLoading, data} = useQuery<IHistory[]>(["priceHistory", coinId], () => fetchPriceHistory(coinId));

    const getDate = (date:string) => {
        const d = new Date(date);
        const month = String(d.getMonth()).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${month}.${day}`;
    };
    return (
        <PriceContainer>
            { isLoading ? (
                "Loading Price"
            ) : (
                <PriceTable>
                    <PriceItem>
                        <PriceTitle>일자</PriceTitle>
                        <PriceTitle>종가(USD)</PriceTitle>
                        <PriceTitle>거래량</PriceTitle>
                    </PriceItem>
                    { data?.map((price) => (
                        <PriceItem>
                            <PriceInfo textAlign="center">{getDate(price.timestamp)}</PriceInfo>
                            <PriceInfo textAlign="right">{price.price.toLocaleString()}</PriceInfo>
                            <PriceInfo textAlign="right">{price.volume_24h.toLocaleString()}</PriceInfo>
                        </PriceItem>
                    ))}
                </PriceTable>
            )
            }
        </PriceContainer>
    );
}

export default Price;