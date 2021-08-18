import { IValidation } from '..';
const BitcoreStrax = require('bitcore-lib-strax');

export class StraxValidation implements IValidation {
  validateAddress(network: string, address: string): boolean {
    const Address = BitcoreStrax.Address;
    return Address.isValid(address, network);
  }

  validateUri(addressUri: string): boolean {
    // Check if the input is a valid uri or address
    const URICash = BitcoreStrax.URI;
    // Bip21 uri
    return URICash.isValid(addressUri);
  }
}
