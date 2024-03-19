import { database } from "../model/fakeDB";
import IUser from "./user.interface";

// ⭐️ Feel free to change this interface to your liking
export default interface IDatabase {
  // filter(arg0: (userdb: any) => boolean): unknown;
  //find(arg0: (user: IUser) => boolean): IUser | unknown;
  users: IUser[];
}
