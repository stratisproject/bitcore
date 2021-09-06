import { BitcoinBlockStorage } from '../../../models/block';
import { StratisStateProvider } from "../StratisStateProvider";

export class StraxStateProvider extends StratisStateProvider {
  constructor(chain: string = 'STRAX') {
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
        return ['ebe158d09325c470276619ebc5f7f87c98c0ed4b211c46a17a6457655811d082']; // Add STRAX genesis hash here
      }
      return locatorBlocks.map(block => block.hash);
    }
}
