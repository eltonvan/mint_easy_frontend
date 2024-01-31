
import "./investing.scss";
import News from "../../components/news/News";
import { Portfolio } from "../../components/portfolio/Portfolio";
import { StockGenerator } from "../../components/stockGenerator/StockGenerator";// import { TextBox } from "../../components/textBox/TextBox";
import { StockPortfolio } from "../../components/stockPortfolio/StockPortfolio";
import StockOrder from "../../components/stockOrder/StockOrder";
import { useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import { GridColDef } from '@material-ui/data-grid';
import { useEffect } from "react";
import instance from "../../axiosInstance";
import { useAuthStateContext } from "../../contexts/AuthStateContext";




const Investing = () => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'symbol', headerName: 'Symbol', width: 100 },
        { field: 'buy', headerName: 'Buy', type: 'boolean', width: 100 },
        { field: 'sell', headerName: 'Sell', type: 'boolean', width: 100 },
        { field: 'open_price', headerName: 'Open Price', type: 'number', width: 120 },
        { field: 'close_price', headerName: 'Close Price', type: 'number', width: 120 },
        { field: 'quantity', headerName: 'Quantity', type: 'number', width: 100 },
        { field: 'amount', headerName: 'Amount', type: 'number', width: 100 },
        { field: 'stop_loss', headerName: 'Stop Loss', type: 'number', width: 120 },
        { field: 'take_profit', headerName: 'Take Profit', type: 'number', width: 120 },
        { field: 'day_trading', headerName: 'Day Trading', type: 'boolean', width: 120 },
        { field: 'long_term_invest', headerName: 'Long Term Invest', type: 'boolean', width: 150 },
        { field: 'start_date', headerName: 'Start Date', width: 180 },
        { field: 'end_date', headerName: 'End Date', width: 180 },
      ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profitLossData, setProfitLossData] = useState<any[]>([]);
    console.log("Profit/loss data:", profitLossData);
    const { userId } = useAuthStateContext();

    useEffect(() => {
        const fetchProfitLossData = async () => {
          try {
            const profitLossResponse = await instance.get(`/data/stock-order/${userId}/profit-loss/`);
            setProfitLossData(profitLossResponse.data);
            console.log("Profit/loss data:", profitLossResponse.data);
          } catch (error) {
            console.error("Error fetching profit/loss data:", error);
          }
        };
    
        // Fetch initial profit/loss data
        fetchProfitLossData();
      }, [userId]);


    return (
        <div className="investing">
  
            <div className="box box13
            "><StockGenerator /></div>

            <div className="box box14"><StockPortfolio/></div>

            <div className="box box11">

             <button onClick={() => setIsModalOpen(true)}>order</button>
             <StockOrder slug="order" isOpen={isModalOpen} setOpen={setIsModalOpen} />
             <DataTable columns={columns} rows={profitLossData} slug="orders" />

            </div>
            
            <div className="box box12"><News interval={50000} /></div>


        </div>
    )
}

export default Investing