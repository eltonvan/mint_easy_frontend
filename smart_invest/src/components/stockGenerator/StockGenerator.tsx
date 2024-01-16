import "./stockGenerator.scss";
import React, { useState } from 'react';
import axios from 'axios';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const StockGenerator: React.FC = () => {
  const defaultPrompt = "provide a list of 10 none tech stocks for my portfolio. the list must contain the name, ticker, and reason for recommendation. \n\n";

  const [prompt, setPrompt] = useState<string>(defaultPrompt);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePromptChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPrompt(event.currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions", // Update the endpoint URL
        {
          model: "gpt-3.5-turbo-1106", // Specify the model explicitly
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.5,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
      }, { headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` } });
      console.log(response.data.choices[0].text);
      setResult(response.data.choices[0].text);
      setError(null);
    } catch (error) {
      console.error(error);
      setResult(null);
      setError("An error occurred. Please check your internet connection or try again later.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">
          Prompt:
          <input type="text" id="prompt" name="prompt" value={prompt} onChange={handlePromptChange} />
        </label>
        <button type="submit">Generate</button>
      </form>
      {result && <p>{result}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default StockGenerator;
