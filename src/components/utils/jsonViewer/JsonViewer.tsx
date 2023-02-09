import { CopyButton } from "../copy/Copy";
import "./JsonViewer.css";
type JsonViewerPropsType = {
  data: [] | {};
  title: string;
};

const JsonViewer = ({ data, title }: JsonViewerPropsType) => {
  return (
    <section className="json-view-wrapper">
      <h3 className="title">{title}</h3>

      <article className="json-view">
        <header className="json-view__header">
          <CopyButton content={data} />
        </header>
        <pre>{JSON.stringify(data, undefined, 4)}</pre>
      </article>
    </section>
  );
};

export default JsonViewer;
