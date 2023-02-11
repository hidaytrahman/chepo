// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useReducer } from "react";
import "./App.css";
import JsonViewer from "./components/utils/jsonViewer/JsonViewer";
import Landing from "./components/views/landing/Landing";
import { AppContext, appReducer, initialAppState } from "./context";
import { todos, users } from "./model";
import { videoPlayer } from "./model/misc";

function App() {
  const [state, dispatch] = useReducer<any>(appReducer, initialAppState);
  return (
    <AppContext.Provider
      value={{
        isSearching: state?.isSearching,
        setSearchingState: (value: boolean) => {
          dispatch();
        },
      }}
    >
      {/* Need to configure router */}
      {/* <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<Landing />} />
        </Routes>
      </Router> */}

      <Landing />

      <div className="App">
        <JsonViewer data={todos} title="Todo" />
        <JsonViewer data={videoPlayer} title="videoPlayer" />
        <JsonViewer data={users} title="User" />
        {/* <JsonViewer data={githubUser} title="Github user" /> */}
        {/* <JsonViewer data={photosShort} title="Photos Short" /> */}
        {/* <JsonViewer data={photosFull} title="Photos Full" /> */}
      </div>
    </AppContext.Provider>
  );
}

export default App;
