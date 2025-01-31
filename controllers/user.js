import User from "../models/user.js";
// import { v4 as uuidv4 } from "uuid"
import authService from "../service/auth.js";

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;
        await User.create({
            name,
            email,
            password,
        });
        return res.redirect("/");
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: String(error) });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email,
            password,
        });
        if (!user) {
            return res.render("login.ejs", {
                error: "Invalid email or password",
            });
        }

        // const sessionId = uuidv4();
        // authService.setUser(sessionId, user);
        // res.cookie('uid', sessionId);

        const token = authService.createJwtToken(user);
        res.cookie('jwtToken', token);
        return res.status(200).redirect("/");

        // return res.status(200).json({ token });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: String(error) });
    }
}

export default { handleUserSignup, handleUserLogin };
