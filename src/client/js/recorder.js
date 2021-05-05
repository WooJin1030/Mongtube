import regeneratorRuntime from "regenerator-runtime";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.querySelector("#startBtn");
const video = document.querySelector("#preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  // console.log(mp4File.buffer);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const mp4Url = URL.createObjectURL(mp4Blob);

  const a = document.createElement("a");
  // a.href = videoFile;
  // a.download = "MyRecording.webm";
  a.href = mp4Url;
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
