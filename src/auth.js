const express = require ('express');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const router = express.Router();

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({ message: 'Acesso negado' });

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(error){
        res.status(400).json({ message: 'Token inválido' });
    }
}