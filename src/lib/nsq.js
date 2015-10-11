var nsq = require('nsqjs');

var w = new nsq.Writer(process.env.NSQ_HOST, process.env.NSQ_PORT);

var publisher = require('./nsq-publisher')(w, messageConverter);
module.exports = publisher;
