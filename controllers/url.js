import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function handleGetAllURLDetails(req, res) {
    try {
        const allURLDetails = await URL.find({});
        const html = `
        <html>
            <head>
                <title>URLs</title>
            </head>
            <body>
                <ol>
                    ${allURLDetails.map((urlEntry) => `<li>${urlEntry.shortId} - ${urlEntry.redirectURL} - ${urlEntry.visitHistory.length}</li>`).join("")}
                </ol>
            </body>
        </html>
        `;
        return res.status(200).send(html);
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: error });
    }
}

async function handleGenerateNewShortURL(req, res) {
    try {
        const body = req.body;
        console.log(body);
        if (!body || !body.url) {
            return res.status(400).json({ msg: "URL is required!" });
        }
        const shortId = nanoid(8);
        const result = await URL.create({
            shortId,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.user,
        });

        return res.render("home.ejs", { id: result.shortId });

        // return res.status(201).json({
        //     id: shortId,
        //     msg: "This short URL will redirect to the original URL"
        // })
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: error });
    }
}

async function handleRedirectURL(req, res) {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId: shortId },
            {
                $push: {
                    visitHistory: { timestamp: Date.now() },
                },
            },
        );
        if (entry) {
            res.redirect(entry.redirectURL);
        } else
            return res
                .status(400)
                .json({ msg: "No Redirect URL exists corresponding to this shortId" });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: error });
    }
}

async function handleGetAnalytics(req, res) {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });
        if (result) {
            return res.json({
                "Total Clicks": result.visitHistory.length,
                Analytics: result.visitHistory,
            });
        } else {
            return res.status(400).json({ msg: "Entered ShortId is wrong" });
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({ msg: error });
    }
}

export default {
    handleGenerateNewShortURL,
    handleRedirectURL,
    handleGetAnalytics,
    handleGetAllURLDetails,
};
