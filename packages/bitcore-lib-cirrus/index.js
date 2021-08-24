'use strict';

var cirruscore = module.exports;

// module information
cirruscore.version = 'v' + require('./package.json').version;
cirruscore.versionGuard = function(version) {
  if (version !== undefined) {
    var message = 'More than one instance of bitcore-lib-cirrus found. ' +
      'Please make sure to require bitcore-lib-cirrus and check that submodules do' +
      ' not also include their own bitcore-lib-cirrus dependency.';
    throw new Error(message);
  }
};
cirruscore.versionGuard(global._cirruscore);
global._cirruscore = cirruscore.version;

// crypto
cirruscore.crypto = {};
cirruscore.crypto.BN = require('./lib/crypto/bn');
cirruscore.crypto.ECDSA = require('./lib/crypto/ecdsa');
cirruscore.crypto.Hash = require('./lib/crypto/hash');
cirruscore.crypto.Random = require('./lib/crypto/random');
cirruscore.crypto.Point = require('./lib/crypto/point');
cirruscore.crypto.Signature = require('./lib/crypto/signature');

// encoding
cirruscore.encoding = {};
cirruscore.encoding.Base58 = require('./lib/encoding/base58');
cirruscore.encoding.Base58Check = require('./lib/encoding/base58check');
cirruscore.encoding.BufferReader = require('./lib/encoding/bufferreader');
cirruscore.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
cirruscore.encoding.Varint = require('./lib/encoding/varint');

// utilities
cirruscore.util = {};
cirruscore.util.buffer = require('./lib/util/buffer');
cirruscore.util.js = require('./lib/util/js');
cirruscore.util.preconditions = require('./lib/util/preconditions');

// errors thrown by the library
cirruscore.errors = require('./lib/errors');

// main bitcoin library
cirruscore.Address = require('./lib/address');
cirruscore.Block = require('./lib/block');
cirruscore.MerkleBlock = require('./lib/block/merkleblock');
cirruscore.BlockHeader = require('./lib/block/blockheader');
cirruscore.HDPrivateKey = require('./lib/hdprivatekey.js');
cirruscore.HDPublicKey = require('./lib/hdpublickey.js');
cirruscore.Message = require('./lib/message');
cirruscore.Networks = require('./lib/networks');
cirruscore.Opcode = require('./lib/opcode');
cirruscore.PrivateKey = require('./lib/privatekey');
cirruscore.PublicKey = require('./lib/publickey');
cirruscore.Script = require('./lib/script');
cirruscore.Transaction = require('./lib/transaction');
cirruscore.URI = require('./lib/uri');
cirruscore.Unit = require('./lib/unit');

// dependencies, subject to change
cirruscore.deps = {};
cirruscore.deps.bnjs = require('bn.js');
cirruscore.deps.bs58 = require('bs58');
cirruscore.deps.Buffer = Buffer;
cirruscore.deps.elliptic = require('elliptic');
cirruscore.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
cirruscore.Transaction.sighash = require('./lib/transaction/sighash');
