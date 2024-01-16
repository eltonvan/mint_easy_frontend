import React, { useEffect } from "react";
import protobuf from "protobufjs";
import "./portfolio.scss";

export const Portfolio: React.FC = () => {
  useEffect(() => {
    // open websocket connection to Yahoo Finance

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

          // let timer = setInterval(messageData, 6000);
          // clearInterval(timer);
          // ws.close();
          
          const decodedData = Yaticker.decode(new Uint8Array(atob(messageData).split('').map(c => c.charCodeAt(0))));

          console.log(decodedData);
        } catch (decodeError) {
          console.error('Error decoding message:', decodeError);
        }
      };
    });
  }, []); 

  return (
    <div className='portfolio'>Portfolio</div>
  );
};
