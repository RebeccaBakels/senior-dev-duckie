import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function QuackModal(props) {
  // const getQuack = () => {
  //   var copyText = document.getElementById("quackBackText");
  //   copyText.select();
  //   copyText.setSelectionRange(0, 99999)
  //   document.execCommand("copy");
  //   alert("Copied the text: " + copyText.value);
  // }
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Quack Back
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Copy and paste to send to your real duckie</h4>
          <p id='quackBackText'>
            {props.quackBack}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} size="lg">Done</Button>
        </Modal.Footer>
      </Modal>
    )
}



export default QuackModal