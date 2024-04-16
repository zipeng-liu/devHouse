# Breakdown of Work:

## March 9th (First Sprint Complete)

### Aless:
I worked on the following tasks:

1. implement formValidater - to check if user's input for login is either empty or incorrect
2. serializeUser and deserializeUser - to store user data needed in the session
3. implement login - allow user to login with the crediential in mock database
4. implement register - allow user to login with mock-database

I also needed to research on Youtube and Google the following things:

1. <https://forums.developer.apple.com/forums/thread/682332> - For some reasons the port 5000 was occupied by AirPlay by default for Mac, so I had to remove it
2. <https://stackoverflow.com/questions/38713052/understanding-public-private-in-typescript-class> - I used this site to learn what should be private or public


### Denis:
I worked on the following tasks:

1. Implement authentication services for Mock DB - This is for checking and grabbing the data from the fake database.
2. Implement login, register, and logout for Mock DB in the authentication controller - This is to define each route and make the functionalities.
3. Implement passport configuration for Mock DB - This is to make the passport handle user authentication logic.
4. Fix the TSX files - This is to make error messages show on on login or registration page, and also added more form columns for registration page.

I also needed to research on Youtube and Google the following things:

1. <https://www.passportjs.org/packages/passport-local/> - For implementing passport local strategy.


### Armaan:
I worked on the following tasks:

1. Worked on auth authentication  - This task is responsible for authentication and sessions. 
2. Worked on authe controller  - This task involved me working on login and logout with sessions, also included deserialize and serialize.
3. Implemented configuration for password - This task is responsible for establishing secure and efficient protocols for user authentication.
4. Worked with Tailwind for errors - This task is responsible for errors, this made error messages show up in the login and registration.

I also needed to research on Youtube and Google the following things:
1.https://flowbite.com/docs/components/alerts/ -  To figureout how I can get errors to show up, I found alerts to be the simpliest
way to get alert pop ups when an error occured.

### Ademi:
I worked on the following tasks:

1. Authentication Mock services - This task is responsible for authentication functionality (create session and etc) with fake database.
2. Authentication controller - This task is responsible for login/register/logout pages functionality.




## March 16th (Second Sprint Complete)

### Aless:
I worked on the following tasks:

1. Set up prisma database - this task is responsible for moving data from mock db to prisma databse 
2. Post services - getting data from prisma to show on the post feed after login
3. Post controller - use post service to add in functionality

I also needed to research on Youtube and Google the following things:

1. <https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries> 


### Denis:
I worked on the following tasks:

1. Create Prisma schema - Define User, Post, Comment, Follows database schema.
2. Implement authentication services for Prisma - This is for checking and grabbing the data using Prisma ORM.
3. Implement Post services - Making user info and post feed show up.
4. Fixed header - added more buttons in the headers, for following and settings.
5. Implement the post's buttons functionalities - Include making comment, like number show up, and implement detlete post.
6. Create post page - This is to show single post info, and making new comment, show all the comments for that post.
7. Create following page - The page show the login user's current followers, and people not yet followed.
8. Implement the following logic - User can follow and unfollow other users.
9. Make the settings page show up.

I also needed to research on Youtube and Google the following things:

1. <https://www.prisma.io/docs/getting-started/quickstart> - For Prisma setup.
2. <https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/self-relations> - For how to create the Follows schema.
   

### Armaan:
I worked on the following tasks:

1. Implemented post services - This task is responsible for creating the methods needed for the PostService class. 
2. Implemented post routes - This task is responsible for the confiuration of post routes, post methods. Calls post services.
3. Created/modified Prisma schema - This task is responsible for organization of databases. Defining users, posts
4. Changed interface user string to number - This task is responsible for configuring or changing interfaces and types to number.
I did this because I would be able to use auto incrementation - This ended up breaking my prisma client.
5. Created basic operations for post - This task is reponsibible for adding and deleting posts and comments.

I also needed to research on Youtube and Google the following things:

1. https://www.prisma.io/docs/orm/prisma-client/queries/crud -  I found this very useful when creating my post routes and services.
It gave a good understanding of how to use crud using prisma.
2. https://www.prisma.io/docs/orm/prisma-schema/data-model/models - Helped me create my schema, the example they have was really nice.
3. https://github.com/prisma/prisma/issues/18272 -  I was getting an error related to prisma because my schema was not migrating.
4. https://github.com/prisma/prisma/issues/16990 -  The above error was related to this, and this helped me solve it.


### Ademi:
I worked on the following tasks:

1. Authentication services - This task is responsible for authentication functionality with prisma.
2. Prisma database setup - This task is responsible for database functionality using SQLite on prisma.
3. Post services - This task is responsible for post page functionality. (retrieving posts from db, add posts to db, delete them, add comment and etc)
4. Post controller - This task is responsible for post page functionality by using post services.
5. Unary relationship: following<->followers - This task is responsible for following id and followers id relationship to profiles functionality. (without creating new table, assign relationship, so it will automatically update each profile following/followers.)
6. All profiles page - This task is responsible for showing all profiles that user is not following, so they can add their post to feed.
7. Feed - This task is responsible for updating /posts to show all user and people they follow posts.

I also needed to research on Youtube and Google the following things:

1. <https://www.prisma.io/docs/orm/prisma-schema/data-model/relations/self-relations>
2. <https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries>
3. <https://www.prisma.io/docs/orm/prisma-client/queries/crud>
