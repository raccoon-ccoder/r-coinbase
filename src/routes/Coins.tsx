import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { fetchCoins } from "../api";
import SearchIcon from "@material-ui/icons/Search";
import { PinDropSharp } from "@material-ui/icons";

const Container = styled.div`
    width: 100%;
    height: 100%;

`;

const Header = styled.header`
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    background-color: ${props => props.theme.mainColor};
    padding: 10px 40px;
`;

const HeaderBox = styled.section`
    width: 1200px;
    height: 100%;
    padding: 0 20px;
    color: white;
    display: flex;
`;

const Title = styled.h1`
    font-size: 25px;
    display: block;
    margin-top: 8px;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NavList = styled.ul`
    list-style: none;
`;

const NavItem = styled.li`
    float: left;
    margin-left: 50px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        color: ${props => props.theme.headerAccentColor};
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
    box-shadow: 5px 5px 5px 1px #d5d6db;

    @media ${props => props.theme.desktop} {
        margin-top: 120px;
    }
`;

// const SearchBox = styled.div`
//     height: 50px;
// `;

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
`;

const Search = styled.input`
    width: 100%;
    height: 100%;
    font-weight: 600;
    margin-right: 10px;
`;

const CoinsContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;
`;

const CoinNav = styled.ul`
    width: 100%;
    height: 35px;
    background-color: #f2f2f4;
    color: #333;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const CoinNavItem = styled.li<{width : string}>`
    width: ${props => props.width};
`;

const CoinsBox = styled.div``;

const CoinList = styled.table`
    width: 100%;
`;

const Coin = styled.tr`
    background-color: white;
    border-bottom: 1px solid #f1f1f4;
    color: ${props => props.theme.textColor};
    font-size: 13px;
    height: 45px;
    padding: 5px 0px;
    a {
        display: flex;
        align-items: center;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
`;


const CoinName = styled.td<{width: string}>`
    width: ${props => props.width};
`;
const CoinPrice = styled.td<{width: string, color: string}>`
    width: ${props => props.width};
    color: ${props => props.color};
`;
const CoinChange = styled.td<{width: string, color: string}>`
    width: ${props => props.width};
    color: ${props => props.color};
`;
const CoinVolume = styled.td<{width: string}>`
    width: ${props => props.width};
`;

const Loader = styled.div`
    text-align: center;
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
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


function Coins() {
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

    const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);

    // console.log(data);

    return (
    <Container>
         <Helmet>
                <title>
                Raccoon Coinbase
                </title>
            </Helmet>
        <Header>
            <HeaderBox>
                <Title>RBit</Title>
                <Nav>
                    <NavList>
                        <NavItem>거래소</NavItem>
                        <NavItem>입출금</NavItem>
                        <NavItem>투자내역</NavItem>
                    </NavList>
                </Nav>
            </HeaderBox>
        </Header>
        <MainContainer>
            { isLoading ? (
                <Loader>isLoading</Loader>
            ) : (
                <>
                <SearchForm>
                    <Search placeholder="코인명 검색" />
                    <SearchIcon htmlColor="#093687" />
                </SearchForm>
                <CoinsContainer>
                    <CoinNav>
                        <CoinNavItem width="30%">코인명</CoinNavItem>
                        <CoinNavItem width="30%">현재가</CoinNavItem>
                        <CoinNavItem width="15%">전일대비</CoinNavItem>
                        <CoinNavItem width="25%">거래대금</CoinNavItem>
                    </CoinNav>
                    <CoinList>
                        {data?.slice(0, 100).map((coin) => (
                            <Coin key={coin.id}>
                                <CoinName width="30%">
                                    <Link to={`/${coin.id}`} state={coin.name}>
                                        {coin.name}<br/>{coin.symbol}
                                    </Link>
                                </CoinName>
                                <CoinPrice width="30%" color={coin.quotes.KRW.percent_change_24h > 0 ? "#c84a31" : "#1261c4"}>
                                    { coin.quotes.KRW.price >= 100 ? 
                                        Math.floor(coin.quotes.KRW.price).toLocaleString() :
                                        coin.quotes.KRW.price.toFixed(2)
                                    }
                                </CoinPrice>
                                <CoinChange width="15%"  color={coin.quotes.KRW.percent_change_24h > 0 ? "#c84a31" : "#1261c4"}>{coin.quotes.KRW.percent_change_24h}%</CoinChange>
                                <CoinVolume width="25%">{Math.floor(coin.quotes.KRW.volume_24h/1000000).toLocaleString()}백만</CoinVolume>
                            </Coin>
                        ))}
                    </CoinList>
                </CoinsContainer>
                </>
                )}
        </MainContainer>
    </Container>
    );
}

export default Coins;