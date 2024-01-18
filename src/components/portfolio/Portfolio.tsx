import React, { useEffect, useState } from "react"; 
import protobuf from "protobufjs"; // decode the binary data
import "./portfolio.scss";

export const Portfolio: React.FC = () => {
  const [current, setCurrent] = useState<any>(null);

  useEffect(() => { 
    const ws = new WebSocket('wss://streamer.finance.yahoo.com'); // connect to the WebSocket

    protobuf.load('/YPricingData.proto', (error, root) => {
      if (error) {
        console.error('Error loading protobuf:', error);
        return;
      }
      // get the Yaticker type from the protobuf
      const Yaticker = root.lookupType("yaticker"); 

      // subscribe to the MSFT and AAPL tickers
      ws.onopen = () => { 
        console.log('connected');
        ws.send(JSON.stringify({
          subscribe: ['MSFT', 'AAPL']
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
          // decode the binary data ,set the current state and loop through the data
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
