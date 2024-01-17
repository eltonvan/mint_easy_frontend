// Import statements remain the same

const TickerPanel: React.FC<TickerPanelProps> = ({ stockName }) => {
    const [stockData, setStockData] = useState<StockData | null>(null);
  
    useEffect(() => {
      const fetchStockData = async () => {
        try {
          // Use cors-anywhere to proxy the requests
          const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
  
          const quoteResponse = await axios.get(`${corsAnywhereUrl}https://finance.yahoo.com/quote/${stockName}`);
          const historicalResponse = await axios.get(
            `${corsAnywhereUrl}https://query1.finance.yahoo.com/v8/finance/chart/${stockName}?interval=1d&range=1wk`
          );
          const logoResponse = await axios.get(`${corsAnywhereUrl}https://finance.yahoo.com/quote/${stockName}/logo`);
  
          const currentPrice = extractCurrentPrice(quoteResponse.data);
          const developmentForLastWeek = extractDevelopmentForLastWeek(historicalResponse.data);
          const logoUrl = extractLogoUrl(logoResponse.data);
  
          setStockData({ currentPrice, developmentForLastWeek, logoUrl });
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      };
  
      fetchStockData();
    }, [stockName]);
  
    if (!stockData) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Stock: {stockName}</h2>
        <p>Current Price: {stockData.currentPrice}</p>
        <p>Development for Last Week: {stockData.developmentForLastWeek}</p>
        <img src={stockData.logoUrl} alt="Stock Logo" />
      </div>
    );
  };
  
  // Extract functions remain the same
  
  export default TickerPanel;
  