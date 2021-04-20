import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const {
    params: { id },
  } = req;
  // console.log(id);
  const video = await Video.findById(id);
  console.log(video);

  return res.render("watch", { pageTitle: `${video.title}`, video });
};

export const getEdit = (req, res) => {
  const {
    params: { id },
  } = req;

  res.render("edit", { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
  const {
    params: { id },
    body: { title },
  } = req;

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description, hashtags },
  } = req;

  try {
    // const video = new Video{}
    // await video.save()
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((hashtag) => `#${hashtag}`),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
