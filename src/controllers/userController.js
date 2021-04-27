import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const {
    body: { name, email, usernam, password, location },
  } = req;

  await User.create({
    name,
    email,
    usernam,
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
