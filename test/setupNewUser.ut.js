'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var sinon = require('sinon');

var setupNewUser = require('../src/setupNewUser');
var Database = require('../src/database');

describe('Unit Test', function () {

  // Spy
  it('should call save once', function () {
    var save = sinon.spy(Database, 'save');

    setupNewUser({name: 'test'}, function () { });

    save.restore();
    sinon.assert.calledOnce(save);
  });
  
  it('should pass object with correct values to save', function () {
    var save = sinon.spy(Database, 'save');
    var info = {name: 'test'};
    var expectedUser = {
      name: info.name,
      nameLowercase: info.name.toLowerCase()
    };
    
    setupNewUser(info, function() {});
    
    save.restore();
    sinon.assert.calledWith(save, expectedUser);
  });
  
  // Stubs
  it('should pass object with correct values to save', function () {
    var save = sinon.stub(Database, 'save');
    var info = {name: 'test'};
    var expectedUser = {
      name: info.name,
      nameLowercase: info.name.toLowerCase()
    };
    
    setupNewUser(info, function () { });
    
    save.restore();
    sinon.assert.calledWith(save, expectedUser);
  });
  
  it('should pass the error into the callback if save fails', function () {
    var expectedError = new Error('oops');
    var save = sinon.stub(Database, 'save');
    save.throws(expectedError);
    var callback = sinon.spy();
    
    setupNewUser({name: 'foo'}, callback);
    
    save.restore();
    sinon.assert.calledWith(callback, expectedError);
  });
  
  it('should pass the database result into the callback', function () {
    var expectedResult = {success: true};
    var save = sinon.stub(Database, 'save');
    save.yields(null, expectedResult);
    var callback = sinon.spy();
    
    setupNewUser({name: 'foo'}, callback);
    
    save.restore();
    sinon.assert.calledWith(callback, null, expectedResult);
  });
  
  // Mocks
  it('should pass object with correct values to save only once', function () {
    var info = {name: 'test'};
    var expectedUser = {
      name: info.name,
      nameLowercase: info.name.toLowerCase()
    };
    var database = sinon.mock(Database);
    database.expects('save').once().withArgs(expectedUser);
    
    setupNewUser(info, function() {});
    
    database.verify();
    database.restore();
  });

});