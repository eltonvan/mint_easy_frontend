import React, { useEffect, useState } from "react";
import protobuf from "protobufjs";
import "./portfolio.scss";

export const Portfolio: React.FC = () => {
  const [current, setCurrent] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket('wss://streamer.finance.yahoo.com');

    protobuf.load('/YPricingData.proto', (error, root) => {
      if (error) {
        console.error('Error loading protobuf:', error);
        return;
      }

      const Yaticker = root.lookupType("yaticker");

      ws.onopen = () => {
        console.log('connected');
        ws.send(JSON.stringify({
          subscribe: ['MSFT', 'AAPL']
        }));
      };

      ws.onclose = () => {
        console.log('disconnected');
      };

      ws.onmessage = (event) => {
        try {
          const messageData = event.data;
          const next = Yaticker.decode(new Uint8Array(atob(messageData).split('').map(c => c.charCodeAt(0))));
          setCurrent(next);
          console.log(next);
        } catch (decodeError) {
          console.error('Error decoding message:', decodeError);
        }
      };
    });

    // Cleanup function to close the WebSocket
    return () => {
      ws.close();
    };
  }, []); 

  return (
    <div className='portfolio'>
      <h1>Portfolio</h1>
      {current && (
        <div>
          <h2>Current Data:</h2>
          <pre>{JSON.stringify(current, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
