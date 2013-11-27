var hoodieAccount = require('../mocks/hoodie/account.mock');
var hoodieConfig = require('../mocks/hoodie/config.mock');
var hoodieConnection = require('../mocks/hoodie/connection.mock');
var hoodieDispose = require('../mocks/hoodie/dispose.mock');
var hoodieEvents = require('../mocks/hoodie/events.mock');
var hoodieGenerateId = require('../mocks/hoodie/generate_id.mock');
var hoodieOpen = require('../mocks/hoodie/open.mock');
var hoodiePromises = require('../mocks/hoodie/promises.mock');
var hoodieRemoteStore = require('../mocks/hoodie/remote_store.mock');
var hoodieRequest = require('../mocks/hoodie/request.mock');
var hoodieStore = require('../mocks/hoodie/store.mock');
var hoodieTask = require('../mocks/hoodie/task.mock');

sinon.stub(global, 'require').withArgs('./hoodie/account').returns(hoodieAccount);

var Hoodie = require('../../src/hoodie');

describe('Hoodie', function() {
  beforeEach(function() {

    this.hoodie = new Hoodie('http://couch.example.com');
  });
  it('should hoodie.account.checkPasswordReset()', function() {
    expect(this.hoodie.account.checkPasswordReset).to.be.called();
  });
});
// describe('Hoodie', function() {

//   'use strict';

//   beforeEach(function() {

//     // stubbing all the modules
//     this.sandbox.stub(window, 'hoodieEvents', hoodieEvents);
//     this.sandbox.stub(window, 'hoodiePromises', hoodiePromises);
//     this.sandbox.stub(window, 'hoodieRequest', hoodieRequest);
//     this.sandbox.stub(window, 'hoodieConnection', hoodieConnection);
//     this.sandbox.stub(window, 'hoodieGenerateId', hoodieGenerateId);
//     this.sandbox.stub(window, 'hoodieDispose', hoodieDispose);
//     this.sandbox.stub(window, 'hoodieOpen', hoodieOpen);
//     this.sandbox.stub(window, 'hoodieStore', hoodieStore);
//     this.sandbox.stub(window, 'hoodieTask', hoodieTask);
//     this.sandbox.stub(window, 'hoodieConfig', hoodieConfig);
//     this.sandbox.stub(window, 'hoodieAccount', hoodieAccount);
//     this.sandbox.stub(window, 'hoodieRemoteStore', hoodieRemoteStore);
//     this.sandbox.stub(window, 'addEventListener');

//     this.hoodie = new Hoodie('http://couch.example.com');
//   });

//   describe('new Hoodie(baseUrl)', function() {
//     it('should store the base url', function() {
//       var hoodie = new Hoodie('http://couch.example.com');
//       expect(hoodie.baseUrl).to.eql('http://couch.example.com');
//     });

//     it('should remove trailing slash from passed URL', function() {
//       var hoodie = new Hoodie('http://couch.example.com/');
//       expect(hoodie.baseUrl).to.eql('http://couch.example.com');
//     });

//     it('should default the CouchDB URL to current domain with a api subdomain', function() {
//       var hoodie = new Hoodie();
//       expect(hoodie.baseUrl).to.be( undefined );
//     });

//     // test for extending with core modules
//     it('should extend with hoodieEvents module', function() {
//       expect(window.hoodieEvents).to.be.calledWith(this.hoodie);
//     });
//     it('should extend with hoodiePromises module', function() {
//       expect(window.hoodiePromises).to.be.calledWith(this.hoodie);
//     });
//     it('should extend with hoodieRequest module', function() {
//       expect(window.hoodieRequest).to.be.calledWith(this.hoodie);
//     });
//     it('should extend with hoodieConnection module', function() {
//       expect(window.hoodieConnection).to.be.calledWith(this.hoodie);
//     });
//     it('should extend with hoodieGenerateId module', function() {
//       expect(window.hoodieGenerateId).to.be.calledWith(this.hoodie);
//     });
//     it('should extend with hoodieDispose module', function() {
//       expect(window.hoodieDispose).to.be.calledWith(this.hoodie);
//     });
//     it('should extend with hoodieOpen module', function() {
//       expect(window.hoodieOpen).to.be.calledWith(this.hoodie);
//     });
//     it('should extend with hoodieStore module', function() {
//       expect(window.hoodieStore).to.be.calledWith(this.hoodie);
//     });
//     it('should extend with hoodieConfig module', function() {
//       expect(window.hoodieConfig).to.be.calledWith(this.hoodie);
//     });
//     it('should extend with hoodieAccount module', function() {
//       expect(window.hoodieAccount).to.be.calledWith(this.hoodie);
//     });
//     it('should extend with hoodieRemoteStore module', function() {
//       expect(window.hoodieRemoteStore).to.be.calledWith(this.hoodie);
//     });

//     // initializations

//     it('presets hoodie.account.username', function() {
//       expect(this.hoodie.config.get).calledWith('_account.username');
//       expect(this.hoodie.account.username).to.be('_account.username');
//     });

//     it('checks for a pending password reset', function() {
//       expect(this.hoodie.account.checkPasswordReset).to.be.called();
//     });

//     it('authenticates', function() {
//       expect(this.hoodie.account.authenticate).to.be.called();
//     });

//     it('clears store on signup', function() {
//       expect(this.hoodie.on).to.be.calledWith('account:signout', this.hoodie.config.clear);
//     });

//     it('inits store module', function() {
//       expect(this.hoodie.store.patchIfNotPersistant).to.be.called();
//       expect(this.hoodie.store.subscribeToOutsideEvents).to.be.called();
//       expect(this.hoodie.store.bootstrapDirtyObjects).to.be.called();
//     });

//     it('inits task module', function() {
//       expect(this.hoodie.task.subscribeToOutsideEvents).to.be.called();
//     });

//     it('inits remote module', function() {
//       expect(this.hoodie.remote.subscribeToOutsideEvents).to.be.called();
//     });

//     it('connects to remote when authenticate succeeds', function() {
//       expect(this.hoodie.remote.connect).to.not.be.called();
//       this.hoodie.account.authenticateDefer.resolve('joe@example.com');
//       expect(this.hoodie.remote.connect).to.be.called();

//       expect(this.hoodie.remote.connect).to.not.be.calledWith('joe@example.com');
//       // ... because it would set the remote store name to 'joe@example.com'
//       //     which is not correct. The remote store is 'user/<hash>'
//     });

//     it('checks connection when user goes offline', function() {
//       expect(window.addEventListener).to.be.calledWith('offline', this.hoodie.checkConnection, false);
//     });

//     it('checks connection when user goes online', function() {
//       expect(window.addEventListener).to.be.calledWith('online', this.hoodie.checkConnection, false);
//     });

//     it('checks connection', function() {
//       expect(this.hoodie.checkConnection).to.be.called();
//     });
//   });

//   describe('Hoodie.extend', function() {
//     it('should init extensions on initialization', function() {
//       var extension = sinon.spy();
//       Hoodie.extend( extension );
//       var hoodie = new Hoodie();
//       expect(extension).to.be.calledWith(hoodie);
//     });
//   });
// });
