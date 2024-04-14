// import ErrorAlert from "../../../components/shared/ErrorAlert";
// import { Html } from "../../../templates/html-tmpl";

// export default (props: { errorMessage: string }) => {
//   return (
//     <Html>
//       <div class="bg-white font-family-karla h-screen">
//         <div class="w-full flex flex-wrap">
//           <div class="w-full md:w-1/2 flex flex-col">
//             <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
//               <a
//                 href="/"
//                 class="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
//               >
//                 <span class="mx-auto text-xl font-black leading-none text-gray-900 select-none">
//                   DevHouse<span class="text-blue-500">.</span>
//                 </span>
//               </a>
//             </div>

//             <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
//               <p class="text-center font-bold text-3xl">Welcome!</p>
//               { props.errorMessage && <ErrorAlert errorMessage={props.errorMessage} />}
//               <form class="flex flex-col" method="post" action="/auth/register">
//                 <div class="flex flex-col">
//                   <label for="email" class="text-lg">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     placeholder="your@email.com"
//                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
//                     required
//                   />
//                 </div>

//                 <div class="flex flex-col pt-4">
//                   <label for="password" class="text-lg">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     placeholder="Password"
//                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
//                     required
//                   />
//                 </div>

//                 <div class="flex flex-col pt-4">
//                   <label for="username" class="text-lg">
//                     Username
//                   </label>
//                   <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     placeholder="Username"
//                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
//                     required
//                   />
//                 </div>

//                 <div class="flex flex-col pt-4">
//                   <label for="firstname" class="text-lg">
//                     First name
//                   </label>
//                   <input
//                     type="text"
//                     id="firstname"
//                     name="firstname"
//                     placeholder="firstname"
//                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
//                     required
//                   />
//                 </div>

//                 <div class="flex flex-col pt-4">
//                   <label for="lastname" class="text-lg">
//                     Last name
//                   </label>
//                   <input
//                     type="text"
//                     id="lastname"
//                     name="lastname"
//                     placeholder="lastname"
//                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
//                     required
//                   />
//                 </div>

//                 <input
//                   type="submit"
//                   value="Register"
//                   class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
//                 />
//               </form>
//               <div class="text-center pt-12 pb-12">
//                 <p>
//                   Already have an account?&nbsp
//                   <a href="/auth/login" class="underline hover:text-blue-500 font-semibold">
//                     Login here
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div class="w-1/2 shadow-2xl">
//             <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0" />
//           </div>
//         </div>
//       </div>
//     </Html>
//   );
// };
import ErrorAlert from "../../../components/shared/ErrorAlert";
import { Html } from "../../../templates/html-tmpl";

export default (props: { errorMessage: string }) => {
  return (
    <Html>
      <div class="bg-white font-family-karla h-screen">
        <div class="w-full flex flex-wrap">
          
          <div class="w-full max-w-lg mx-auto pt-12">
            
            <div class="text-left mb-8">
              <a
                href="/"
                class="mb-5 font-medium text-gray-900"
              >
                <span class="text-xl font-black leading-none text-gray-900 select-none">
                  DevHouse<span class="text-blue-500">.</span>
                </span>
              </a>
              <p class="text-3xl font-bold text-center mb-8">Welcome!</p>
            </div>
            
            {props.errorMessage && <ErrorAlert errorMessage={props.errorMessage} />}

            <form class="mt-8" method="post" action="/auth/register">
              
              <div class="mb-4">
                <label for="email" class="text-lg">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              {/* Password field */}
              <div class="mb-4">
                <label for="password" class="text-lg">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              {/* Username field */}
              <div class="mb-4">
                <label for="username" class="text-lg">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              {/* First name field */}
              <div class="mb-4">
                <label for="firstname" class="text-lg">First name</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="firstname"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              {/* Last name field */}
              <div class="mb-4">
                <label for="lastname" class="text-lg">Last name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="lastname"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              {/* Submit button */}
              <div class="mb-4">
                <input
                  type="submit"
                  value="Register"
                  class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 w-full"
                />
              </div>
            </form>

            {/* Login link */}
            <div class="text-center">
              <p>
                Already have an account?&nbsp;
                <a href="/auth/login" class="underline hover:text-blue-500 font-semibold">
                  Login here
                </a>
              </p>
            </div>
          </div>

          {/* Right side image */}
          <div class="w-full md:w-1/2">
            <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0" />
          </div>
        </div>
      </div>
    </Html>
  );
};
