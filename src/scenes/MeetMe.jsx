import React from "react";
import {useState} from "react";
import { Button, Container, Form } from "react-bootstrap";
import { slack } from "../slack";

function MeetMe() {
const [value, setValue] = useState('');

  function submitForm(event) {
    event.preventDefault();
    fetch(slack, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ text: value }),
    })
    .then(() => {
      alert("Thanks for your Feedback!");
    })
    .then(() => setValue(''))
    .catch((err) => console.log('err', err))
  }
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Container className="login-container">
        <img
          className="banner"
          src="assets\feedback_banner.png"
          alt="Banner with the word Feedback. Underneath it says: Or tell me about a block the app helped you with!"
        />
        <Form className="submit-form">
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label></Form.Label>
            <Form.Control as="textarea" rows={5} className="form-area"
            value={value}
            onChange={onChange}
            />
          </Form.Group>
          <button onClick={submitForm}>
            <img
              className="submit-duck"
              src="assets\submit.png"
              alt="yellow duckie button with the word Submit on it"
            />
          </button>
        </Form>
        <img
          className="meet-me-bio"
          src="assets\meetme.png"
          alt="Hello, I'm Rebecca Bakels, a software engineer who has a passion for designing beautiful, simple, easy-to-use applications. Thank you for using 
          Senior Dev Duckie!"
        />
        <br />
        <br />
        <div className="meet-buttons">
          <Button
            style={{ marginTop: "2vh" }}
            href="https://github.com/RebeccaBakels/senior-dev-duckie"
            target="_blank"
          >
            View the Code
          </Button>
          <Button
            style={{ marginTop: "2vh" }}
            href="https://bakels-portfolio.web.app/"
            target="_blank"
          >
            View my Portfolio
          </Button>
        </div>
        <br />
      </Container>
    </>
  );
}

export default MeetMe;
