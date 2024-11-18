import './marshal.js';
import { mw } from './middleware.js';
import type { Signer } from './signer.js';

export * from './address.js';
export { Any } from './encoding/protobuf/any.js';
export * from './connection.js';
export * from './constants.js';
export * from './networks.js';
export * as signals from './signals.js';
export * from './signer.js';
export * from './types.js';

const wallets: Signer[] = [];

export default {
  use: mw.use,
  wallets,
};
