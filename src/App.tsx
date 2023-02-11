// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useReducer } from "react";
import "./App.css";
import JsonViewer from "./components/utils/jsonViewer/JsonViewer";
import Landing from "./components/views/landing/Landing";
import { AppContext, appReducer, initialAppState } from "./context";
// import { todos, users } from "./model";
import { videoPlayer } from "./model/misc";

function App() {
  const [state, dispatch] = useReducer<any>(appReducer, initialAppState);
  return (
    <>
      {/* Need to configure router */}
      {/* <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<Landing />} />
        </Routes>
      </Router> */}

      <div className="App">
        <Landing />
      </div>
    </>
  );
}

export default App;
