const User = require('../models/model.user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecretKey = "secret";

const handleError = (res, status, message, error = null) => {
  console.error(error); // Логирование ошибок на сервере
  res.status(status).json({ message, error: error ? error.message : undefined });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecretKey);
  } catch (error) {
    return null; // Если токен невалиден или истек
  }
};

const getTokenFromHeader = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return handleError(res, 401, 'Unauthenticated');
    }
    return authHeader.split(' ')[1];
  } catch (error) {
    handleError(res, 400, 'Invalid token format', error);
    return null;
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return handleError(res, 400, 'Email and password are required');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email, 
      password: hashedPassword,
    });

    const result = await user.save();
    const { password: _, ...data } = result.toJSON();

    res.send(data);
  } catch (error) {
    handleError(res, 500, 'Error registering user', error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return handleError(res, 400, 'Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return handleError(res, 404, 'User not found');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return handleError(res, 401, 'Invalid credentials');
    }

    const token = jwt.sign({ _id: user._id }, jwtSecretKey, { expiresIn: '1h' });

    res.cookie('jwt', token, {
      httpOnly: true, // Безопасность
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.send({ token });
  } catch (error) {
    handleError(res, 500, 'Error logging in', error);
  }
};

const getUserInfo = async (req, res) => {
  try {
    const token = getTokenFromHeader(req, res);
    if (!token) return; // Если токен не найден, возвращаемся

    const claims = verifyToken(token);
    if (!claims) {
      return handleError(res, 401, 'Unauthenticated');
    }

    const user = await User.findById(claims._id);
    if (!user) {
      return handleError(res, 404, 'User not found');
    }

    const { password, ...data } = user.toJSON();
    res.send(data);
  } catch (error) {
    handleError(res, 500, 'Error fetching user info', error);
  }
};

const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.send({ message: 'Logged out successfully' });
  } catch (error) {
    handleError(res, 500, 'Error logging out', error);
  }
};

const updateInfo = async (req, res) => {
  try {
    const { userInfo } = req.body;
    if (!userInfo) {
      return handleError(res, 400, 'User info is required');
    }

    const token = getTokenFromHeader(req, res);
    if (!token) return;

    const claims = verifyToken(token);
    if (!claims) {
      return handleError(res, 401, 'Unauthenticated');
    }

    const user = await User.findById(claims._id);
    if (!user) {
      return handleError(res, 404, 'User not found');
    }

    Object.assign(user, userInfo);
    await user.save();

    res.send({ message: 'User info updated successfully' });
  } catch (error) {
    handleError(res, 500, 'Error updating user info', error);
  }
};

module.exports = {
  registerUser,
  login,
  getUserInfo,
  logout,
  updateInfo,
};