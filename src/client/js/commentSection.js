import regeneratorRuntime from "regenerator-runtime";
import fetch from "node-fetch";

const videoContainer = document.querySelector(".videoContainer");
const form = document.querySelector("#commentForm");

const deleteComment = (videoComment) => {
  videoComment.remove();
};

const handleDelete = async (e) => {
  const videoComment = e.target.parentNode;
  const commentId = videoComment.dataset.id;

  const response = await fetch(`/api/videos/comment/${commentId}`, {
    method: "DELETE",
  });

  const status = response.status;
  if (status === 200) {
    deleteComment(videoComment);
  }
};

const findDeleteBtn = () => {
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  if (deleteBtn) {
    deleteBtn.forEach((btn) => btn.addEventListener("click", handleDelete));
  } else {
    console.log("no!");
  }
};

const addComment = (text, id) => {
  const ul = document.querySelector(".video__comments-ul");
  const li = document.createElement("li");
  const i = document.createElement("i");
  const span = document.createElement("span");

  li.dataset.id = id;
  li.className = "video__comment";
  i.className = "fas fa-comment";
  i.innerText = ` ${text}`;
  span.innerText = ` ✖️`;
  span.className = "deleteBtn";

  li.appendChild(i);
  li.appendChild(span);
  ul.prepend(li);

  findDeleteBtn();
};

const handleSubmit = async (e) => {
  const textarea = form.querySelector("textarea");
  const videoId = videoContainer.dataset.id;
  const text = textarea.value;
  e.preventDefault();

  if (text === "") {
    return;
  }

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });

  const status = response.status;

  if (status === 201) {
    textarea.value = "";
    const json = await response.json();
    const id = json.newCommentId;
    addComment(text, id);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
  findDeleteBtn();
}
