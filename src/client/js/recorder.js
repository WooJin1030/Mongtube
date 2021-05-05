import regeneratorRuntime from "regenerator-runtime";
const startBtn = document.querySelector("#startBtn");
const video = document.querySelector("#preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.mp4";
  document.body.appendChild(a);
  a.click();

  startBtn.innerText = "Show Record Screen";
  startBtn.style.backgroundColor = "black";
  video.src = null;

  startBtn.removeEventListener("click", handleDownload);
  startBtn.addEventListener("click", handleCamera);
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.style.backgroundColor = "blue";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);

  recorder.stop();
};

const handleStart = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.style.backgroundColor = "red";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => {
    // console.log(e.data);
    videoFile = URL.createObjectURL(e.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };

  recorder.start();
};

// npm i regenerator-runtime

const handleCamera = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  video.srcObject = stream;
  video.play();

  startBtn.innerText = "Start Recording";
  startBtn.style.backgroundColor = "green";
  startBtn.removeEventListener("click", handleCamera);
  startBtn.addEventListener("click", handleStart);
};

startBtn.addEventListener("click", handleCamera);
