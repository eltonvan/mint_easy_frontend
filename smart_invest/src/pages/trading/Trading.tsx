
import "./trading.scss";

import News from "../../components/news/News";
import UserStatus from "../../components/userStatus/UserStatus";


import TickerPanel from "../../components/tickerPanel/TickerPanel";
import ChartBox from "../../components/chartBox/ChartBox";
import { chartBoxProduct, chartBoxUser,chartBoxConversion, chartBoxRevenue, barChartBoxVisit, barChartBoxRevenue, userStockData } from "../../data";
// import { TextBox } from "../../components/textBox/TextBox";



const Trading = () => {

    return (
        <div className="trading">
  
            <div className="box box10 
            ">
        <div className="chartBoxWrapper">
          <div className="chartBoxContainer"><ChartBox {...chartBoxUser} /></div>
          <div className="chartBoxContainer"><ChartBox {...chartBoxProduct} /></div>
          <div className="chartBoxContainer"><ChartBox {...chartBoxConversion} /></div>
          <div className="chartBoxContainer"><ChartBox {...chartBoxRevenue} /></div>


        </div>
            

            
            
            </div>

            <div className="box box11"><UserStatus/></div>

            
            <div className="box box12"><News interval={50000}/></div>


        </div>
    )
}

export default Trading