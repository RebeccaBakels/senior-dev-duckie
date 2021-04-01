import React, { useContext, useEffect, useState } from "react";
import QuackModal from "./QuackModal";
import MicRecorder from "mic-recorder-to-mp3";
import { UserContext } from "../App";
import 'firebase/storage'

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function Duckies() {
  const { user, firebase } = useContext(UserContext);
  const storageRef = firebase.storage().ref();
  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [fileName, setFileName] = useState(
    Math.random().toString(36).substring(10)
  );
  const [quackBack, setQuackBack] = useState(``);
  const [modalShow, setModalShow] = useState(false);

  const start = () => {
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
        const metadata = { contentType: "audio/mpeg" };
        const audioRecordingRef = storageRef.child("recordings/" + fileName);
        audioRecordingRef.put(newRecording, metadata).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            setQuackBack(`Quack me Back!\n${downloadURL}`);
            if (user) {
              fetch(
                `https://api-senior-dev-duckie.web.app/quacks/${user.uid}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ downloadURL }),
                }
              )
                .then((res) => res.json())
                // .then((data) => console.log(data))
                .catch((err) => console.log("error:", err));
            }
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
    
    navigator.mediaDevices.getUserMedia(
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
