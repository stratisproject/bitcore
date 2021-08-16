import { InternalStateProvider } from '../internal/internal';

export class CirrusStateProvider extends InternalStateProvider {
  constructor(chain: string = 'CRS') {
    super(chain);
  }
}
