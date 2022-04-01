import app from '../server.js';
import "dotenv/config";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import router from '../routes/article.route.js';
import { admin } from '../routes/verifyToken.js';
import { before, beforeEach } from "mocha";
import { User } from '../model/User.js';
chai.use(chaiHttp);


describe('POST API //api/v1/users', () => {
    before(() => {
        mongoose.connection.dropCollection('User');
    });
    const user = {
        "name": "hodbbb",
         "email": "hM00oo@gmail.com",
        "password": "Mhthodol2022%5"
    };
    it('it should successfully create an account and return 201', (done) => {
        chai.request(app)
            .post('/api/v1/users/register')
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.be.equal(400);
                return done();
            });
    });
    it('it should NOT create an account and return 404', (done) => {
        chai.request(app)
            .post('/api/v1/users/regist')
            .send(user)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.be.equal(404);
                return done();
            });
    });
    it('Should return 400 when email exists', (done) => {
        const oldUser = user.email;
        chai.request(app).post('/api/v1/users/register')
            .send(user)
            .end((err, res) => {
                const Newuser = {
                    "name": "hodbbb",
                     "email": "hM00oo@gmail.com",
                    "password": "Mhthodol2022%5"
                };
               const newUser=Newuser.email;
                if (oldUser === newUser) return done(err);
                expect(res.status).to.be.equal(400);
                return done();
            });     
    });
    it('it should NOT create an accountbecouse missing property  and return 400', (done) => {
        chai.request(app)
            .post('/api/v1/users/register')
            .send(user)
            .end((err, res) => {
                
                const invalidUser = {
                     "email": "hM00oo@gmail.com",
                    "password": "Mhthodol2022%5"
                };

                if (err) return done(err);
                if(user === invalidUser)
                expect(res.status).to.be.equal(400);
                return done();
            });
    });
    it('it should NOT create an account becouse missing property  and return 400', (done) => {
        chai.request(app)
            .post('/api/v1/users/register')
            .send(user)
            .end((err, res) => {
                
                const invalidUser = {
                    
                     "email": "hM00oo@gmail.com"
                    
                };

                if (err) return done(err);
                if(user === invalidUser)
                expect(res.status).to.be.equal(400);
                return done();
            });
    });
    it('it should NOT create an account becouse missing property and return 400', (done) => {
        chai.request(app)
            .post('/api/v1/users/register')
            .send(user)
            .end((err, res) => {
                
                const invalidUser = {
                    "name": "hodbbb",
                     "email": "hM00oo@gmail.com"
                    
                };

                if (err) return done(err);
                if(user === invalidUser)
                expect(res.status).to.be.equal(400);
                return done();
            });
    });
    
});

describe("DELETE/:id the user", () => {
    it("it should DELETE a user given the id and must be Authorized", async () => {
        let user = {
            "name": "hodbbb",
         "email": "hMzzpp@gmail.com",
        "password": "Mhthodol2022%5"
            };
        const deleteUser = await chai
        .request(router)
        .delete("/api/v1/Users/" + user._id)
        .set("Authorization", "Bearer " + Token);
    
      deletePost.should.have.status(200);
      deletePost.body.should.be.a("object");
    });
    });

    
    
    
// describe("This will allow user to login in his account",()=>{
//     before(()=>{
//         mongoose.connection.dropCollection('User');

//         const loginUser={
//             email:"mhthodol@gmail.com",
//             password:"Mhthodol2020"
//         }
//     })

//     it("It should allow user to make a login ", (done)=>{
//         const oldEmail = login.email;
//         await chai.request(app)
//         .post('/api/v1/users/login')
//         .end((res,req)=>{
//             const newEmail = login.email;
//             if(oldEmail != newEmail)
//             {
//             res.should.have.status(201);
//             }
//             else{
//                 res.should.have.status(400);
//             }
//         });
//     });
// });

