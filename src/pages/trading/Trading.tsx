<<<<<<< HEAD
    
=======

>>>>>>> from_server
import "./trading.scss";

import News from "../../components/news/News";
import UserStatus from "../../components/userStatus/UserStatus";
<<<<<<< HEAD
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ChartBox from "../../components/chartBox/ChartBox";
import { chartBoxProduct, chartBoxUser,chartBoxConversion, chartBoxRevenue, barChartBoxVisit, barChartBoxRevenue, userStockData } from "../../data";
import TickerPanel from "../../components/tickerPanel/TickerPanel";

=======

import TickerPanel from "../../components/tickerPanel/TickerPanel";
// import { TextBox } from "../../components/textBox/TextBox";
>>>>>>> from_server



const Trading = () => {
<<<<<<< HEAD
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     slidesToShow: 4,
    //     arrows: false,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 0,
    //     speed:10000,
    //     cssEase: 'linear',
    //     pauseOnHover: true,
    //     adaptiveHeight: true,
    //     centerMode: true,
    //     centerPadding: "40px",
    //     className: "slides",
    //   };

    return (
        <div className="trading">

         <div className="box box10">
         {/* <Slider {...settings}>
            
            
                {userStockData.map(({id, ...otherProps}) => (
                    
                    <div key={id} className="chartBoxContainer"><ChartBox {...otherProps} /></div>
                ))}
           
    
        
           </Slider> */}
              <TickerPanel/>
        
            
            
            </div>
            
=======
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
>>>>>>> from_server

            <div className="box box11"><UserStatus/></div>

            
            <div className="box box12"><News interval={50000}/></div>


        </div>
    )
}

export default Trading