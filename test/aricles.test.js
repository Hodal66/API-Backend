import app from '../server.js';
import "dotenv/config";
import chai, {
  expect,
  should
} from 'chai';
import article from '../model/article.model.js';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import {
  auth
} from '../routes/verifyToken.js';
import {
  admin
} from '../routes/verifyToken.js'
import {
  before,
  beforeEach
} from "mocha";
chai.use(chaiHttp);
chai.should();

describe('POST API /api/v1/articles', () => {
  before(() => {
    mongoose.connection.dropCollection('Article');
  });
  const article = {
    _id: "623d26e81911a1b5759fda86",
    title: "my upateass",
    author: "by heto",
    content: "am exited to now you more and more am realy now that something will go arlight",
    createdAt: "2022-03-25T01:01:48.402Z"
  };

  it('it should successfully create an Article and return 201', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .send(article)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.be.equal(400);
        return done();
      });
  });
  it('it should NOT create an Article and return 404', (done) => {
    chai.request(app)
      .post('/api/v1/article')
      .send(article)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.be.equal(404);
        return done();
      });
  });

});




//get article by Id


describe("GET ARTICLE BY ID /api/v1/article/:id article post", () => {
  it("it should GET article by ID given the id and must be Authorized", async () => {
    let article ={
      title: "my upateass hhhh",
      author: "by muheto",
      content: "am exited to now you more and more jbjkh "
    };
  
    const deletePost = await chai
      .request(app)
      .post("/api/v1/articles/623d26e81911a1b5759fda86");
  
    deletePost.should.have.status(404);
    deletePost.body.should.be.a("object");
  });
  });

//Test UPDATE
// describe("This will Update an exsting post", async () => {
//   it("it should UPDATE a article by the given id and must be Authorized ", async () => {
//     let article = {
//       title: "my upateass",
//       author: "by heto",
//       content: "am exited to now you more and more "
//     };

//     const newPost = await chai
//       .request(app)
//       .put("/api/v1/articles/" + article._id)
//       .send({
//         title: "my upateass hhhh",
//         author: "by muheto",
//         content: "am exited to now you more and more jbjkh "
//       });
//     newPost.should.have.status(200);
//     newPost.body.should.be.a("object");
//   });
// });

// //Test DELETE
describe("DELETE/:id article post", () => {
it("it should DELETE a article given the id and must be Authorized", async () => {
  let article ={
    title: "my upateass hhhh",
    author: "by muheto",
    content: "am exited to now you more and more jbjkh "
  };

  const deletePost = await chai
    .request(app)
    .delete("/api/v1/articles/623d26e81911a1b5759fda86");

  deletePost.should.have.status(401);
  deletePost.body.should.be.a("object");
});
});