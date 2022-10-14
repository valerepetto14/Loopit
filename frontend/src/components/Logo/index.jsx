import Image from "../../assets/logo2.png";
import "./Logo.css";

import { Link } from "react-router-dom";

const Logo = ({ width, link }) => {
  return (
    <div className="logo">
      <Link to={`${link}`}>
        <img
          className="logo-img"
          src={Image}
          alt="Loopit logo"
          style={{ width: `${width}%` }}
        />
      </Link>
    </div>
  );
};

export default Logo;
