"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  trustWallet,
  rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { CONSTANTS } from "@/constants";
import { MetaMaskWalletOptions } from "@rainbow-me/rainbowkit/dist/wallets/walletConnectors/metaMaskWallet/metaMaskWallet";
import { ThemeProvider } from "../context/change-mode";
import { store } from "@/redux/store";
import { Provider as ProviderRedux } from "react-redux";
import { TrustWalletOptions } from "@rainbow-me/rainbowkit/dist/wallets/walletConnectors/trustWallet/trustWallet";

// Walet connect
const { chains, publicClient } = configureChains(
  [CONSTANTS.CHAIN],
  [publicProvider()]
);

// const connectors = connectorsForWallets([
//   {
//     groupName: "Recommended",
//     wallets: [
//       metaMaskWallet({
//         projectId: "bd9d8fac308dbb3111f4f6027617462e",
//         chains,
//       } as MetaMaskWalletOptions),

//       trustWallet({
//         projectId: "7a8d1dd7222aa046c6766da9c1ba436a",
//         chains,
//       } as TrustWalletOptions),

//       rainbowWallet({
//         projectId: "7a8d1dd7222aa046c6766da9c1ba436a",
//         chains,
//       } as TrustWalletOptions),
//     ],
//   },
// ]);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
});

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ProviderRedux store={store}>
      <ThemeProvider>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
          </RainbowKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </ProviderRedux>
  );
};

export default Provider;
