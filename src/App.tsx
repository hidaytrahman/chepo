import "./App.css";
import JsonViewer from "./components/utils/jsonViewer/JsonViewer";

import { photosFull, githubUser, photosShort, todos, users } from "./model";

function App() {
  return (
    <div className="App">
      <h1>Chepo</h1>

      <JsonViewer data={users} title="User" />
      <JsonViewer data={githubUser} title="Github user" />
      <JsonViewer data={photosShort} title="Photos Short" />
      <JsonViewer data={photosFull} title="Photos Full" />
      <JsonViewer data={todos} title="Todo" />
    </div>
  );
}

export default App;
