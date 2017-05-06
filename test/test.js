"use strict";

const mongoose = require('mongoose');
const Message = require('../models/message');
const User = require('../models/user');
const chai = require('chai');

describe('Database Tests', function () {
  before(function (done) {
    mongoose.connect('mongodb://localhost/testDatabase');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
      console.log('We are connected to test database!');
      done();
    });

  });

  describe('Test Database with message object', function () {
    it('new message is saved in the database', function (done) {
      let testMessage = Message({
        name: 'Sam',
        message: 'Hello testing',
        chatroom: 'room 1'
      });
      testMessage.save(done);
    });
    it('Should retrieve data from test database', function(done) {
      //Look up the 'Mike' object previously saved.
      Message.find({name: 'Sam'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });
  });
  //After all tests are finished drop database and close connection
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  });
  //-----------------USER REGISTRATION TESTING-----------------//
  describe('Test Database with user object', function () {
    it('new message is saved in the database', function (done) {
      let testUser = User({
        name: 'Sam',
        email: 'test@test.test',
        username: 'userSam',
        password: 'testpw',
      });
      testUser.save(done);
    });

  });
});


