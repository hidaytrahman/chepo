import "./App.css";
import Header from "./components/utils/header/Header";
import JsonViewer from "./components/utils/jsonViewer/JsonViewer";
import { photosFull, githubUser, photosShort, todos, users } from "./model";
import { videoPlayer } from "./model/misc";
function App() {
  return (
    <>
      <Header />

      <div className="App">
        <JsonViewer data={videoPlayer} title="videoPlayer" />
        <JsonViewer data={users} title="User" />
        <JsonViewer data={githubUser} title="Github user" />
        <JsonViewer data={photosShort} title="Photos Short" />
        <JsonViewer data={photosFull} title="Photos Full" />
        <JsonViewer data={todos} title="Todo" />
      </div>
    </>
  );
}

export default App;
