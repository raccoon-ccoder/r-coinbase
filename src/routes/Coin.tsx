import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useParams, useMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import Header from "../components/Header";
import { useQuery } from "react-query";
import { fetchCoinInfo } from "../api";
import { fetchPriceInfo } from "../api";


const Container = styled.div`
     width: 100%;
    height: 100%;
    @media ${props => props.theme.desktop} {
        padding: 100px 0 50px 0;
        min-height: 500px;
    }
`;

const MainContainer = styled.div`
    max-width: 480px;
    height: 100%;
    margin: 0 auto;
    margin-top: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    @media ${props => props.theme.desktop} {
        margin-top: 0px;
    }
`;

const Title = styled.h1`
    color: ${props => props.theme.grayColor};
    font-size: 30px;
`;

const Loader = styled.div`
    text-align: center;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props => props.theme.coinNavColor};
    padding: 10px 20px;
    border-radius: 10px;
    margin: 10px 0px;
    width: 90%;
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
  margin: 20px;
`;

const Tabs = styled.div`
  display: grid;
  width: 90%;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 400;
  background-color: ${props => props.theme.grayColor};
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
    const { isLoading: priceLoading, data: price } = useQuery<IPrice>(
        ["tickers",coinId], 
        () => fetchPriceInfo(coinId),
        {
            refetchInterval: 5000,
        }
    );
    // priceLoading, price??? type??? ?????? ?????? ?????? ????????? ????????? ???????????? ??????
    // ?????? query key??? unique?????? ????????? ?????? ???????????? ?????? (string ?????? ????????? array??? ??????)

    // ????????? useQuery Key, fetcher func?????? "string | undefined' ????????? ????????? ????????? ??? ??????
    // ?????? react-router-dom 6????????? useParams ???????????? ????????? string ?????? undefined??? ???????????????
    // ????????? useParams??? type??? ?????????
    // ????????? ????????????????????? as??? ????????? ????????? type?????? ??????????????? ?????? ??????
    // ??????...? useLocation??? type??? interface??? ???????????????

    const loading = infoLoading && priceLoading;


    // // react-router-dom v6 ?????? ???????????? ???????????? ????????????.
    // // useLocation<RouteState>(); ??? ???????????? ??????
   
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
            <Helmet>
                <title>
                    {state ? state : loading ? "Loading" : info?.name}
                </title>
            </Helmet>
            <Header />

        <MainContainer>
            <Title>{state ? state : loading ? "Loading" : info?.name}</Title>
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
                            <span>Price:</span>
                            <span>${price?.quotes.USD.price.toFixed(3)}</span>
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
        </MainContainer>
           
        </Container>
    );
}

export default Coin;

// <Title>{state ? state : loading ? "Loading" : coinId}</Title>
// ?????????????????? ????????? ?????? state??? ????????? state (coin name)??? ????????????
// ?????? url?????? ????????? ?????? ??????????????? ?????? coin ????????? ????????????

// useMatch(url) : ?????? url??? ????????? ????????? ! ????????? url ?????? object ???????????? null