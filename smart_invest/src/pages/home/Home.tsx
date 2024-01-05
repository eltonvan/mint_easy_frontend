// import React from "react";
// import TopBox from "../../components/TopBox/TopBox";
import "./home.scss";
// import ChartBox from "../../components/chartBox/ChartBox";
// import { chartBoxProduct, chartBoxUser,chartBoxConversion, chartBoxRevenue, barChartBoxVisit, barChartBoxRevenue } from "../../data";
// import BarChartBox from "../../components/barChartBox/BarChartBox";
// import PieChartBox from "../../components/pieChartBox/PieChartBox";
// import BigChartBox from "../../components/bigChartBox/BigChartBox";
import TextBox from "../../components/textBox/TextBox";

/*
homepage of the application
only the text box is rendered
menu is not visible for the homepage, it is only visible for pages with logged in users
static text is rendered in the text box (TODO: move it to data.ts)
*/

const Home = () => {
    
    return (
        <div className="home">

            <div className="box box2"><TextBox title = " Smart Invest" text =  "Invest today and regret it tomorrow"/> </div>

        </div>
    )
}

export default Home