import { Tool } from "langchain/tools";
import { balanceCommand } from "../../../components/commands/balance/command";
import { chainContext } from "../utils";

export class BalanceTool extends Tool {
    name = "balance";
    description = `
Use the balance tool to lookup the balance of some cryptocurrency or token, i.e. ETH, OP, USDC etc., for a specific wallet address or ENS name and blockchain.
${chainContext}
Please provide the input to the tool as a JSON object containing address (string), chainId (number) & tokenSymbol (string).
    `;
    returnDirect = true;
    async _call(arg: string) {
      const { address, chainId, tokenSymbol } = JSON.parse(arg);
      return JSON.stringify({
        command: balanceCommand.command,
        args: {
          address,
          symbol: tokenSymbol,
          chain: chainId,
        }
      });
    }
}