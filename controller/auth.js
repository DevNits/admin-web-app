const jwt = require('jsonwebtoken');

const firebase = require('../db');
const User = require('../models/user');

const firestore = firebase.firestore();

const maxAge = 3 * 24 * 60 * 60;
const createToken = role => {
    return jwt.sign({ role }, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    });
};

const home_get = async(req, res) => {
    res.render('home');
}

const login_get = async (req, res) => {
    res.render('login');
}

const login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const snapshot = await firebase.firestore().collection('users').get();
        const datas = await snapshot.docs.map(doc => doc.data());

        for (var i = 0; i < datas.length; i++) {
            const user = await datas[i].email === email ? datas[i] : 'Some error occured!';

            if (user !== 'Some error occured!') {
                if (password === JSON.stringify(user.password)) {
                    const token = await createToken(user.email);
                    res.cookie('jwt-fb', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.status(200).json({ user: user });
                } else {
                    return res.status(400).json({ login_error: 'Your password did not match!' });
                }
            } else {
                return res.status(400).json({ login_error: user });
            }
        }
    }
    catch (err) {
        const errors = err;
        res.status(400).json({ errors });
    }
}

const logout_get = (req, res) => {
    res.cookie('jwt-fb', '', { maxAge: 1 });
    res.redirect('/api');
}

const activateAccount = (req, res) => {
    const token = req.params.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/api/signup');
            } else {
                const { name, email, password } = decodedToken;
                const user = await firestore.collection('users').doc().set({ name, email, password });
                res.send('User saved successfully!');
            }
        });
    } else {
        res.redirect('/api/signup');
    }
}

module.exports = { 
    home_get, login_get, login_post, logout_get, activateAccount
}