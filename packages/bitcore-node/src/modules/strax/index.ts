import { BaseModule } from '..';
import { StraxStateProvider } from '../../providers/chain-state/strax/strax';
import { StraxP2PWorker } from './p2p';
import { VerificationPeer } from './VerificationPeer';

export default class StraxModule extends BaseModule {
  constructor(services: BaseModule['bitcoreServices']) {
    super(services);
    services.Libs.register('STRAX', 'bitcore-lib-strax', 'bitcore-p2p');
    services.P2P.register('STRAX', StraxP2PWorker);
    services.CSP.registerService('STRAX', new StraxStateProvider());
    services.Verification.register('STRAX', VerificationPeer);
  }
}
