import { BitcoinBlockStorage } from '../../../models/block';
import { StratisStateProvider } from '../StratisStateProvider';

export class CirrusStateProvider extends StratisStateProvider {
  constructor(chain: string = 'CRS') {
    super(chain);
  }

  /**
   * Get a series of hashes that come before a given height, or the 30 most recent hashes
   *
   * @returns Array<string>
   */
   async getLocatorHashes(params) {
    const { chain, network, startHeight, endHeight } = params;
    const query =
      startHeight && endHeight
        ? {
            processed: true,
            chain,
            network,
            height: { $gt: startHeight, $lt: endHeight }
          }
        : {
            processed: true,
            chain,
            network
          };
    const locatorBlocks = await BitcoinBlockStorage.collection
      .find(query, { sort: { height: -1 }, limit: 30 })
      .addCursorFlag('noCursorTimeout', true)
      .toArray();
    if (locatorBlocks.length < 2) {
      return network == 'mainnet' 
        ? ['000005769503496300ec879afd7543dc9f86d3b3d679950b2b83e2f49f525856'] // Add CIRRUS genesis hash here
        : ['0000af9ab2c8660481328d0444cf167dfd31f24ca2dbba8e5e963a2434cffa93'];
    }
    return locatorBlocks.map(block => block.hash);
  }  
}
