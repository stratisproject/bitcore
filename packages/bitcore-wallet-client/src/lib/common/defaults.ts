'use strict';
export const Defaults = {
  DEFAULT_FEE_PER_KB: 10000,
  MIN_FEE_PER_KB: 0,
  MAX_FEE_PER_KB: 1000000,
  MAX_TX_FEE(coin) {
    switch (coin) {
      case 'btc':
        return 0.5e8;
      case 'doge':
        return 400e8;
      case 'crs':
        return 50 * 1e8; // TODO: Check this differently for CRS. Due to gas the fees can be quite high, up to 250k (gas limit max) * 10000 (gas price max) sats + 1 sat for the base tx fee
      default:
        return 1e8;
    }
  }
};
