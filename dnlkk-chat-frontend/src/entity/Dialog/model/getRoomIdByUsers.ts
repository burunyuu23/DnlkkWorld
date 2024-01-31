export const getRoomIdByUsers = (toId: string, fromId: string) => {
    const minId = Math.min(+toId, +fromId);
    const maxId = Math.max(+toId, +fromId);
    return `${minId}_${maxId}`;
}