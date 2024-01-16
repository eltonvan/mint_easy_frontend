
import "./investing.scss";
import News from "../../components/news/News";
import { Portfolio } from "../../components/portfolio/Portfolio";
import { StockGenerator } from "../../components/stockGenerator/StockGenerator";// import { TextBox } from "../../components/textBox/TextBox";



const Investing = () => {

    return (
        <div className="investing">
  
            <div className="box box13
            "><StockGenerator /></div>

            <div className="box box14"><Portfolio/></div>

            
            <div className="box box12"><News interval={50000} /></div>


        </div>
    )
}

export default Investing