const BitcoreLibStrax = require('bitcore-lib-strax');
import { AbstractBitcoreLibDeriver } from '../btc';
export class StraxDeriver extends AbstractBitcoreLibDeriver {
  bitcoreLib = BitcoreLibStrax;
}
