import { IValidation } from '..';
const BitcoreCirrus = require('bitcore-lib-cirrus');

export class CirrusValidation implements IValidation {
  validateAddress(network: string, address: string): boolean {
    const Address = BitcoreCirrus.Address;
    return Address.isValid(address, network);
  }

  validateUri(addressUri: string): boolean {
    // Check if the input is a valid uri or address
    const URICash = BitcoreCirrus.URI;
    // Bip21 uri
    return URICash.isValid(addressUri);
  }
}
