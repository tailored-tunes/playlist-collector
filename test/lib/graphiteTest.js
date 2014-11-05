/* global describe: true, it: true*/
var sinon = require('sinon');
var chance = require('chance').Chance();

describe('Graphite', function() {
    it('should send the stats', function(done) {

        var reqApi = {write: function () {},end: function () {} };
        var httpApi = { request: function () {}};
        var mockReq = sinon.mock(reqApi);
        var mockHttp = sinon.mock(httpApi);

        var randomMessage = chance.string();
        var randomTag = chance.string();
        var randomHost = chance.string();

        var msg = JSON.stringify({
            what: randomMessage,
            tags: randomTag
        });
        var headers = {
            'Content-Type': 'application/json',
            'Content-Length': msg.length
        };

        var options = {
            host: randomHost,
            port: 80,
            path: '/events/',
            method: 'POST',
            headers: headers
        };

        mockHttp.expects('request').once().withArgs(options).returns(reqApi);
        mockReq.expects('write').once().withArgs(msg);
        mockReq.expects('end').once();

        var graphite = require('../../src/lib/graphite')(httpApi, randomHost);
        graphite.send(randomMessage, randomTag);
        mockHttp.verify();
        mockReq.verify();

        done();
    });

    it('should not do anything without a host', function(done){
        var httpApi = { request: function () {}};
        var mockHttp = sinon.mock(httpApi);
        mockHttp.expects('request').never();
        var graphite = require('../../src/lib/graphite')(httpApi);
        graphite.send(chance.string(), chance.string());
        mockHttp.verify();
        done();
    });

});
