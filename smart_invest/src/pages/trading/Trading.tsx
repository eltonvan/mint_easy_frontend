
import "./trading.scss";

import News from "../../components/news/News";
import UserStatus from "../../components/userStatus/UserStatus";

import TickerPanel from "../../components/tickerPanel/TickerPanel";
// import { TextBox } from "../../components/textBox/TextBox";



const Trading = () => {
  // Sample data for demonstration
  const sampleData = [
    { date: '2022-01-01', value: 100 },
    { date: '2022-01-02', value: 150 },
    
  ];
    return (
        <div className="trading">
  
            <div className="box box10
            "><TickerPanel 
            color="blue"
            icon="/path/to/icon.png"
            title="Ticker 1"
            number={123}
            percentage={5}
            chartData={sampleData}
            dataKey="value"
            
            
            /></div>

            <div className="box box11"><UserStatus/></div>

            
            <div className="box box12"><News interval={50000}/></div>


        </div>
    )
}

export default Trading