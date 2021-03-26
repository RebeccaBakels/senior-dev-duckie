import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { Container } from "react-bootstrap";
import { Button, Spinner } from "react-bootstrap";

function Quacks() {
  const { user } = useContext(UserContext);
  const [quacks, setQuacks] = useState([]);
  const [loading, setLoading] = useState(true);

  function getQuacks() {
    if (user) {
      setLoading(true);
      fetch(`https://api-senior-dev-duckie.web.app/quacks/${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          setQuacks(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("error:", err);
          setLoading(false);
        });
    } else {
      setQuacks([]);
      setLoading(false);
    }
  }
  useEffect(() => {
    getQuacks();
  }, [user]);

  function deleteQuack(quackId) {
    setLoading(true);
    fetch(`https://api-senior-dev-duckie.web.app/quacks/${quackId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        getQuacks();
        setLoading(false);
      })
      .catch((err) => {
        console.log("error deleting quack:", err);
        setLoading(false);
      });
  }

  const greeting = !user ? "Guest" : user.displayName || "User!";

  return (
    <>
      <Container className="login-container">
        <img
          className="banner"
          src="assets\QuackBanner.png"
          alt="white banner that says Your Quack Backs"
        ></img>
        <h1 className="greeting">Hello, {greeting} </h1>
       {loading && <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}
        <br/>
        {quacks.map((quack) => (
          <div className="quack-back-recordings" key={quack.id}>
            <a href={quack.URL} target="_blank" rel="noreferrer">
              <img
                className="green-duck"
                src="assets\play.png"
                alt="green rubber duckie with play symbol"
                href={quack.URL}
              />
            </a>
            <br />
            <h4>
              Created:{" "}
              {new Date(quack.created._seconds * 1000).toLocaleDateString(
                "en-US"
              )}
            </h4>
            <Button
              onClick={() => deleteQuack(quack.id)}
              size="lg"
              variant="danger"
            >
              Delete
            </Button>
          </div>
        ))}
      </Container>
    </>
  );
}

export default Quacks;
