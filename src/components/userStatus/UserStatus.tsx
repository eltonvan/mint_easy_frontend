import React, { useEffect, useState } from 'react';
import './userStatus.scss';
import { useAuthStateContext } from '../../contexts/AuthStateContext';
import { instance, updateCSRFToken } from '../../axiosInstance';
import { useMutation } from '@tanstack/react-query';



type UserStatusProps = {
  name?: string;
  user_id?: number;
  initialSum?: number;
  profit_loss?: number;
};

const UserStatus: React.FC<UserStatusProps> = (props) => {
  const {  initialSum, profit_loss } = props;
  const { userId} = useAuthStateContext();
  const [data, setData] = useState({
    initialSum,
    currentSum: initialSum !== undefined && profit_loss !== undefined ? initialSum - profit_loss : 0,
    balance: 0,
    stock_amount: 0,
    profit_loss: 0,
  });
  const { username } = useAuthStateContext();

  const mutation = useMutation({
    mutationFn: async () => {
      updateCSRFToken();
      const response = await instance.get(`/data/account-balances/${userId}/`);
  
      setData((prevData) => ({
        ...prevData,
        initialSum: 100000,
        currentSum: prevData.initialSum + response.data.profit_loss,
        balance: response.data.balance,
        stock_amount: response.data.stock_amount,
        profit_loss: response.data.profit_loss,
      }));
    },
  });

  useEffect(() => {
    console.log('use effect running');
    mutation.mutate(); // Use mutate method to trigger the mutation
  }, []);


  const formatNumberWithSeparator = (number: number | undefined): string => {
    if (number !== undefined) {
      return number.toLocaleString();
    }
    return "";
  };

      const isProfit: boolean = data.profit_loss > 0;

  return (
    <div className='userStatus'>
      <div className='topRow'>
        <div className='boxInfo boxName'>
          <div className='name'>Hello {username}</div>
          Your investment value is{' '}
          <div className='number'>{formatNumberWithSeparator(data.currentSum)}$</div>

        </div>
      </div>

      <div className='bottomRow'>
        <div className='boxInfo boxAvailable'>
          Your available funds
          <div className='number'>{formatNumberWithSeparator(data.balance)}$</div>

        </div>
        <div className='boxInfo boxInvested'>
          You invested
          <div className='number'>{formatNumberWithSeparator(data.stock_amount)}$</div>

        </div>
        <div className={`boxInfo boxProfitLoss ${isProfit ? 'green' : 'red'}`}>
          Your profit/loss
          <div className='number'>{formatNumberWithSeparator(data.profit_loss)}$</div>
        </div>
      </div>
    </div>
  );
};

export default UserStatus;

