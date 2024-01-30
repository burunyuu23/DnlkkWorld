export type User = {
    id: string;
    name: string;
    image_url: string;
};

const users = new Map<User['id'], User>([
    ['1', {id: '1', name: 'Днлкк Кошеня', image_url: 'https://sun151-1.userapi.com/s/v1/ig2/p_VqEM4QMvDVjPtrPCm2FBlyHUDBUwnlqlDWXOGZUcWQiA5RaaakQ4JrX0ZQApUUiWikCZYbwneGrASpLa95sWWD.jpg?size=100x100&quality=95&crop=176,126,270,270&ava=1'}],
    ['2', {id: '2', name: 'Таггер', image_url: 'https://sun151-1.userapi.com/s/v1/ig2/d5tudMNZH01Zdy3-Z_6LdanSU7n81_fj6k9Nc_vKRSsZnPFFEh9Fr2LVrmvDu30v8wj5M15zMsg6BDzxxl2jE1_3.jpg?size=100x100&quality=95&crop=0,50,697,697&ava=1'}],

]);

export const addUser = (user: Pick<User, 'name' | 'image_url'>) => {
    const id = `${users.size + 1}`;
    users.set(id, { id,...user })
};

export const getUserById = (id: User['id']) => users.get(id);

export const getUsersByIds = (ids: User['id'][]) => ids.map((id) => users.get(id));
