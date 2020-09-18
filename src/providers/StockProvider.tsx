
import React, { useState, createContext, useReducer, Dispatch } from 'react';
import { ReducerActionMap } from '../Helper';
import { DenominationStockType, DenominationTypes } from '../types/denominations';

// export const DenominationStock: DenominationStockType = {};
type StockContextProps = {
    stock: DenominationStockType;
    updateStock: Dispatch<DenominationStockUpdateAction>;
    stockIsDeductable: (ty: DenominationTypes, chBy: number) => boolean;
    test: boolean;
};
const initalState: StockContextProps = {
    stock: {},
    stockIsDeductable: () => false,
    updateStock: () => null,
    test: true,
};

const StockContext = createContext<StockContextProps>(initalState);


export enum StockUpdateActionTypes {
    init,
    addOne,
    deductOne,
    addByCount,
    deductByCount,
    // isAddableByOne,
    // isDeductableByOne,
    // isAddableByCount,
    // isDeductableByCount,
};

type DenominationStockUpdatePayload = {
    [StockUpdateActionTypes.init]: DenominationStockType;
    [StockUpdateActionTypes.addOne]: DenominationTypes;
    [StockUpdateActionTypes.addByCount]: { type: DenominationTypes, count: number };
    [StockUpdateActionTypes.deductOne]: DenominationTypes;
    [StockUpdateActionTypes.deductByCount]: { type: DenominationTypes, count: number };
    // [StockUpdateActionTypes.isAddableByOne]: DenominationTypes;
    // [StockUpdateActionTypes.isDeductableByCount]: { type: DenominationTypes, count: number };
    // [StockUpdateActionTypes.isDeductableByOne]: DenominationTypes;
    // [StockUpdateActionTypes.isDeductableByCount]: { type: DenominationTypes, count: number };
}

export type DenominationStockUpdateAction = ReducerActionMap<DenominationStockUpdatePayload>[keyof ReducerActionMap<DenominationStockUpdatePayload>];

function stockIsUpdatable(state: StockContextProps, type: DenominationTypes, changeBy: number = 1, action: "add" | "remove" = "add"): boolean {

    var newCount = updatedCount(state, type, changeBy, action);
    return newCount >= 0;
}

function updatedCount(state: StockContextProps, type: DenominationTypes, changeBy: number = 1, action: "add" | "remove" = "add"): number {

    var oldCount = state.stock[type] || 0;
    var cBy = Math.abs(changeBy) * (action == "add" ? 1 : -1);
    var newCount = oldCount + cBy;
    return newCount;

}

function updatedStockState(state: StockContextProps, type: DenominationTypes, changeBy: number = 1, action: "add" | "remove" = "add"): StockContextProps {

    var isUpdatable = stockIsUpdatable(state, type, changeBy, action);
    var newCount = updatedCount(state, type, changeBy, action);
    if (isUpdatable) {

        return {
            ...state,
            stock: {
                ...state.stock,
                [type]: updatedCount(state, type, 1, "add"),
            }
        };
    }
    else return state;
}
const updateStockReducer = (state: StockContextProps, action: DenominationStockUpdateAction): StockContextProps => {
    // const { payload } = action;
    // alert('workin')
    switch (action.type) {
        case StockUpdateActionTypes.init:
            return {
                ...state,
                stock: action.payload,
            };
        case StockUpdateActionTypes.addOne:
            return updatedStockState(state, action.payload, 1, "add")
        case StockUpdateActionTypes.addByCount:
            return updatedStockState(state, action.payload.type, action.payload.count, "add")
        case StockUpdateActionTypes.deductOne:
            return updatedStockState(state, action.payload, 1, "remove")
        case StockUpdateActionTypes.deductByCount:
            return updatedStockState(state, action.payload.type, action.payload.count, "remove")
        default:
            return state;
        // break;
    }
    return state;
};




const { Provider } = StockContext;

const StockProvider: React.FC = ({ children }) => {
    const [state, updatedStockState] = useReducer(updateStockReducer, initalState);
    const stockIsDeductable = (ty: DenominationTypes, chBy: number = 1): boolean => {
        return stockIsUpdatable(state, ty, chBy, "remove");
    }
    var newState = {
        ...state,
        updatedStockState,
        stockIsDeductable,
    };

    return (
        <Provider value={newState} >
            {children}
        </Provider>
    );
}

export {
    StockProvider,
    StockContext
};