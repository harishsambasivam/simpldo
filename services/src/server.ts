import createServer from "./app";
import users from "../src/users/users.data";

export default await createServer({ users });
