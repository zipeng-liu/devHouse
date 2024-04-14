import IUser from "../interfaces/user.interface";
import ProfileItem from "./ProfileItem";

export const Profile = ({ users }: { users: IUser[] }) => {
  return (
    <>
      {users.map((user: IUser) => (
        <ProfileItem  user={user} />
      ))}
    </>
  );
};

export default Profile;