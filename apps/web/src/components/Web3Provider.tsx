import { WagmiConfig, createClient, configureChains } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import Web3AuthConnectorInstance from "../index";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, arbitrum, polygon],
  [publicProvider()]
);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [Web3AuthConnectorInstance(chains)],
  provider,
  webSocketProvider,
});

const Web3Provider = ({ children }: PropsWithChildren<unknown>) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};

export default Web3Provider;
