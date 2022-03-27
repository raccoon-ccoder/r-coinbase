import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useParams, useMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo } from "../api";
import { fetchPriceInfo } from "../api";


const Container = styled.div`
    max-width: 480px;
    height: 100%;
    margin: 0 auto;
    padding: 20px;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    color: ${props => props.theme.accentColor};
    font-size: 48px;
`;

const Loader = styled.div`
    text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`

interface IInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    tags: object;
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
};

interface IPrice {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD : {
            ath_date: string,
            ath_price: number,
            market_cap: number,
            market_cap_change_24h: number,
            percent_change_1h: number,
            percent_change_1y: number,
            percent_change_6h:number,
            percent_change_7d: number,
            percent_change_12h:number,
            percent_change_15m: number,
            percent_change_24h: number,
            percent_change_30d: number,
            percent_change_30m: number,
            percent_from_price_ath: number,
            price: number,
            volume_24h: number,
            volume_24h_change_24h: number,
        }
    };
}

interface RouteState {
    state : {
        name : string;
    }
};

type IParams = {
    coinId: string;
};

function Coin() {
    const { coinId } = useParams() as IParams;
    const { state } = useLocation() as RouteState;
    const priceMatch = useMatch("/:coinId/price");   
    const chartMatch = useMatch("/:coinId/chart");
    const { isLoading: infoLoading, data: info } = useQuery<IInfo>(["info",coinId], () => fetchCoinInfo(coinId));
    const { isLoading: priceLoading, data: price } = useQuery<IPrice>(["tickers",coinId], () => fetchPriceInfo(coinId));
    // priceLoading, price는 type이 아닌 해당 값을 원하는 변수에 담겠다는 의미
    // 또한 query key는 unique해야 하기에 다른 이름으로 부여 (string 뿐만 아니라 array도 가능)

    // 참고로 useQuery Key, fetcher func에는 "string | undefined' 형식의 인수를 할당할 수 없음
    // 또한 react-router-dom 6에서는 useParams 반환값의 타입이 string 혹은 undefined로 자동설정됨
    // 따라서 useParams에 type을 설정함
    // 그런데 인터페이스로는 as로 설정이 안되서 type으로 변경했더니 오류 해결
    // 왜지...? useLocation의 type은 interface로 해결했는데

    const loading = infoLoading && priceLoading;


    // // react-router-dom v6 부터 제네릭을 지원하지 않습니다.
    // // useLocation<RouteState>(); 로 작성하면 안됌
   
    // const[loading, setLoading] = useState(true);
    // const[info, setInfo] = useState<IInfo>();
    // const[price, setPrice] = useState<IPrice>();

    // const getCoins = async () => {
    //     const coinData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //     const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();

    //     setInfo(coinData);
    //     setPrice(priceData);
    //     setLoading(false);
    // };

    // useEffect(() => {
    //     getCoins();
    // }, [coinId]);

    return (
        <Container>
            <Header>
                <Title>{state ? state : loading ? "Loading" : info?.name}</Title>
            </Header>
            { loading ? (
                <Loader>loading</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{info?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${info?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Open Source:</span>
                            <span>{info?.open_source ? "Yes" : "No"}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{info?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{price?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{price?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    <Tabs>
                        <Tab isActive={ chartMatch !== null }>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={ priceMatch !== null }>
                            <Link to={`/${coinId}/price`}>price</Link>
                        </Tab>
                    </Tabs>
                  
                    <Outlet context={{coinId}} />
                </>
                )
            }
        </Container>
    );
}

export default Coin;

// <Title>{state ? state : loading ? "Loading" : coinId}</Title>
// 홈페이지에서 넘어온 경우 state가 있기에 state (coin name)을 보여준다
// 직접 url에서 입력한 경우 파라미터에 있는 coin 이름을 출력한다

// useMatch(url) : 해당 url에 접속해 있는지 ! 맞다면 url 관련 object 아니라면 null