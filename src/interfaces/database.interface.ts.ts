import IUser from "./user.interface";

// ⭐️ Feel free to change this interface to your liking
export default interface IDatabase {
  // find(arg0: (user: any) => boolean): unknown;
  users: IUser[];
}
