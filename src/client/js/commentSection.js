import fetch from "node-fetch";

const videoContainer = document.querySelector(".videoContainer");
const form = document.querySelector("#commentForm");

const handleSubmit = (e) => {
  const textarea = form.querySelector("textarea");
  const videoId = videoContainer.dataset.id;
  const text = textarea.value;
  // e.preventDefault();

  if (text === "") {
    return;
  }

  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

  textarea.value = "";
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
