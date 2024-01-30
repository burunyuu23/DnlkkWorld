import {Router} from "express";
import {getLast50MessagesFrom} from "../data/messages";
import {getLast50RoomsByUser} from "../data/rooms";
import {getUsersByIds} from "../data/users";

const router = Router();

router.get("/dialogs/:id", (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(getLast50RoomsByUser(req.params.id));
})
router.get("/users/", (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(getUsersByIds(['1', '2']));
})

router.get("/messages/", (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send(getLast50MessagesFrom(req.query.toId.toString(), req.query.fromId.toString()));
})

export default router;