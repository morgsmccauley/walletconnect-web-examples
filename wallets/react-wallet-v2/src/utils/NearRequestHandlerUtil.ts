import BN from 'bn.js';
import { NEAR_SIGNING_METHODS } from '@/data/NearData'
import { getWalletAddressFromParams } from '@/utils/HelperUtil'
import { nearAddresses, nearWallets } from '@/utils/NearWalletUtil'
import { formatJsonRpcError, formatJsonRpcResult } from '@json-rpc-tools/utils'
import { SignClientTypes } from '@walletconnect/types'
import { ERROR } from '@walletconnect/utils'
import { deployContract, functionCall } from 'near-api-js/lib/transaction'

export async function approveNearRequest(
  requestEvent: SignClientTypes.EventArguments['session_request']
) {
  const { params, id } = requestEvent
  const { request } = params
  const wallet = nearWallets[getWalletAddressFromParams(nearAddresses, params)]

  switch (request.method) {
    case NEAR_SIGNING_METHODS.NEAR_SIGN_IN:
      return formatJsonRpcResult(id, {});

    case NEAR_SIGNING_METHODS.NEAR_SIGN_TRANSACTION:
      console.log(request);

      const tx = await wallet.signAndSendTransaction({
          receiverId: request.params.transaction.receiverId,
          actions: request.params.transaction.actions.map((action: any) => {
            switch (action.type) {
              case 'FunctionCall':
                const { methodName, args, gas, deposit } = action.params;
                return functionCall(
                  methodName,
                  args,
                  new BN(gas),
                  new BN(deposit)
                );
              case 'DeployContract':
                const { code } = action.params;
                return deployContract(
                  new Uint8Array(Object.values(code))
                );
              default:
                throw new Error('not implemented');
            }
          })
      });

      return formatJsonRpcResult(id, tx)

    default:
      throw new Error(ERROR.UNKNOWN_JSONRPC_METHOD.format().message)
  }
}

export function rejectNearRequest(request: SignClientTypes.EventArguments['session_request']) {
  const { id } = request

  return formatJsonRpcError(id, ERROR.JSONRPC_REQUEST_METHOD_REJECTED.format().message)
}
