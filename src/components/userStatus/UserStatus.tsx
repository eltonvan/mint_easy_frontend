import React from 'react';
import './userStatus.scss';
import { useAuthStateContext } from '../../contexts/AuthStateContext';

type UserStatusProps = {
  name: string;
  initialSum: number;
  currentSum: number;
  availableSum: number;
  investedSum: number;
  profitLoss: number;
};

const data = {
  initialSum: 100000,
  name: 'John Doe',
  currentSum: 103640.53,
  investedSum: 64000,
};
const isProfit: boolean = data.currentSum >= 100000;

data.availableSum = data.currentSum - data.investedSum;
data.profitLoss = data.currentSum - data.initialSum;

const UserStatus = (props: UserStatusProps) => {
  const{username} = useAuthStateContext();
  const formatNumberWithSeparator = (number: number): string => {
    return number.toLocaleString();
  };

  return (
    <div className='userStatus'>
      <div className='topRow'>
        <div className='boxInfo boxName'>
          <div className='name'>
            Hello {username}
          </div>  
          Your investment value is <div className='number'>{formatNumberWithSeparator(data.currentSum)}$</div> 
        </div>
      </div>

      <div className='bottomRow'>
        <div className='boxInfo boxAvailable'>
          Your available funds
          <div className='number'>{formatNumberWithSeparator(data.availableSum)}$</div>
        </div>
        <div className='boxInfo boxInvested'>
          You invested 
          <div className='number'>{formatNumberWithSeparator(data.investedSum)}$</div>
        </div>
        <div className={`boxInfo boxProfitLoss ${isProfit ? 'green' : 'red'}`}>
    Your profit/loss
    <div className='number'>{formatNumberWithSeparator(data.profitLoss)}$</div>
  </div>
      </div>
    </div>
  );
}

export default UserStatus;
