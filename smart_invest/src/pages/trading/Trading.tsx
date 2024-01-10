
import "./trading.scss";
import ChartBox from "../../components/chartBox/ChartBox";
import { chartBoxProduct, chartBoxUser,chartBoxConversion, chartBoxRevenue, barChartBoxVisit, barChartBoxRevenue } from "../../data";
import News from "../../components/news/News";
import UserStatus from "../../components/userStatus/UserStatus";

import TickerPanel from "../../components/tickerPanel/TickerPanel";
// import { TextBox } from "../../components/textBox/TextBox";



const Trading = () => {
    /* grid setup to the dashboard page
     the dashboard is divided into 9 boxes
     in each box we render a component
    the components are imported from the components folder
    the data is imported from data.ts based on the Variable name in the brackets
    */
    return (
        <div className="trading">
  
            <div className="box box10
            "><TickerPanel /></div>

            <div className="box box11"><UserStatus/></div>

            
            <div className="box box12"><News /></div>


        </div>
    )
}

export default Trading