import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
    width: 100%;
    height: 100%;

`;

const MainContainer = styled.div`
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-top: 120px;
    display: flex;
    justify-content: center;
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

const CoinList = styled.ul`
    width: 800px;
`;

const Coin = styled.li`
    background-color: white;
    height: 100px;
    border-bottom: 1px solid #f1f1f4;
    color: ${props => props.theme.textColor};
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${props => props.theme.accentColor};
        }
    }
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
    console.log(data);
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
                <CoinList>
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`} state={coin.name}>
                                <Img src={`https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin.name .toLowerCase().split(" ").join("-")}.png`} />
                                {coin.name} &rarr;
                            </Link>
                            {coin.symbol}/KRW,{coin.quotes.KRW.price},{coin.quotes.KRW.percent_change_24h},{coin.quotes.KRW.volume_24h}
                        </Coin>
                    ))}
                </CoinList>
                )}
        </MainContainer>
    </Container>
    );
}

export default Coins;