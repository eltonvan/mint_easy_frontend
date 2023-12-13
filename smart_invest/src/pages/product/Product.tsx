import "./product.scss";
import Single from "../../components/single/Single";
import { singleProduct } from "../../data";

export const product = () => {
  // fetch data and send to single component
  return (
    <div className="product">
      <Single {...singleProduct}/>
    </div>
  )
}

export default product
