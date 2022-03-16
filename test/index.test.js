// import app from "../server.js";
// import chai, { expect } from "chai";
// import chaiHttp from "chai-http";
// import Blog from "../model/blog.js";
// import { User } from "../model/User.js";
// import { Contact } from "../model/contactUs.js"

// let should = chai.should();

// chai.use(chaiHttp);

// var Token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWVkYzI4OGUwZjFiOTkzOGMzNDBkNWIiLCJpYXQiOjE2NDMxMDQzNTV9.muuNhvpTEUSM4AtZOUVZ-eJBlzirrQwpto1fvwJNP8A";

// describe("blogs", async () => {
//   before(async () => {
//     await Blog.deleteMany({});
//     await User.deleteMany({});
//     console.log("Post deleted");
//   });

//   //Get all blogs
//   describe("get a list of blogs ", () => {
//     it("It should return a list of blogs", async () => {
//       const getAll = await chai.request(app).get("/api/v1/blogs");

//       getAll.should.have.status(200);
//       getAll.body.should.be.a("object");
//       // console.log(res.body);
//     });
//     //Test the Post route
//     describe("POST blog", () => {
//       let blog = {
//         title: "I am testing",
//         snippet: "can i pass",
//         body: "Testing ",
//       };

//       it("It should POST a post with valid fields", async () => {
//         const request = await chai
//           .request(app)
//           .post("/api/v1/blogs")
//           .send(blog)
//           .set("Authorization", "Bearer " + Token);
//         console.log(request.body);
//         console.log("we were here");

//         request.should.have.status(201);
//         request.body.should.be.a("object");
//         request.body.should.have.property("title");
//         request.body.should.have.property("snippet");
//         request.body.should.have.property("body");
//       });
//     });

// });
