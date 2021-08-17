import { BaseModule } from '..';
import { CirrusStateProvider } from '../../providers/chain-state/cirrus/cirrus';
import { VerificationPeer } from '../bitcoin/VerificationPeer';
import { CirrusP2PWorker } from './p2p';

export default class CirrusModule extends BaseModule {
  constructor(services: BaseModule['bitcoreServices']) {
    super(services);
    services.Libs.register('CRS', 'bitcore-lib-cirrus', 'bitcore-p2p');
    services.P2P.register('CRS', CirrusP2PWorker);
    services.CSP.registerService('CRS', new CirrusStateProvider());
    services.Verification.register('CRS', VerificationPeer);
  }
}
