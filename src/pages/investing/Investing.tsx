
import "./investing.scss";
import News from "../../components/news/News";
import { Portfolio } from "../../components/portfolio/Portfolio";
import { StockGenerator } from "../../components/stockGenerator/StockGenerator";// import { TextBox } from "../../components/textBox/TextBox";
import { StockPortfolio } from "../../components/stockPortfolio/StockPortfolio";
import StockOrder from "../../components/stockOrder/StockOrder";
import { useState } from "react";



const Investing = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <div className="investing">
  
            <div className="box box13
            "><StockGenerator /></div>

            <div className="box box14"><StockPortfolio/></div>

            <div className="box box11">
             <button onClick={() => setIsModalOpen(true)}>order</button>
             <StockOrder slug="order" isOpen={isModalOpen} setOpen={setIsModalOpen} initialData={{ /* Your initial data here */ }} />
            </div>
            
            <div className="box box12"><News interval={50000} /></div>


        </div>
    )
}

export default Investing