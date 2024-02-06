import dayjs from "dayjs";
import {Message} from "@/entity/Message";

const lastMessageTime = (sendAt: Message['sendAt']) => {
    const lastMessageDate = new Date(sendAt);
    const nowDate = new Date();

    const month = lastMessageDate.toLocaleString('default', { month: 'long' }).substring(0, 3);

    if (nowDate.getFullYear() > lastMessageDate.getFullYear()) {
        return `${lastMessageDate.getDay()} ${month} ${lastMessageDate.getFullYear()}`;
    } else if (nowDate.getTime() - lastMessageDate.getTime() > 86_400_000) {
        return `${lastMessageDate.getDay()} ${month}`;
    } else {
        return dayjs(sendAt).format('HH:mm');
    }
};

export default lastMessageTime;
