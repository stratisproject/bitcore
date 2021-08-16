'use strict';

var inherits = require('util').inherits;
var bitcore = require('bitcore-lib-cirrus');
var p2p = require('bitcore-p2p');
var Message = p2p.Messages.Message;
var BufferUtil = bitcore.util.buffer;

/**
 * Request information about active peers
 * @extends Message
 * @param {Object} options
 * @constructor
 */
function SendheadersMessage(arg, options) {
  Message.call(this, options);
  this.command = 'sendheaders';
}
inherits(SendheadersMessage, Message);

SendheadersMessage.prototype.setPayload = function() {};

SendheadersMessage.prototype.getPayload = function() {
  return BufferUtil.EMPTY_BUFFER;
};

module.exports = SendheadersMessage;