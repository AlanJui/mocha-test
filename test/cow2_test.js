'use strict';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var sinon = require('sinon');

var Cow = require('../src/cow2');

describe('Cow2', function () {
  var sandbox;

  beforeEach(function () {
    // crete a sandbox
    sandbox = sinon.sandbox.create();

    // stub some console methods
    sandbox.stub(console, "log");
    sandbox.stub(console, "error");
  });

  afterEach(function () {
    // restore the environment as it was before
    sandbox.restore();
  });

  describe('constructor', function () {

    it('should have a default name', function () {
      var cow = new Cow();
      expect(cow.name).to.equal('Anon cow');
    });

    it('should set cow\'s name if provided', function () {
      var cow = new Cow('Kate');
      expect(cow.name).to.equal('Kate');
    });

  });

  describe('#greets', function () {

    it('should log in an error if no target is passed in', function () {
      (new Cow()).greets();

      sinon.assert.notCalled(console.log);
      sinon.assert.calledOnce(console.error);
      sinon.assert.calledWithExactly(console.error, 'missing target');
    });

    it('should log greetings', function () {
      var greetings = (new Cow('Kate')).greets('Baby');

      sinon.assert.notCalled(console.error);
      sinon.assert.calledOnce(console.log);
      sinon.assert.calledWithExactly(console.log, 'Kate greets Baby');
    });

  });

});