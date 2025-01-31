// const sessionIdToUserMap = new Map();

// const setUser = (id, user) => {
//     sessionIdToUserMap.set(id, user);
// };

// const getUser = (id) => {
//     return sessionIdToUserMap.get(id);
// };

// export default { setUser, getUser };

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET_KEY;

const createJwtToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role,
        },
        secret,
    );
};

const verifyJwtToken = (token) => {
    try {
        if (!token) return null;
        return jwt.verify(token, secret);
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
};

export default { createJwtToken, verifyJwtToken };
