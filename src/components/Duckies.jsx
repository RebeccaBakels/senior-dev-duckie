import React, { useEffect, useState } from "react";

import QuackModal from './QuackModal';
import firebase from "firebase";

import MicRecorder from "mic-recorder-to-mp3";
import { firebaseConfig } from "../config";
firebase.initializeApp(firebaseConfig);

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const storageRef = firebase.storage().ref();

function Duckies() {
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [fileName, setFileName] = useState(
    Math.random().toString(36).substring(10)
  );
  const [quackBack, setQuackBack] = useState(``);
  const [modalShow, setModalShow] = useState(false);

  const start = () => {
    console.log("in start");
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
          setFileName(Math.random().toString(36).substring(10));
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    let newRecording;
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setBlobURL(blobURL);
        setIsRecording(false);
        newRecording = new File(buffer, fileName + ".mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
      })
      .then(() => {
        console.log(newRecording);
        const metadata = { contentType: "audio/mpeg" };
        const audioRecordingRef = storageRef.child("recordings/" + fileName);
        audioRecordingRef.put(newRecording, metadata).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            setQuackBack(`Quack me Back!\n${downloadURL}`);
          });
        });
      })
      .catch((e) => console.log(e));
  };

  const play = () => {
    const playback = new Audio(blobURL);
    playback.play();
  };

  
  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setIsBlocked(false);
      },
      () => {
        console.log("Permission Denied");
        setIsBlocked(true);
      }
    );
  }, []);

  return (
    <>
      <button onClick={start} disabled={isRecording}>
        <img
          className="yellow-duck"
          src={isRecording ? "assets/active.png" : "assets/duckie.png"}
          alt="yellow rubber duckie with record symbol"
        />
      </button>
      <button onClick={stop} disabled={!isRecording}>
        <img
          className="red-duck"
          src="assets\stop.png"
          alt="red rubber duckie with stop symbol"
        />
      </button>
      <button onClick={play}>
        <img
          className="green-duck"
          src="assets\play.png"
          alt="green rubber duckie with play symbol"
        />
      </button>
      <button onClick={() => setModalShow(true)}>
        <img
          className="blue-duck"
          src="assets\link.png"
          alt="blue rubber duckie with link symbol that says Quack me back"
        />
      </button>

      <QuackModal
        quackBack={quackBack}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Duckies;
