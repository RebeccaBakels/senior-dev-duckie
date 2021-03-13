import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function QuackModal(props) {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess(console.log("copied"));
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Quack Back</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Copy and paste to send to your real duckie</h4>
        <p id="quackBackText">{props.quackBack}</p>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button onClick={() => copyToClipBoard(props.quackBack)} size="lg">
            Click here to copy
          </Button>
          {/* after copying see the message here */}
          {copySuccess}
        </div>
        <Button onClick={props.onHide} size="lg">
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default QuackModal;
