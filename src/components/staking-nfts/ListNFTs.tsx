"use client";
import { isEmpty } from "lodash";
import LayoutItem from "./LayoutItem";
import React, { useEffect, useState } from "react";
import { CONSTANTS } from "@/constants";
import axios from "axios";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

export interface metadata {
  name: string;
  description: string;
  image: string;
  dna: string;
  edition: number;
  date?: number;
}

const ListNFTs = () => {
  const [NFTs, setNFTs] = useState<metadata[]>([]);
  const { address, isConnected } = useAccount();
  const nftContract = new ethers.Contract(
    CONSTANTS.ADDRESS.NFT,
    CONSTANTS.ABI.NFT,
    CONSTANTS.PROVIDER
  );

  const getNFTs = async () => {
    if (!isConnected || !address) {
      // if (false) {
      setNFTs([]);
    } else {
      const balanceOfUser = await nftContract.walletOfOwner(address);

      for (const tokenId of balanceOfUser) {
        // const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
        let tokenURI = (await nftContract.tokenURI(tokenId)).toString();

        // if (gatewayTools.containsCID(tokenURI).containsCid) {
        //   tokenURI = gatewayTools.convertToDesiredGateway(
        //     tokenURI,
        //     Constants.GATEWAY
        //   );
        // }
        try {
          const response = await axios.get<metadata>(
            tokenURI.replace("ipfs://", "https://myipfs.mypinata.cloud/ipfs/")
          );

          if (response) {
            // ipfs://[CID]/1.png

            const metadata: metadata = response.data;

            const imageUrl = metadata.image.replace(
              "ipfs://",
              "https://myipfs.mypinata.cloud/ipfs/"
            );

            const item: metadata = {
              date: metadata.date,
              image: imageUrl,
              description: metadata.description,
              edition: tokenId,
              dna: metadata.dna,
              name: metadata.name,
            };
            console.log(item);

            setNFTs((nfts) => [...nfts, item]);
          }
        } catch (error) {
          const item: metadata = {
            date: 1660416694432,
            image:
              "https://myipfs.mypinata.cloud/ipfs/bafybeicf2k4yqwp2kunqyn75v232wu6htvghjuwrg7qi2fbat6uw65wfqe/2111.png",
            description:
              "This is the NFT collection of the Manahubs Marketplace named - Guardians of the Galaxy",
            edition: tokenId,
            dna: "affd711ec5a942796ae44e2326a1eeb2a99131f8",
            name: `Guardians of the Galaxy #${tokenId}`,
          };

          setNFTs((nfts) => [...nfts, item]);
        }
      }
    }
  };

  useEffect(() => {
    getNFTs();
  }, [address]);

  if (isEmpty(NFTs))
    return (
      <div className="text-[#fff] ml-2 text-lg">
        Looks like you do not have any NFTs
      </div>
    );
  return (
    <div
      className="max-h-[800px] overflow-y-auto mx-[10px]"
      // className={clsx(styles.gameLayoutBody, styles.dashboardLayoutBody)}
    >
      {NFTs.map((items, index) => (
        <LayoutItem
          key={index}
          image={items.image}
          description={items.description}
          name={items.name}
          dna={items.dna}
          edition={items.edition}
        />
      ))}
    </div>
  );
};

export default ListNFTs;
