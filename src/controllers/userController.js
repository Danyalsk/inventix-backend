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

export default { login, getUsers, createUser };
