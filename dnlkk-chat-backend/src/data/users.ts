export type User = {
    id: string;
    name: string;
    image_url: string;
};

export const users: User[] = [];

export const addUser = (user: Pick<User, 'name' | 'image_url'>) => {
    users.push({ id: `${users.length + 1}`,...user })
}