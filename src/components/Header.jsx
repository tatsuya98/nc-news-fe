import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header>
        <Link className="home" to="/">
          <h1>nc news</h1>
        </Link>
      </header>
    </>
  );
};

export default Header;
