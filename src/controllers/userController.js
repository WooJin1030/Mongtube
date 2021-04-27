import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
  const {
    body: { name, email, username, password, password2, location },
  } = req;

  const pageTitle = "Join";

  if (password !== password2) {
    return res.render("join", {
      pageTitle: pageTitle,
      errorMessage: "Password confirmation does not match",
    });
  }

  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.render("join", {
      pageTitle: pageTitle,
      errorMessage: "This user name/email is already taken.",
    });
  }

  await User.create({
    name,
    email,
    username,
    password,
    location,
  });

  return res.redirect("/login");
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See");
