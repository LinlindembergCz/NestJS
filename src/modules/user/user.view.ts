import { ViewEntity, ViewColumn, Connection } from "typeorm";
import { User } from './user.entity';


@ViewEntity({
    expression: (connection: Connection) => connection.createQueryBuilder()
        .select("users.id", "id")
        .addSelect("users.username", "users")
        .from(User, "users")
})
export class UserView {
    @ViewColumn()
    id: number;
    @ViewColumn()
    username: string;
}

