'use strict';

var straxcore = module.exports;

// module information
straxcore.version = 'v' + require('./package.json').version;
straxcore.versionGuard = function(version) {
  if (version !== undefined) {
    var message = 'More than one instance of bitcore-lib-strax found. ' +
      'Please make sure to require bitcore-lib-strax and check that submodules do' +
      ' not also include their own bitcore-lib-strax dependency.';
    throw new Error(message);
  }
};
straxcore.versionGuard(global._straxcore);
global._straxcore = straxcore.version;

// crypto
straxcore.crypto = {};
straxcore.crypto.BN = require('./lib/crypto/bn');
straxcore.crypto.ECDSA = require('./lib/crypto/ecdsa');
straxcore.crypto.Hash = require('./lib/crypto/hash');
straxcore.crypto.Random = require('./lib/crypto/random');
straxcore.crypto.Point = require('./lib/crypto/point');
straxcore.crypto.Signature = require('./lib/crypto/signature');

// encoding
straxcore.encoding = {};
straxcore.encoding.Base58 = require('./lib/encoding/base58');
straxcore.encoding.Base58Check = require('./lib/encoding/base58check');
straxcore.encoding.BufferReader = require('./lib/encoding/bufferreader');
straxcore.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
straxcore.encoding.Varint = require('./lib/encoding/varint');

// utilities
straxcore.util = {};
straxcore.util.buffer = require('./lib/util/buffer');
straxcore.util.js = require('./lib/util/js');
straxcore.util.preconditions = require('./lib/util/preconditions');

// errors thrown by the library
straxcore.errors = require('./lib/errors');

// main bitcoin library
straxcore.Address = require('./lib/address');
straxcore.Block = require('./lib/block');
straxcore.MerkleBlock = require('./lib/block/merkleblock');
straxcore.BlockHeader = require('./lib/block/blockheader');
straxcore.HDPrivateKey = require('./lib/hdprivatekey.js');
straxcore.HDPublicKey = require('./lib/hdpublickey.js');
straxcore.Message = require('./lib/message');
straxcore.Networks = require('./lib/networks');
straxcore.Opcode = require('./lib/opcode');
straxcore.PrivateKey = require('./lib/privatekey');
straxcore.PublicKey = require('./lib/publickey');
straxcore.Script = require('./lib/script');
straxcore.Transaction = require('./lib/transaction');
straxcore.URI = require('./lib/uri');
straxcore.Unit = require('./lib/unit');

// dependencies, subject to change
straxcore.deps = {};
straxcore.deps.bnjs = require('bn.js');
straxcore.deps.bs58 = require('bs58');
straxcore.deps.Buffer = Buffer;
straxcore.deps.elliptic = require('elliptic');
straxcore.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
straxcore.Transaction.sighash = require('./lib/transaction/sighash');
