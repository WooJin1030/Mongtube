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

export const watch = (req, res) => {
  const {
    params: { id },
  } = req;
  // console.log(id);
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};

export const getEdit = (req, res) => {
  const {
    params: { id },
  } = req;
  const video = videos[id - 1];
  res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;

  videos[id - 1].title = title;

  return res.redirect(`/videos/${id}`);
};
