import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  // console.log(this.password);
  if (this.isModified("password")) {
    // 비밀번호가 변경되는 경우에만 해쉬 진행
    this.password = await bcrypt.hash(this.password, 5);
  }
  // console.log(this.password);
});

const User = mongoose.model("User", userSchema);
export default User;
