const User = require('../models/user');
const Task = require('../models/task');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/app');

chai.use(chaiHttp);
const should = chai.should();

describe('User', () => {
    let user1;

    before(async () => {
        user1 = new User({ name: 'User1', email: 'user1@gmail.com', password: '123123123', age: 18 });

        await User.deleteMany();
    });

    let token;
    let ownerId;
    let task1_id;

    it ('error add user1', (done) => {
        let user = new User({ name: 'User1' });

        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it ('correct add user1', (done) => {
        // let user = new User({ name: 'User1', email: 'user1@gmail.com', password: '123123123', age: 18 });

        chai.request(server)
            .post('/users')
            .send(user1)
            .end((err, res) => {
                res.should.have.status(200);
                ownerId = res.body._id;
                done();
            });
    });

    it ('correct add user2', (done) => {
        let user = new User({ name: 'User2', email: 'user2@gmail.com', password: '123123123', age: 18 });

        chai.request(server)
            .post('/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it ('correct login user1', (done) => {
        let user =  { email: 'user1@gmail.com', password: '123123123' };

        chai.request(server)
            .post('/users/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                token = res.body.token;
                done();
            });
    });

    // it('should get user1 profile', (done) => {
    //     chai.request(server)
    //         .get('/users/me')
    //         .set('Authorization', `Bearer ${token}`) // include the token in the header
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.have.property('_id');
    //             res.body.should.have.property('email').eql('user1@gmail.com');
    //             done();
    //         });
    // });

    it ('correct add task1', (done) => {
        let task = new Task({ title: "Task 1", description: "New Task 1", completed: false, owner: ownerId });

        task1_id = task._id;

        chai.request(server)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(task)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it ('correct add task2', (done) => {
        let task = new Task({ title: "Task 2", description: "New Task 2", completed: false, owner: ownerId });

        chai.request(server)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(task)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it ('get user1 tasks', (done) => {
        chai.request(server)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array').with.lengthOf(2);
                done();
            });
    });

    it ('get user1 task1', (done) => {
        chai.request(server)
            .get(`/tasks/${task1_id}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should logout a user1 successfully', (done) => {
        chai.request(server)
            .post('/users/logout')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Logged out successfully');
                done();
            });
    });

    it ('correct login user2', (done) => {
        let user =  { email: 'user2@gmail.com', password: '123123123' };

        chai.request(server)
            .post('/users/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                token = res.body.token;
                done();
            });
    });

    it ('correct add task3', (done) => {
        let task = new Task({ title: "Task 3", description: "New Task 3", completed: false, owner: ownerId });

        chai.request(server)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send(task)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it ('get user2 tasks', (done) => {
        chai.request(server)
            .get('/tasks')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('array').with.lengthOf(1);
                done();
            });
    });

    it ('get user1 task1 (error)', (done) => {
        chai.request(server)
            .get(`/tasks/${task1_id}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    it('should logout a user2 successfully', (done) => {
        chai.request(server)
            .post('/users/logout')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Logged out successfully');
                done();
            });
    });

    it ('get user1 task1 (error)', (done) => {
        chai.request(server)
            .get(`/tasks/${task1_id}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(403);
                done();
            });
    });
});
