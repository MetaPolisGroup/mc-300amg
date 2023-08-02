"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { CONSTANTS } from "@/constants";
import { MetaMaskWalletOptions } from "@rainbow-me/rainbowkit/dist/wallets/walletConnectors/metaMaskWallet/metaMaskWallet";
import { ThemeProvider } from "../context/change-mode";

// Walet connect
const { chains, publicClient } = configureChains(
  [CONSTANTS.CHAIN],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({
        projectId: "bd9d8fac308dbb3111f4f6027617462e",
        chains,
      } as MetaMaskWalletOptions),
    ],
  },
]);

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
    <ThemeProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
};

export default Provider;
