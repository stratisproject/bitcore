'use strict';

var _ = require('lodash');
var inherits = require('util').inherits;
var bitcore = require('bitcore-lib');
var p2p = require('bitcore-p2p');
var Message = p2p.Messages.Message;
var utils = require('./utils');
var BufferReader = bitcore.encoding.BufferReader;
var BufferWriter = bitcore.encoding.BufferWriter;
var $ = bitcore.util.preconditions;

/**
 * Query another peer about block headers. It can query for multiple block hashes,
 * and the response will contain all the chains of blocks starting from those
 * hashes.
 * @param {Object=} options
 * @param {Array=} options.starts - Array of buffers or strings with the starting block hashes
 * @param {Buffer=} options.stop - Hash of the last block
 * @extends Message
 * @constructor
 */
function PoahdrMessage(arg, options) {
  Message.call(this, options);
  this.BlockHeader = options.BlockHeader;
  this.command = 'headers';
  $.checkArgument(
    _.isUndefined(arg) || (Array.isArray(arg) && arg[0] instanceof this.BlockHeader),
    'First argument is expected to be an array of BlockHeader instances'
  );
  this.headers = arg;
}
inherits(PoahdrMessage, Message);

PoahdrMessage.prototype.setPayload = function(payload) {
  $.checkArgument(payload && payload.length > 0, 'No data found to create Headers message');
  var parser = new BufferReader(payload);
  var count = parser.readVarintNum();

  this.headers = [];
  for (var i = 0; i < count; i++) {
    var header = this.BlockHeader.fromBufferReader(parser);
    this.headers.push(header);
    // var txn_count = parser.readUInt8();
    // $.checkState(txn_count === 0, 'txn_count should always be 0');
  }
  utils.checkFinished(parser);
};

PoahdrMessage.prototype.getPayload = function() {
  var bw = new BufferWriter();
  bw.writeVarintNum(this.headers.length);
  for (var i = 0; i < this.headers.length; i++) {
    var buffer = this.headers[i].toBuffer();
    bw.write(buffer);
    bw.writeUInt8(0);
  }
  return bw.concat();
};

module.exports = PoahdrMessage;