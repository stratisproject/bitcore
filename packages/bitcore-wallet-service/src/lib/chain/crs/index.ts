import * as async from 'async';
import { BitcoreLibCirrus } from 'crypto-wallet-core';
import _ from 'lodash';
import { IChain, INotificationData } from '..';
import { ClientError } from '../../errors/clienterror';
import logger from '../../logger';
import { TxProposal } from '../../model';
import { BtcChain } from '../btc';
const $ = require('preconditions').singleton();
const Common = require('../../common');
const Constants = Common.Constants;
const Utils = Common.Utils;
const Defaults = Common.Defaults;
const Errors = require('../../errors/errordefinitions');
const config = require('../../../config');

export class CirrusChain extends BtcChain implements IChain {
  protected sizeEstimationMargin: number;
  protected inputSizeEstimationMargin: number;

  constructor(private bitcoreLibCirrus = BitcoreLibCirrus) {
    super(bitcoreLibCirrus);
    this.sizeEstimationMargin = config.s?.sizeEstimationMargin ?? 0.01;
    this.inputSizeEstimationMargin = config.btc?.inputSizeEstimationMargin ?? 2;
  }

  checkDust(output) {}

  checkValidTxAmount(output): boolean {
    if (!_.isNumber(output.amount) || _.isNaN(output.amount) || output.amount < 0) {
      return false;
    }
    return true;
  }

  isSingleAddress() {
    return true;
  }

  getFee(server, wallet, opts) {
    return new Promise(resolve => {
      
      server._getFeePerKb(wallet, opts, (err, feePerKb) => {

        if (opts.gasPrice && opts.gasLimit) {
          let fee = opts.gasPrice * opts.gasLimit;
          return resolve({ feePerKb, gasPrice: opts.gasPrice, gasLimit: opts.gasLimit });
        }

        return resolve({ feePerKb });
      });
    });
  }
}
