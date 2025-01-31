import express from "express";
import URL from "../models/url.js";
import authMiddlewares from "../middlewares/auth.js"

const router = express.Router();

router.get("/admin/urls", authMiddlewares.restrictTo(["ADMIN"]), async (req, res) => {
    try {
        const allUrls = await URL.find();
        res.render("home.ejs", {
            urls: allUrls,
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: String(error) });
    }
});

router.get("/", authMiddlewares.restrictTo(["NORMAL","ADMIN"]), async (req, res) => {
    // try {
    //     const urlEntries = await URL.find({});
    //     res.render("home.ejs", {
    //         urlEntries: urlEntries,
    //     });

    // in home.js write this in body:

    // <% urlEntries.forEach(urlEntry => { %>
    //     <li><%= urlEntry.shortId %> - <%= urlEntry.redirectURL %> - <%= urlEntry.visitHistory.length %> </li>
    // <% }) %>

    // } catch (error) {
    //     console.log(`Error: ${error}`);
    //     return res.status(500).json({ msg: String(error) });
    // }

    try {
        const allUrls = await URL.find({ createdBy: req.user._id });
        res.render("home.ejs", {
            urls: allUrls,
        });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: String(error) });
    }
});

router.get("/signup", (req, res) => {
    try {
        return res.render("signup.ejs");
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: String(error) });
    }
});

router.get("/login", (req, res) => {
    try {
        return res.render("login.ejs");
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: String(error) });
    }
});

export default router;
