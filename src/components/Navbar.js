import React, { useState, useEffect, useContext } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AuthUser from "./pages/AuthUser";
import { LoginContext } from "../App";

function Navbar() {
  const { login, setLogin } = useContext(LoginContext);
  // //changes
  // const [isLoggedIn, setIsLoggedIn]=useState(localStorage.getItem('isLoggedIn'))

  // useEffect(()=>{
  //   setIsLoggedIn(localStorage.getItem('isLoggedIn'))
  // },[isLoggedIn])

  //changes

  // const [isLoggedIn,setIsLoggedIn] = useState(false);
  // useEffect(()=>{
  //   const logInfo=localStorage.getItem('isLoggedIn');
  //   setIsLoggedIn(true);
  // },[]);
  // const loginHandler=()=>{
  //   localStorage.setItem('isLoggedIn','1');
  //   setIsLoggedIn(true);
  // }

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  const getUser = () => {
    const userString = sessionStorage.getItem("user");
    const user_detail = JSON.parse(userString);
    return user_detail;
  };
  const user = getUser();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <span className="mathi">Brain Tumor Detector</span>
            <i class="fas fa-brain" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {/* Esma change garne jati */}
            {login && (
              <li className="nav-item">
                <Link
                  to="/uploadimage"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Upload Image
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link
                to="/mriinformation"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                MRI Information
              </Link>
            </li>
            <li>
              <Link
                to="/healthadvices"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Health Advices
              </Link>
            </li>

            {!login && (
              <li>
                <Link
                  to="/sign-up"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            )}

            {login && (
              <li>
                <Link
                  to="/sign-up"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                 {user}
                </Link>
              </li>
            )}
          </ul>
          {button && !login && (
            <Button buttonStyle="btn--outline">LOGIN</Button>
          )}
          {button && login && (
            <Button buttonStyle="btn--outline">
              {
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" fill="#FFFFFF"/>
                  </svg>
                  <span style={{ marginLeft: '8px' }}>{user}</span>
                </div>
              }
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
