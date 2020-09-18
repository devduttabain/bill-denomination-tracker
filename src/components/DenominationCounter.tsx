import React, { useContext, useEffect, useState } from 'react';
import { StockContext, StockUpdateActionTypes } from '../providers/StockProvider';
import { DenominationTypes } from '../types/denominations';

// import logo from './logo.svg';
// import './nap.css';
interface DenominationCounterProps {
    type: DenominationTypes;
}
function DenominationCounter({ type }: DenominationCounterProps) {
    const {
        stock,
        updateStock
    } = useContext(StockContext);
    const [denominationCount, setDenominationCount] = useState(0);
    const handleOnIncreaseClick = () => {
        updateStock({
            type: StockUpdateActionTypes.addOne,
            payload: type
        });
    };
    const handleOnDecreaseClick = () => {
        updateStock({
            type: StockUpdateActionTypes.deductOne,
            payload: type
        });
    };
    
    useEffect(() => {
        setDenominationCount(stock[type] || 0);
    }, [stock]);

    return (
        <div className="eachDenominations">
            <div className="increaseCountWrapper"><button className="increaseCountBtn" onClick={handleOnIncreaseClick}>+</button></div>
            <div className="increaseCountWrapper">
                {denominationCount}
            </div>
            <div className="decreaseCountWrapper">
                <button className="decreaseCountBtn" onClick={handleOnDecreaseClick} disabled={denominationCount === 0}>-</button>
            </div>
        </div>
    );
}

export default DenominationCounter;
