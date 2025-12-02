import User from "../models/user.model.js";

export const getCurrentuser = async (req, res) => {
  try {
    const userId = req.userId;

    const currentUser = await User.findById(userId).select("-password");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(currentUser);

  } catch (error) {
    return res.status(500).json({ message: `current user error: ${error}` });
  }
};
