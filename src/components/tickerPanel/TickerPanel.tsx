<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ChartBox from "../../components/chartBox/ChartBox";
import "./tickerPanel.scss";
import { get_stock } from "./util";

interface StockDataItem {
  id: string;
  price: number;
  changePercent: number;
}

interface ChartDataPoint {
  name: string;
  revenue: number;
}

interface TickerDataItem {
  id: number;
  title: string;
  number: number;
  percentage: number;
  chartData: { name: string; revenue: number }[];
  dataKey: string;
  color: string;
}

const stockSymbols = ["MSFT", "TSLA", "AAPL", "AMZN", "GOOGL"];

const TickerPanel = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 10000,
    cssEase: 'linear',
    pauseOnHover: true,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: "40px",
    className: "slides",
  };

  const [stockData, setStockData] = useState<any[]>([]);
  const [initialChartDataMap, setInitialChartDataMap] = useState<{ [id: string]: { name: string; revenue: number }[] }>({});
  const [tickerData, setTickerData] = useState<TickerDataItem[]>([]);

  useEffect(() => {
    const ws = new WebSocket('wss://streamer.finance.yahoo.com'); // connect to the WebSocket
    get_stock(stockSymbols, setStockData, ws)
    return () => {
      ws.close();
    };
  }, []); 

  useEffect(() => {
    console.log("stockData", stockData);

    const cleanData = stockData.map((item, index) => {
      const id = item.id;
      const existingInitialChartData = initialChartDataMap[id];

      const randomChartData = existingInitialChartData || generateRandomChartData();

      if (!existingInitialChartData) {
        setInitialChartDataMap(prevMap => ({ ...prevMap, [id]: randomChartData }));
      }

      return {
        id: index,
        title: item.id,
        number: Math.round(item.price * 100) / 100,
        percentage: Math.round(item.changePercent * 100) / 100,
        chartData: randomChartData,
        dataKey: "revenue",
        color: item.changePercent < 0 ? "tomato" : "limegreen",
      };
    });

    setTickerData(cleanData);
  }, [stockData, initialChartDataMap]);

  const generateRandomChartData = (): { name: string; revenue: number }[] => {
    // Generate and return random chart data
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek.map((day) => ({
      name: day,
      revenue: Math.floor(Math.random() * (1800 - 70 + 1)) + 10,
    }));
  };

  return (
    <Slider {...settings}>        
      {tickerData.map(({ id, ...otherProps }) => (
        <div key={id} className="chartBoxContainer"><ChartBox {...otherProps} /></div>
      ))}
    </Slider> 
  );
}
=======
// not in use
// placeholder for further customization

import "./tickerPanel.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
    color: string;
    icon: string;
    title: string;
    number: number | string;
    percentage: number;
    chartData: object[];
    dataKey: string;
};

const TickerPanel = (props: Props) => {
  return (
    <div className="tickerPanel">
      <div className="boxInfo">
        <div className="title">
          <img src={props.icon} alt="" />
          <span>{props.title}</span>
        </div>
        
        <h1>ticker panel</h1>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
                <Tooltip 
                contentStyle={{ backgroundColor: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 60 }} 
                />
            <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
            />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span className="percentage" style={{color: props.percentage<0 ? "tomato" : "limegreen"}}></span>
          <span className="duration"></span>
        </div>
      </div>
    </div>
  );
};
>>>>>>> from_server

export default TickerPanel;
