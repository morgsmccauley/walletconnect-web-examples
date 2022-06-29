/**
 * Types
 */
export type TNearChain = keyof typeof NEAR_CHAINS

/**
 * Chains
 */
export const NEAR_TEST_CHAINS = {
  'near:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K': {
    chainId: '8E9rvCKLFQia2Y35HXjjpWzj8weVo44K',
    name: 'NEAR testnet',
    logo: '/chain-logos/NEAR-4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ.png',
    rgb: '30, 240, 166',
    rpc: ''
  }
}

export const NEAR_CHAINS = { ...NEAR_TEST_CHAINS }

/**
 * Methods
 */
export const NEAR_SIGNING_METHODS = {
  NEAR_SIGN_TRANSACTION: 'near_signAndSendTransaction',
  NEAR_SIGN_IN: 'near_signIn',
}
