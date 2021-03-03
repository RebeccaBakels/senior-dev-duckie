import React, {useEffect, useState} from 'react'
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

function Duckies() {
    const [isRecording, setIsRecording ] = useState(false)
    const [isBlocked, setIsBlocked] = useState(false)
    const [blobURL, setBlobURL] = useState('')

    const start = () => {
        console.log('in start')
        if (isBlocked) {
          console.log('Permission Denied');
        } else {
          Mp3Recorder
            .start()
            .then(() => {
                setIsRecording(true)
            }).catch((e) => console.error(e));
        }
      };
      const stop = () => {
        Mp3Recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            const blobURL = URL.createObjectURL(blob)
            setBlobURL(blobURL)
            setIsRecording(false)
          }).catch((e) => console.log(e));
      };

      const play = () => {
          const playback = new Audio(blobURL)
          playback.play()
      }

      useEffect(() => {
        navigator.getUserMedia({ audio: true },
            () => {
              console.log('Permission Granted');
              setIsBlocked(false)
            },
            () => {
              console.log('Permission Denied');
              setIsBlocked(true)
            },
          );

      }, [])

    return(
        <>
       <button onClick={start} disabled={isRecording} ><img className='yellow-duck' src="assets\duckie.png" alt="yellow rubber duckie with record symbol" /></button> 
       <button onClick={stop} disabled={!isRecording}><img className='red-duck' src="assets\stop.png" alt="red rubber duckie with stop symbol" /></button>
       <button onClick={play}><img className='green-duck' src="assets\play.png" alt="green rubber duckie with play symbol"  /></button> 
      
        </>
    )
}

export default Duckies