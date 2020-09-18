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
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <StockProvider>
        <SubApp />
      </StockProvider>
    </div>
  );
}

export default App;

const SubApp: React.FC = ({ children }) => {
  const { updateStock, test } = useContext(StockContext);
  useEffect(() => {
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
      <DenominationCounter type="RN10" />
      <DenominationCounter type="RN20" />
      {/* {children} */}
    </>
  );
};
