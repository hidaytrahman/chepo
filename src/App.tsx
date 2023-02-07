import "./App.css";
import JsonViewer from "./components/utils/jsonViewer/JsonViewer";
import { githubUser, todos, users } from "./model/user/users";

function App() {
  return (
    <div className="App">
      <h1>Chepo</h1>

      <JsonViewer data={users} title="User" />
      <JsonViewer data={githubUser} title="Github user" />
      <JsonViewer data={todos} title="Todo" />
    </div>
  );
}

export default App;
