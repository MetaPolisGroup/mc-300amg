"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { CONSTANTS } from "@/constants";

// Walet connect
const { chains, publicClient } = configureChains(
  [CONSTANTS.CHAIN],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Provider;
