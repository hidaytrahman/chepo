// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import JsonViewer from "./components/utils/jsonViewer/JsonViewer";
import Landing from "./components/views/landing/Landing";
import { photosFull, githubUser, photosShort, todos, users } from "./model";
import { videoPlayer } from "./model/misc";
function App() {
  return (
    <>
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
    </>
  );
}

export default App;
