// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useReducer } from "react";
import "./App.css";
import JsonViewer from "./components/utils/jsonViewer/JsonViewer";
import Landing from "./components/views/landing/Landing";
import { AppContext, appReducer, initialAppState } from "./context";
// import { todos, users } from "./model";
import { videoPlayer } from "./model/misc";

function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  return (
    <AppContext.Provider
      value={{
        ...state,
        setSearchingState: (value: boolean) =>
          dispatch({ type: "SEARCHING", payload: value }),
      }}
    >
      <div className="App">
        <Landing />
      </div>
    </AppContext.Provider>
  );
}

export default App;
