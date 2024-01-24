import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ChartBox from "../../components/chartBox/ChartBox";
import { chartBoxProduct, chartBoxUser,chartBoxConversion, chartBoxRevenue, barChartBoxVisit, barChartBoxRevenue, userStockData } from "../../data";
import "./tickerPanel.scss";



const TickerPanel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed:10000,
    cssEase: 'linear',
    pauseOnHover: true,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: "40px",
    className: "slides",
  };


  return (
    <Slider {...settings}>
            
            
    {userStockData.map(({id, ...otherProps}) => (

        
        <div key={id} className="chartBoxContainer"><ChartBox {...otherProps} /></div>
    ))}



</Slider>
  
  );
}


export default TickerPanel;

