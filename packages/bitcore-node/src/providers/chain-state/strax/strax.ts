import { InternalStateProvider } from '../internal/internal';

export class StraxStateProvider extends InternalStateProvider {
  constructor(chain: string = 'STRAX') {
    super(chain);
  }
}
