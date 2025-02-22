import userService from "../services/userService.js";

const login = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const token = await userService.loginUser(username, password, email);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

const createUser = async (req, res) => {
  const userData = req.body;
  try {
    const user = await userService.createUser(userData);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

const editUser = async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging

    const { ...userData } = req.body;
    const { id } = req.params;

    console.log("Received user data:", userData);
    console.log("Received user ID:", id);

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    if (!userData || Object.keys(userData).length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid input: userData is required" });
    }

    const updatedUser = await userService.editUser(id, userData);
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Edit User Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

export default { login, getUsers, createUser, editUser };
