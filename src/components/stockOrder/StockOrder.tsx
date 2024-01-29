import React from 'react'
import "./stockOrder.scss"
import { instance } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAuthStateContext } from "../../contexts/AuthStateContext";
import  { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateCSRFToken } from '../../axiosInstance';



type StockOrderData = {

    day_trading: boolean;
    long_term_invest : boolean;
    symbol : string;
    buy : boolean;
    open_price : number;
    close_price : number;
    quantity : number;
    amount : number;
    stop_loss : number;
    take_profit : number;
    user_id : number;
 };

 type StockOrderProps = {
    slug: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    initialData?: StockOrderData;
 };


export const StockOrder: React.FC<StockOrderProps> = (props) => {
    const {userId, setUserId, msg, setMsg } = useAuthStateContext();

    const navigate = useNavigate(); // Declare navigate function from react-router-dom
    const [formData, setFormData] = useState<StockOrderData>({
        day_trading: false,
        long_term_invest : false,
        symbol : '',
        buy : true,
        open_price : 0,
        close_price : 0,
        quantity : 0,
        amount : 0,
        stop_loss : 0,
        take_profit : 0,
        user_id : 32,
        ...props.initialData, // Merge with initialData from props

    });

    // set the initial state of the errors
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({
        day_trading: null,
        long_term_invest : null,
        symbol : null,
        buy : null,
        open_price : null,
        close_price : null,
        quantity : null,
        amount : null,
        stop_loss : null,
        take_profit : null,
        user_id : null,
    });

    const mutation = useMutation({
        mutationFn: async () => {
        updateCSRFToken();
        console.log(formData);
        console.log(userId);
        instance.post(`/data/stock-orders/32/`, formData) // send the data to the backend
        


        .then((response) => {
            console.log(formData);
            console.log(userId);
            console.log(response);
            if (response.data && response.data.message) {
        
            setMsg(response.data.message); // set the message
            console.log(msg);
            }
        },)
        .catch((error) => { // catch any errors
            // console.log(error);
            setErrors(error.response.data); // set the errors
        });
        },

        onSuccess: () => {
        // queryClient.invalidateQueries([`all${props.slug}s`]); // invalidate the query preparing it for a refetch
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData({ ...formData, [field]: e.target.value });
    
        setErrors({ ...errors, [field]: null });
      };
    
      const handleCloseModal = () => {
        props.setOpen(false);
        

        };
    
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        setMsg(''); // Reset msg

        try {
            await mutation.mutateAsync(); // Execute the mutation and wait for it to finish
      
          } catch (error) {
            if (error instanceof Error) {
              setErrors(error.message); // Set error message
            }
          }

      };
    
    
  return (


    <div className={`stockOrder ${props.isOpen ? 'open' : ''}`}>
        <div className="modal">

            <h1>ORDER</h1>
        <span className="close" onClick={handleCloseModal}>
          x
        </span>

        
        <form onSubmit={handleSubmit}>



            <div className="item">
                <label htmlFor="symbol">Symbol</label>
                <input
                    type="text"
                    name="symbol"
                    id="symbol"
                    value={formData.symbol}
                    onChange={(e) => handleInputChange(e, 'symbol')}
                />
                {errors.symbol && <div className="error">{errors.symbol}</div>}
            </div>

            <div className="item">
                <label htmlFor="buy">Buy</label>
                <input
                    type="checkbox"
                    name="buy"
                    id="buy"
                    defaultChecked={formData.buy}
                    value={formData.buy.toString()}
                    onChange={(e) => handleInputChange(e, 'buy')}
                />
                {errors.buy && <div className="error">{errors.buy}</div>}
            </div>

            <div className="item">
                <label htmlFor="open_price">Open Price</label>
                <input
                    type="number"
                    name="open_price"
                    id="open_price"
                    value={formData.open_price}
                    onChange={(e) => handleInputChange(e, 'open_price')}
                />
                {errors.open_price && <div className="error">{errors.open_price}</div>}
            </div>

            <div className="item">
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange(e, 'quantity')}
                />
                {errors.quantity && <div className="error">{errors.quantity}</div>}
            </div>

            <div className="item">
                <label htmlFor="amount">total price</label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={formData.amount}
                    onChange={(e) => handleInputChange(e, 'amount')}
                />
                {errors.amount && <div className="error">{errors.amount}</div>}
            </div>

            <div className="item">
                <label htmlFor="stop_loss">Stop Loss</label>
                <input
                    type="number"
                    name="stop_loss"
                    id="stop_loss"
                    value={formData.stop_loss}
                    onChange={(e) => handleInputChange(e, 'stop_loss')}
                />
                {errors.stop_loss && <div className="error">{errors.stop_loss}</div>}
            </div>

            <div className="item">
                <label htmlFor="take_profit">Take Profit</label>
                <input
                    type="number"
                    name="take_profit"
                    id="take_profit"
                    value={formData.take_profit}
                    onChange={(e) => handleInputChange(e, 'take_profit')}
                />
                {errors.take_profit && <div className="error">{errors.take_profit}</div>}

            </div>  

            <div className="item">
    <label htmlFor="trading_type">Trading Type</label>
    <select
        id="trading_type"
        name="trading_type"
        value={formData.long_term_invest ? "long_term_invest" : "day_trading"}
        onChange={(e) => handleInputChange(e, 'long_term_invest')}
    >
        <option value="day_trading">Day Trading</option>
        <option value="long_term_invest">Long Term Invest</option>
    </select>
    {errors.long_term_invest && <div className="error">{errors.long_term_invest}</div>}
</div>


            <div className="item">
                <label htmlFor="user_id"></label>
                <input
                    type="hidden"
                    name="user_id"
                    id="user_id"
                    value={formData.user_id}
                    onChange={(e) => handleInputChange(e, 'user_id')}
                />
                {errors.user_id && <div className="error">{errors.user_id}</div>}   

            </div>


            <button type="submit">Order</button>
        </form>

        </div>
        </div>
    
  )
};

export default StockOrder

