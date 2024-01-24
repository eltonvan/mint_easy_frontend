// Define the get_stock function
import protobuf from "protobufjs";

export const get_stock = (stock: string, setStockData: any) => {
    const ws = new WebSocket('wss://streamer.finance.yahoo.com'); // connect to the WebSocket

    protobuf.load('/YPricingData.proto', (error, root) => {
      if (error) {
        console.error('Error loading protobuf:', error);
        return;
      }
      // get the Yaticker type from the protobuf
      const Yaticker = root.lookupType("yaticker"); 

      // subscribe to the specified stock ticker
      ws.onopen = () => { 
        console.log('connected');
        ws.send(JSON.stringify({
          subscribe: [stock] // Use the provided stock parameter
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
          
          ws.close();
          //console.log("from util", next);
          setStockData((prevData) => [...prevData, next]);
    
          
        } catch (decodeError) {
            console.error('Error decoding message:', decodeError);
            
        }
      };

    });
    


  };