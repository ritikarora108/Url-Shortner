import express from "express";
import urlControllers from "../controllers/url.js";

const {
    handleGenerateNewShortURL,
    handleRedirectURL,
    handleGetAnalytics,
    handleGetAllURLDetails,
} = urlControllers;

const router = express.Router();

router.route("/").post(handleGenerateNewShortURL).get(handleGetAllURLDetails);
router.get("/:shortId", handleRedirectURL);
router.get("/analytics/:shortId", handleGetAnalytics);

export default router;
