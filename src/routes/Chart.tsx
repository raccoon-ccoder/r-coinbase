import { useQuery } from "react-query";
import { useOutletContext, useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";

interface ICoin {
    coinId: string,
}

interface IHistory {
    time_open: string,
    time_close: string,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    market_cap: number,
}

function Chart() {
    // coinId 가져오기 방법 1. useParams() 이용해서 parameter 가져오기
    // const params = useParams();

    // coinId 가져오기 방법 2. Outlet컴포넌트와 useOutletContext()훅 이용
    const { coinId } = useOutletContext<ICoin>();
    
    const {isLoading, data} = useQuery<IHistory[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
    
    return (
        <div>
            { isLoading ? (
                "Loading Chart"
            ) : (
                <ReactApexChart 
                    type="candlestick" 
                    series={[
                        {
                          data: 
                            data?.map((price) => {
                              return [
                                Date.parse(price.time_close),
                                price.open,
                                price.high,
                                price.low,
                                price.close,
                              ];
                            }) as any,
                        },
                      ]}
                      options={{
                        theme: {
                          mode: "dark",
                        },
                        chart: {
                          type: "candlestick",
                          height: 300,
                          width: 500,
                          background: "transparent",
                        },
                        stroke: {
                          curve: "smooth",
                          width: 1,
                        },
                        yaxis: {
                          show: true,
                          showAlways: true,
                          tickAmount: 4,
                          labels : {
                            show: true,
                            formatter: (value) => `${value.toFixed(2)}`,
                            align: "center",
                          },
                        },
                        xaxis: {
                          type: "datetime",
                          categories: data?.map((price) => price.time_close),
                          labels: {
                            style: {
                              colors: '#9c88ff'
                            }
                          },
                          
                        },
                        // tooltip: {
                        //     y: {
                        //         formatter: (value) => `$${value.toFixed(3)}`
                        //     },
                        // },
                        plotOptions: {
                          candlestick: {
                            colors: {
                              upward: '#3C90EB',
                              downward: '#DF7D46'
                            },
                          }
                        }
                      }}
                />
            ) }
        </div>
    );
}

export default Chart;