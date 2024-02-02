import "./stockGenerator.scss";
<<<<<<< HEAD
import React, { useState } from 'react';
import axios from 'axios';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string;

interface StockItem {
  name: string;
  ticker: string;
  reason: string;
}

// export const StockGenerator: React.FC = () => {
  // const defaultPrompt = "provide a list of 10 none tech stocks for my portfolio. the list must contain the name, ticker, and reason for recommendation. \n\n";

  // const [prompt, setPrompt] = useState<string>(defaultPrompt);
  // const [result, setResult] = useState<StockItem[] | null>(null);
  // const [error, setError] = useState<string | null>(null);

  // const handlePromptChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   setPrompt(event.currentTarget.value);
  // };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "https://api.openai.com/v1/chat/completions",
  //       {
  //         // ... (your existing payload)
  //       },
  //       { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } }
  //     );
  
  //     if (
  //       response.data &&
  //       response.data.choices &&
  //       response.data.choices.length > 0
  //     ) {
  //       // Directly use the response text as a string
  //       const resultText = response.data.choices[0].text;
  //       setResult([resultText]);
  //       setError(null);
  //     } else {
  //       console.error("Invalid response data structure");
  //       setResult(null);
  //       setError("Invalid response data structure");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setResult(null);
  //     setError(
  //       "An error occurred. Please check your internet connection or try again later."
  //     );
  //   }
  // };
  
  
  

  // return (
  //   <div className="container">
  //     <form onSubmit={handleSubmit}>
  //       <label htmlFor="prompt">
          
  //         <input type="hidden" id="prompt" name="prompt" value={prompt} onChange={handlePromptChange} />
  //       </label>
  //       <button type="submit">Generate a portfolio</button>
        
  //     </form>
  //     {result && (
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Name</th>
  //             <th>Ticker</th>
  //             <th>Reason</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {result.map((stock: StockItem, index: number) => (
  //             <tr key={index}>
  //               <td>{stock.name}</td>
  //               <td>{stock.ticker}</td>
  //               <td>{stock.reason}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     )}
  //     {error && <p style={{ color: 'red' }}>{error}</p>}
  //   </div>
  // );

export const StockGenerator: React.FC = () => {

  return (
    <div>
          <button className="btn">Generate a portfolio</button>
          <br/>
          <br/>
    <div><h2> Apple stock recommendation</h2></div>

    <br/>
    <ul>
<li>A time series analysis suggests a temporary price correction of up to 10% in the near term for Apple stock.</li>
<li>Positive corporate figures and analyst estimates could prompt a rebound to the long-term target of $200.</li>
<li>A potential entry point could be around $170.</li>
<li>This analysis is not investment advice and individual circumstances should be considered.</li>
</ul>

  
    </div>
    )
};

export default StockGenerator;
=======

export const StockGenerator = () => {
  return (
    <div className='stockGenerator'>StockGenerator</div>
  )
}
>>>>>>> from_server
