type JsonViewerPropsType = {
  data: [] | {};
  title: string;
};

const JsonViewer = ({ data, title }: JsonViewerPropsType) => {
  return (
    <div className="json-view-wrapper">
      <h3 className="title">{title}</h3>

      <div className="json-view">
        <pre>{JSON.stringify(data, undefined, 4)}</pre>
      </div>

      <footer></footer>
    </div>
  );
};

export default JsonViewer;
