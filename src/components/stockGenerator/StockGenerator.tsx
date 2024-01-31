// Import necessary libraries and styles
import "./stockGenerator.scss";
import React, { useState } from 'react';
import instance from "../../axiosInstance";
import { useMutation } from '@tanstack/react-query';
import { updateCSRFToken } from '../../axiosInstance';

type StockItemData = {
  symbol: string;
};

const StockGenerator: React.FC<any> = () => {
  const [formData, setFormData] = useState<StockItemData>({
    symbol: '',
  });

  // State to manage errors
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    ticker: null,
  });

  // State to store the response from the server
  const [answer, setAnswer] = useState<string | null>(null);

  // Create a mutation using useMutation
  const mutation = useMutation({
    mutationFn: async () => {
      updateCSRFToken(); 
      console.log("form data", formData);

      try {
        const response = await instance.post('/data/api/retrieve-chat-response/', formData);
        console.log("response", response);

        if (response.data) {
          setAnswer(response.data);
          console.log("answer", response.data);
        }
      } catch (error) {
        // catch any errors
        console.error("error", error);
        setErrors(error.response?.data || { symbol: 'An error occurred' }); // set the errors
        throw error;
      }
    },
  });

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({ symbol: null });

    try {
      await mutation.mutateAsync();  // execution is paused until the promise is resolved
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
  //   setFormData({ ...formData, [field]: e.target.value });

  //   setErrors({ ...errors, [field]: null });
  // };

  return (
    <div className="stockGenerator">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label htmlFor="symbol">Ticker</label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData,  symbol: e.target.value })}
            />
            
            <button type="submit" className="btn">send</button>

            {errors.symbol && <div className="error">{errors.symbol}</div>}
          </div>
        </form>

        {/* Display result from the server */}
        {answer && (
          <div>
            <h2>What we think</h2>
            <div className="answer">{answer}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockGenerator;
