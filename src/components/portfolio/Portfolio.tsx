import React, { useEffect, useState } from "react";
import protobuf from "protobufjs"; // decode the binary data
import "./portfolio.scss";
import { get_stock } from "./util";

export const Portfolio: React.FC = () => {
  const [stockData, setStockData] = useState<any[]>([]);

  useEffect(() => {
    const stockSymbols = ["MSFT", "TSLA", "AAPL", "AMZN", "META", "HYZN"];

    // Establish WebSocket connection outside the loop
    const ws = new WebSocket("wss://streamer.finance.yahoo.com");

    protobuf.load('/YPricingData.proto', (error, root) => {
      if (error) {
        console.error('Error loading protobuf:', error);
        return;
      }

      // get the Yaticker type from the protobuf
      const Yaticker = root.lookupType("yaticker");

      // subscribe to all specified stock tickers
      ws.onopen = () => {
        console.log('connected');
        ws.send(JSON.stringify({
          subscribe: stockSymbols,
        }));
      };

      // handle the close event
      ws.onclose = () => {
        console.log('disconnected');
      };

      // handle the message event
      ws.onmessage = (event) => {
        try {
          const messageData = event.data;
          // decode the binary data, set the current state, and loop through the data
          const next = Yaticker.decode(new Uint8Array(atob(messageData).split('').map(c => c.charCodeAt(0))));
          
          setStockData((prevData) => {
            // Check if the stock data already exists in the array
            const existingIndex = prevData.findIndex((item) => item.id === next.id);
            if (existingIndex === -1) {
              // If not, add the new data
              return [...prevData, next];
            } else {
              // If exists, update the data
              prevData[existingIndex] = next;
              return [...prevData];
            }
          });
        } catch (decodeError) {
          console.error('Error decoding message:', decodeError);
        }
      };
    });

    // Clean up WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []); 

  return (
    <div className='portfolio'>
      <h1>Portfolio</h1>
      {stockData && (
        <div>
          <h2>Current Data:</h2>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
