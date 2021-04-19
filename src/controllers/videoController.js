let videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2minutes ago",
    views: 1,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2minutes ago",
    views: 59,
    id: 3,
  },
];

export const trending = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });
export const search = (req, res) => res.send("Search");

export const watch = (req, res) => {
  const {
    params: { id },
  } = req;
  // console.log(id);
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watch ${video.title}`, video });
};

export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");
