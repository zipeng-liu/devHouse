import { db } from "../interfaces";

const database: db = {
  users: {
    john123: {
      username: "john123",
      posts: [
        {
          id: "abc1",
          userId: "john123",
          message: "some post some message blah some post some message blah",
          createdAt: new Date(),
          likes: 3,
          reposts: 5,
          comments: 0,
          commentList: [
            {
              id: "abc2",
              createdAt: "2012-01-09T11:25:13Z",
              userId: "john123",
              message:
                "some post some message blah some post some message blah",
            },
          ],
        },
      ],
      codeSnippets: [],
      following: [],
      reposts: [],
    },
    james123: {
      username: "james123",
      posts: [
        {
          id: "abc3",
          userId: "james123",
          message: "A tweet by james, a tweet by james",
          createdAt: new Date(),
          likes: 30,
          reposts: 50,
          comments: 12,
          commentList: [
            {
              id: "abc4",
              createdAt: "2012-01-05T04:13:24Z",
              userId: "john123",
              message:
                "some post some message blah some post some message blah",
            },
          ],
        },
        {
          id: "abc5",
          userId: "james123",
          message: "Another tweet by james, another tweet by james",
          createdAt: new Date(),
          likes: 30,
          reposts: 50,
          comments: 12,
          commentList: [
            {
              id: "abc6",
              userId: "john123",
              createdAt: "2012-02-05T05:13:24Z",
              message:
                "some post some message blah some post some message blah",
            },
          ],
        },
      ],
      codeSnippets: [],
      following: [],
      reposts: [],
    },
  },
};

export { database };
