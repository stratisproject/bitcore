import * as _ from 'lodash';
import { cpus, homedir } from 'os';
import { ConfigType } from './types/Config';
import parseArgv from './utils/parseArgv';
let program = parseArgv([], ['config']);

function findConfig(): ConfigType | undefined {
  let foundConfig;
  const envConfigPath = process.env.BITCORE_CONFIG_PATH;
  const argConfigPath = program.config;
  const configFileName = 'bitcore.config.json';
  let bitcoreConfigPaths = [
    `${homedir()}/${configFileName}`,
    `../../../../${configFileName}`,
    `../../${configFileName}`
  ];

  const overrideConfig = argConfigPath || envConfigPath;

  // Override config replaces all other config paths.
  if (overrideConfig) {
    bitcoreConfigPaths = [overrideConfig];
  }

  // No config specified. Search home, bitcore and cur directory
  for (let path of bitcoreConfigPaths) {
    if (!foundConfig) {
      try {
        const expanded = path[0] === '~' ? path.replace('~', homedir()) : path;
        const bitcoreConfig = require(expanded) as { bitcoreNode: ConfigType };
        foundConfig = bitcoreConfig;
      } catch (e) {
        foundConfig = undefined;
      }
    }
  }
  return foundConfig;
}

const Config = function(): ConfigType {
  let baseConfig: ConfigType = {
    maxPoolSize: 50,
    port: 3000,
    dbUrl: '', // Note: overrides all other DB connection strings.
    dbHost: '127.0.0.1',
    dbName: 'bitcore',
    dbPort: '27017',
    dbUser: '',
    dbPass: '',
    numWorkers: cpus().length,
    chains: {},
    modules: ['./bitcoin', './bitcoin-cash', './ethereum', './strax', './cirrus'],
    services: {
      api: {
        rateLimiter: {
          disabled: false,
          whitelist: ['::ffff:127.0.0.1', '::1']
        },
        wallets: {
          allowCreationBeforeCompleteSync: false,
          allowUnauthenticatedCalls: false
        }
      },
      event: {
        onlyWalletEvents: false
      },
      p2p: {},
      socket: {
        bwsKeys: []
      },
      storage: {}
    }
  };

  // Search for a config file.
  let foundConfig = findConfig();

  if (foundConfig == undefined) {
    throw new Error("No config file defined!");
  }

  // Merge the found config with the base config because often we only want to define the chains and DB URL in the config.
  const mergeCopyArray = (objVal, srcVal) => (objVal instanceof Array ? srcVal : undefined);

  baseConfig = _.mergeWith(baseConfig, foundConfig, mergeCopyArray);
  
  return baseConfig;
};

export default Config();
