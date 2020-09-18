import React, { useContext, useEffect } from "react";
import DenominationCounter from "./components/DenominationCounter";
// import logo from './logo.svg';
import "./nap.css";
import {
  StockContext,
  StockProvider,
  StockUpdateActionTypes
} from "./providers/StockProvider";

function App() {
  return (
    <div className="App">
      <Providers>
        <SubApp />
      </Providers>
    </div>
  );
}

export default App;
const Providers: React.FC = ({ children }) => {
  return (
    <StockProvider>
      {children}
    </StockProvider>
  );
}
const SubApp: React.FC = ({ children }) => {
  const { updateStock, test } = useContext(StockContext);
  useEffect(() => {
    console.log('loading');
    updateStock({
      type: StockUpdateActionTypes.init,
      payload: {
        RN10: 0,
        RN20: 0
      }
    });
  }, []);

  return (
    <>
      {test ? <p>Test</p> : <></>}
      <DenominationCounter type="RN10" label="₹10" />
      <DenominationCounter type="RN20" label="₹20" />
      {/* {children} */}
    </>
  );
};
