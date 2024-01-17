import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./tickerPanel.scss";

// Import statements remain the same

const TickerPanel: React.FC<TickerPanelProps> = ({ stockName }) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const extractCurrentPrice = (quoteResponseData: any): string => {
    const rawPrice = quoteResponseData?.chart?.result?.[0]?.indicators?.quote?.[0]?.close?.[0];
    return rawPrice !== undefined ? rawPrice.toFixed(2) : 'N/A';
  };
  
  const extractDevelopmentForLastWeek = (historicalResponseData: any): number[] => {
    const closePrices = historicalResponseData?.chart?.result?.[0]?.indicators?.quote?.[0]?.close;
    
    if (closePrices && closePrices.length > 0) {
      return closePrices.map(price => price.toFixed(2));
    }
  
    return [];
  };
  
  const extractLogoUrl = (logoResponseData: string): string => {
    const match = logoResponseData.match(/{"url":"([^"]+)"/);
    return match ? match[1] : 'N/A';
  };
  

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Use cors-anywhere to proxy the requests
        const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

        const quoteResponse = await axios.get(`${corsAnywhereUrl}https://finance.yahoo.com/quote/${stockName}`);
        const historicalResponse = await axios.get(
          `${corsAnywhereUrl}https://query1.finance.yahoo.com/v8/finance/chart/${stockName}?interval=1d&range=1wk`
        );
        const logoResponse = await axios.get(`${corsAnywhereUrl}https://finance.yahoo.com/quote/${stockName}/logo`);

        const currentPrice = extractCurrentPrice(quoteResponse.data);
        const developmentForLastWeek = extractDevelopmentForLastWeek(historicalResponse.data);
        const logoUrl = extractLogoUrl(logoResponse.data);




        setStockData({ currentPrice, developmentForLastWeek, logoUrl });
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchStockData();
  }, [stockName]);

  if (!stockData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Stock: {stockName}</h2>
      <p>Current Price: {stockData.currentPrice}</p>
      <p>Development for Last Week: {stockData.developmentForLastWeek}</p>
      <img src={stockData.logoUrl} alt="Stock Logo" />
    </div>
  );
};

// Extract functions remain the same

export default TickerPanel;

