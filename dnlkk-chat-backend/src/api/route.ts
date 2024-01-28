import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send('Привет мир!');
})

export default router;