import React from 'react';
import './userStatus.scss';


type Props = {
  name: string;
  available: number;
  invested: number;
  profitLoss: number;
}

const UserStatus = (props:Props) => {
  return (
    <div className='userStatus'>

      <div className='topRow'>
        <div className='boxInfo boxName'>user info</div>
      </div>


      <div className='bottomRow'>
        <div className='boxInfo boxAvailable'>money available</div>
        <div className='boxInfo boxInvested'>money invested</div>
        <div className='boxInfo boxProfitLoss'>profit</div>
      </div>
    </div>
  );
}

export default UserStatus;
