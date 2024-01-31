import {Router} from "express";
import {getLast50MessagesFrom, getRoomIdByUsers} from "../data/messages";
import {getLast50RoomsByUser, getRoomById, roomToDto} from "../data/rooms";
import {getUsersByIds} from "../data/users";

const router = Router();

router.get("/", (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.send({ ok: 'ok' });
})
router.get("/dialogs", (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const fromId = req.query.fromId ? req.query.fromId.toString() : undefined;
    const toId = req.query.toId ? req.query.toId.toString() : undefined;
    const user = req.query.user ? req.query.user.toString() : undefined;
    if (user) {
        res.send(getLast50RoomsByUser(user));
    } else if (fromId && toId) {
        res.send(roomToDto(getRoomById(getRoomIdByUsers(toId, fromId))));
    } else {
        res.status(400);
        res.send({ message: "Неверно составленный запрос" });
    }
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