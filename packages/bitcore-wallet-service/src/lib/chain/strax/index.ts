import * as async from 'async';
import { BitcoreLibStrax } from 'crypto-wallet-core';
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

export class StraxChain extends BtcChain implements IChain {
  protected sizeEstimationMargin: number;
  protected inputSizeEstimationMargin: number;

  constructor(private bitcoreLibStrax = BitcoreLibStrax) {
    super(bitcoreLibStrax);
    this.sizeEstimationMargin = config.btc?.sizeEstimationMargin ?? 0.01;
    this.inputSizeEstimationMargin = config.btc?.inputSizeEstimationMargin ?? 2;
  }
}
