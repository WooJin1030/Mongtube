const video = document.querySelector("video");
const playBtn = document.querySelector("#play");
const muteBtn = document.querySelector("#mute");
const volumeRange = document.querySelector("#volume");
const currentTime = document.querySelector("#currentTime");
const totalTime = document.querySelector("#totalTime");
const timeLine = document.querySelector("#timeLine");
const fullScreenBtn = document.querySelector("#fullScreen");
const videoContainer = document.querySelector(".videoContainer");
const videoControls = document.querySelector(".videoControls");

let volumeValue = 0.5;
video.volume = volumeValue;

let controlsTimeout = null;
let controlsMovementTimeout = null;

const handlePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerHTML = video.paused
    ? "<i class='fas fa-play'></i>"
    : "<i class='fas fa-stop'></i>";
};

const handlePlayClick = () => {
  handlePlay();
};

const handlePlayClickVideo = () => {
  handlePlay();
};

const handleSpaceBar = (e) => {
  if (e.isComposing || e.keyCode === 32) {
    handlePlay();
  }
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerHTML = video.muted
    ? "<i class='fas fa-volume-mute'></i>"
    : "<i class='fas fa-volume-up'></i>";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerHTML = "<i class='fas fa-volume-up'></i>";
  }
  volumeValue = value;
  video.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeLine.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeLine.value = Math.floor(video.currentTime);
};

const handleTimeLineChange = (e) => {
  const {
    target: { value },
  } = e;

  video.currentTime = value;
};

const handleEndVideo = () => {
  playBtn.innerHTML = "<i class='fas fa-play'></i>";
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.innerHTML = "<i class='fas fa-expand-alt'></i>";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerHTML = "<i class='fas fa-compress-alt'></i>";
  }
};

const hideControls = () => {
  videoControls.classList.add("hidden");
};

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }

  videoControls.classList.remove("hidden");
  controlsMovementTimeout = setTimeout(hideControls, 5000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

playBtn.addEventListener("click", handlePlayClick);
window.addEventListener("keydown", handleSpaceBar);
video.addEventListener("click", handlePlayClickVideo);

muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange); // change
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
timeLine.addEventListener("input", handleTimeLineChange);
video.addEventListener("ended", handleEndVideo);
fullScreenBtn.addEventListener("click", handleFullScreen);

videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
