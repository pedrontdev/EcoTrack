const User = require('../models/User');
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
const { name, email, password } = req.body;
const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }
    try {
        const user = new User({
            name,
            email,
            password,
        });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erro no registro do usuário', error });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Senha incorreta' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

module.exports = { registerUser, loginUser };