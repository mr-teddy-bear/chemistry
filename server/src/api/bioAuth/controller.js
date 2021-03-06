import { loginUser, regUser } from "./service.js";

const loginController = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const resObj = await loginUser(email, password);
    const { token, user } = resObj;
    res.status(200).json({
      message: `Выполнен выход ${user}. Создан токен ${token}`,
      token,
      user,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const regController = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const newUser = await regUser(email, password, name);
    res.status(201).json({
      message: `Создан пользователь ${name} email: ${email} и паролем ${newUser.password}`,
    });
  } catch (e) {
    res.status(400).json({ message: e.message || "Bad request" });
  }
};

export { loginController, regController };
