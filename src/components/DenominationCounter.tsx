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
        // stockIsDeductable,
        updateStock
    } = useContext(StockContext);
    const [denominationCount, setDenominationCount] = useState(0);
    const handleOnIncreaseClick = () => {
        // setDenominationCount(denominationCount + 1);
        // alert('should work');
        updateStock({
            type: StockUpdateActionTypes.addOne,
            payload: type
        });
    };
    const handleOnDecreaseClick = () => {
        // setDenominationCount(denominationCount - 1);
        updateStock({
            type: StockUpdateActionTypes.deductOne,
            payload: type
        });
    };
    // var denominationCount = 0;
    useEffect(() => {
        // denominationCount = stock[type] || 0;
        setDenominationCount(stock[type] || 0);
    }, [stock, type])
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
