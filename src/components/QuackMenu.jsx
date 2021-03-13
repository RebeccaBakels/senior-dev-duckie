import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { UserContext } from "../App";

function QuackMenu() {
  const { user, setUser, firebase } = useContext(UserContext);
  function SignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        localStorage.setItem("user", null);
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Dropdown style={{ width: "10vh", height: "10vh" }}>
            <Dropdown.Toggle>
              <img
                className="menu-duck"
                src="assets\menu.png"
                alt="yellow rubber duckie that triggers the menu"
              ></img>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/">Home</Link>
              </Dropdown.Item>
              {!user ? (
                <>
                  <Dropdown.Item>
                    <Link to="/Login">Login</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/Signup">Sign Up</Link>
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item onClick={() => SignOut()}>
                    <Link to="/Logout">Logout</Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/Quacks">My Quacks</Link>
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <img
            style={{ borderRadius: "50%", background: "transparent" }}
            className="user-duck"
            src={!user ? "assets/guest.png " : user.photoURL}
            alt="blue rubber duckie that represents the user"
          ></img>
        </div>
      </div>
    </>
  );
}

export default QuackMenu;
