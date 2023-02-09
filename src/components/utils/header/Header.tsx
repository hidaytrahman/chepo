import "./header.css";
const Header = () => {
  return (
    <header className="header">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <img
        loading="lazy"
        src={`/assets/logo.png`}
        alt="chepo logo"
        className="responsive"
      />
      <p>
        Chepo is the easiest way to provide mock data and modal for your
        project,
        <br />
        <div className="highlight-para">
          Just copy and paste it into your project. You can use the generated
          data without any additional effort.
        </div>
      </p>
    </header>
  );
};

export default Header;
