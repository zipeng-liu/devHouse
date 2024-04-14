import IUser from "../interfaces/user.interface";

interface Props {
  user: IUser;
}

export const ProfileItem = ( {user}: Props) => {
  const actionUrl = user.id ? `/profile/${user.id}` : '/posts';
  return (
    <div class="mx-5 rounded mt-5 bg-white border-b-[1px] p-10 cursor-pointer border-slate-200 hover:bg-gray-100 transition relative">
            <div class="flex flex-row items-center gap-3 cursor-pointer">
            <img class="w-10 h-10 rounded-full" src={user.profilePicture} alt="Rounded avatar" />
    
            <div class="w-full">

            <div class="flex flex-row items-center gap-20 justify-between">
              <p class="dark:text-white font-semibold cursor-pointer hover:underline">{user.username}</p>
            </div>
    

            <form action={actionUrl}>
              <div
                class={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`}
              >
                <button class="bg-sky-500 text-white rounded-full font-semibold border transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed px-8 py-2">
                  Follow
                </button>
              </div>
            </form>
            </div>
          </div>
    </div>
  );
};

export default ProfileItem;