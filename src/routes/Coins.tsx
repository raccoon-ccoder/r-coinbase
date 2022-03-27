import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

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

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;
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
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
};


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

    return (
    <Container>
        <Header>
            <Title>Raccoon Coinbase</Title>
        </Header>
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
                    </Coin>
                ))}
            </CoinList>
            )}
    </Container>
    );
}

export default Coins;