import regeneratorRuntime from "regenerator-runtime";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.querySelector("#startBtn");
const video = document.querySelector("#preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  startBtn.removeEventListener("click", handleDownload);
  startBtn.style.backgroundColor = "grey";
  startBtn.innerText = "Transcoding...";
  startBtn.disabled = true;

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
  // transcoding (webm -> mp4)
  await ffmpeg.run("-i", files.input, "-r", "60", files.output);
  // 동영상의 1초부분에서 이미지 캡쳐 (webm -> jpg)
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );

  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumbFile = ffmpeg.FS("readFile", files.thumb);

  // console.log(mp4File.buffer);
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "MyRecording.mp4");
  downloadFile(thumbUrl, "MyThumbnail.jpg");

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumb);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  startBtn.innerText = "RecordAgain";
  startBtn.style.backgroundColor = "black";
  startBtn.disabled = false;
  video.src = null;
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
