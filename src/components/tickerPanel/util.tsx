// Define the get_stock function
import protobuf from "protobufjs";

export const get_stock = (stocks: String[], setStockData: any, ws: any) => {

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
          subscribe: stocks // Use the provided stock parameter
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
            let exists = false;
            const updatedData = prevData.map((item) => {
              if (item.id === next.id) {
                exists = true;
                return next;
              }
              return item;
            });

            if (!exists) {
              return [...updatedData, next];
            }
            
            return updatedData;
          });
        
        } catch (decodeError) {
            console.error('Error decoding message:', decodeError);
            
        }
      };

    });
    


  };