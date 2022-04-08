import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { fetchCoins } from "../api";
import SearchIcon from "@material-ui/icons/Search";
import Header from "../components/Header";

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
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 5px 5px 5px 1px ${props => props.theme.shadowColor};
    overflow: hidden;
    @media ${props => props.theme.desktop} {
        margin-top: 0px;
    }
`;

const SearchForm = styled.form`
    width: 100%;
    height: 40px;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #d5d6db;
    background-color: ${props => props.theme.basicColor};
`;

const Search = styled.input`
    width: 100%;
    height: 100%;
    font-weight: 600;
    margin-right: 10px;
    background-color: ${props => props.theme.basicColor};
    color: ${props => props.theme.textColor};
`;

const CoinsContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const CoinNav = styled.ul`
    width: 100%;
    height: 35px;
    background-color: ${props => props.theme.coinNavColor};
    color: ${props => props.theme.textColor};
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const CoinNavItem = styled.li<{width : string}>`
    width: ${props => props.width};
`;

const CoinList = styled.table`
    width: 100%;
    overflow: hidden;
    table-layout: fixed;
    background-color: ${props => props.theme.basicColor};
`;

const Coin = styled.tr`
    border-bottom: 1px solid ${props => props.theme.tableLineColor};
    color: ${props => props.theme.textColor};
    font-size: 13px;
    height: 45px;
    padding: 5px 0px;
    a {
        transition: color 0.2s ease-in;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        flex-direction: column;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;

interface CoinInfoProps {
    width: string;
    color?: string;
    thick?: string;
    fontSize?: string,
    textAlign?: string,
}

const CoinInfo = styled.td<CoinInfoProps>`
    padding: 0 5px;
    width: ${props => props.width};
    color: ${props => props.color};
    font-weight: ${props => props.thick};
    font-size: ${props => props.fontSize};
    text-align: ${props => props.textAlign};
    vertical-align: middle;
`;

const CoinName = styled.span``;

const CoinId = styled.span`
    margin-top: 3px;
    font-weight: 100;
    color: ${props => props.theme.grayColor};
`;

const Loader = styled.div`
    text-align: center;
`;

interface ICoins {
    id: string,
    rank: number,
    name: string,
     symbol: string,
     quotes: { 
     KRW: { 
       price: number,
       market_cap: number,
       volume_24h: number,
       percent_change_24h: number,
       percent_change_7d: number
    }
  },
}

const CoinBox = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
`;

function Coins({isDarkMode, toggleDarkMode}) {
    /*  const[coins, setCoins] = useState<ICoins[]>([]);
    const[loading, setLoading] = useState(true);

    const getCoins = async () => {
        const json = await (await fetch("https://api.coinpaprika.com/v1/coins")).json();
        setCoins(json.slice(0, 100));
        setLoading(false);
    };

    useEffect(() => {
        getCoins();
    }, []); */

    let { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins, {onSuccess : (data) => setCoinList(data)});
    const [coinName, setCoinName] = useState("");
    const [coinList, setCoinList] = useState<ICoins[]>();

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { 
            currentTarget: {value},
        } = e;
        if(value !== "") {
            setCoinName(value);
            setCoinList(data?.filter(v => v.name.includes(coinName)));
        }else {
            setCoinName(value);
            setCoinList(data);
        }
    };

    return (
    <Container>
         <Helmet>
                <title>
                Raccoon Coinbase
                </title>
            </Helmet>
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <MainContainer>
            { isLoading ? (
                <Loader>isLoading</Loader>
            ) : (
                <>
                <SearchForm>
                    <Search placeholder="코인명 검색" onChange={onChange}/>
                    <SearchIcon htmlColor="#093687" />
                </SearchForm>
                <CoinsContainer>
                    <CoinNav>
                        <CoinNavItem width="35%">
                            코인명
                        </CoinNavItem>
                        <CoinNavItem width="22%">
                            현재가
                        </CoinNavItem>
                        <CoinNavItem width="15%">
                           전일대비
                        </CoinNavItem>
                        <CoinNavItem width="28%">
                            거래대금(백만)
                        </CoinNavItem>
                    </CoinNav>
                 <CoinBox>
                    <CoinList>
                        {coinList?.slice(0, 100).map((coin) => (
                            <Coin key={coin.id}>
                                <CoinInfo 
                                    width="35%" 
                                    thick="600"
                                >
                                    <Link to={`/${coin.id}`} state={coin.name}>
                                        <CoinName>{coin.name}</CoinName>
                                        <CoinId>{coin.symbol}/KRW</CoinId>
                                    </Link>
                                </CoinInfo>
                                <CoinInfo 
                                    width="22%" 
                                    color={coin.quotes.KRW.percent_change_24h > 0 ? "#c84a31" : "#1261c4"} 
                                    thick="600"
                                    textAlign="right"
                                >
                                    { coin.quotes.KRW.price >= 100 ? 
                                        Math.floor(coin.quotes.KRW.price).toLocaleString() :
                                        coin.quotes.KRW.price.toFixed(2)
                                    }
                                </CoinInfo>
                                <CoinInfo 
                                    width="15%" 
                                    color={coin.quotes.KRW.percent_change_24h > 0 ? "#c84a31" : "#1261c4"}
                                    textAlign="right"
                                >
                                    {coin.quotes.KRW.percent_change_24h}%
                                </CoinInfo>
                                <CoinInfo 
                                    width="28%" 
                                    fontSize="12px"
                                    textAlign="right"
                                >
                                    {Math.floor(coin.quotes.KRW.volume_24h/1000000).toLocaleString()}
                                </CoinInfo>
                            </Coin>
                        ))}
                    </CoinList>
                    </CoinBox>
                </CoinsContainer>
                </>
                )}
        </MainContainer>
    </Container>
    );
}

export default Coins;