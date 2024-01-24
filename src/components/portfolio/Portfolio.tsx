import React, { useEffect, useState } from "react"; 
import protobuf from "protobufjs"; // decode the binary data
import "./portfolio.scss";
import { get_stock } from "./util";

export const Portfolio: React.FC = () => {
  const [current, setCurrent] = useState<any>(null);

  useEffect(() => { 
    get_stock("AAPL").then((data) => {
      setCurrent(data);
    }) 
    .catch((error) => {
      console.error(error);
    });

  
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
