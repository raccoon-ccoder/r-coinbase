const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
    const json = await (await fetch(`${BASE_URL}/tickers?quotes=KRW`)).json();
    return json;
}

export async function fetchCoinInfo(coinId: string | undefined) {
    const coinData = await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
    return coinData;
}

export async function fetchPriceInfo(coinId: string | undefined) {
    const priceData = await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
    return priceData;
}

export async function fetchCoinHistory(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7 * 3;
    const coinHistory = await (await fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`)).json();
    return coinHistory;
}

export async function fetchPriceHistory(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7 * 3;
    const priceHistory = await (await fetch(`${BASE_URL}/tickers/${coinId}/historical?start=${startDate}&end=${endDate}`)).json();
    return priceHistory;
}