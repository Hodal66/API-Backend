import app from '../server.js';
import chai, {
  expect,
  should
} from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import {
  before,
  beforeEach
} from "mocha";
chai.use(chaiHttp);
chai.use(should);

describe("CONTACT-US", async () => {
  //Get all Messages
  describe("get a list of messages ", () => {
    it("It should return a list of messages", async () => {
      const getAll = await chai.request(app)
        .get("/api/v1/contacts");

      getAll.should.have.status(200);
      getAll.body.should.be.a("object");

    });
    //Test the Post route
    describe("POST contact", () => {

      it("It should POST a post with valid fields and all is required", async () => {

        let contact = {
          name: "hodal",
          email: "mhthodol233@gmail.com",
          message: "Testing my contact"
        };

        const createRequest = await chai
          .request(app)
          .post("/api/v1/contacts/contactUs");

        createRequest.should.have.status(400);
        createRequest.body.should.be.a("object");
      });
    });
    it("It should NOT POST becouse of invalid link or ulr this return error 404", async () => {

      let contact = {
        name: "hodal",
        email: "mhthodol233@gmail.com",
        message: "Testing my contact"
      };

      const createRequest = await chai
        .request(app)
        .post("/api/v1/contacts/cont");
      createRequest.should.have.status(404);
      createRequest.body.should.be.a("object");
    });
  });
});
//   it("It should NOT POST a post with Email length is required", async () => {

//     let contact = {
//       name: "hodal",
//       email: "m233@gmail.com",
//       message: "Testing my contact"
//     };

//     const createRequest = await chai
//       .request(app)
//       .post("/api/v1/contacts/contactUs");

// if (err)return done(err);
// if(contact.email.length<3)
//     createRequest.should.have.status(400);
//     createRequest.body.should.be.a("object");
//     return done();
//   });
// });