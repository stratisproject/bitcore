const BitcoreLibCirrus = require('bitcore-lib-cirrus');
import { AbstractBitcoreLibDeriver } from '../btc';
export class CirrusDeriver extends AbstractBitcoreLibDeriver {
  bitcoreLib = BitcoreLibCirrus;
}
