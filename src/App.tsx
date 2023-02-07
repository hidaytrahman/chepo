import "./App.css";
import Header from "./components/utils/header/Header";
import JsonViewer from "./components/utils/jsonViewer/JsonViewer";
import { photosFull, githubUser, photosShort, todos, users } from "./model";
// import img from "/chepo-logo.png";
// const hamhu = new URL('./chepo-logo.png"', import.meta.url).href;
function App() {
  return (
    <>
      <Header />

      <div className="App">
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
