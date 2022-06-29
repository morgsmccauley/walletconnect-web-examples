import SolanaLib from '@/lib/SolanaLib'
import * as nearApiJs from 'near-api-js';

export let wallet1: any
export let nearWallets: Record<string, any>
export let nearAddresses: string[]

let address1: string
let address2: string

/**
 * Utilities
 */
export async function createOrRestoreNearWallet() {
  const secretKey1 = localStorage.getItem('nearlib:keystore:morepork.testnet:default')

  if (!secretKey1) {
    localStorage.setItem(
      'nearlib:keystore:morepork.testnet:default',
      ''
    )
  }

  const keyStore = new nearApiJs.keyStores.BrowserLocalStorageKeyStore(window.localStorage, 'nearlib:keystore:');
  const inMemorySigner = new nearApiJs.InMemorySigner(keyStore);

  const connection = nearApiJs.Connection.fromConfig({
      networkId: 'default',
      provider: { type: 'JsonRpcProvider', args: { url: 'https://rpc.nearprotocol.com' + '/' } },
      signer: inMemorySigner
  });

  nearWallets = {
    'morepork.testnet': new nearApiJs.Account(connection, 'morepork.testnet'),
  }

  nearAddresses = Object.keys(nearWallets)

  return {
    nearWallets,
    nearAddresses
  }
}
