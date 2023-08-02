"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useAccount } from "wagmi";
import { getEllipsisTxt } from "@/utils/formmater-address";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { isEmpty } from "lodash";

interface IUser {
  user_address: string;
  ref: string;
  user_tree_belong: [];
  user_tree_commissions: string[];
  show: boolean;
}

const ReferralTreeBackup = () => {
  const { isConnected, address } = useAccount();
  const [isClient, setIsClient] = useState<boolean>(false);
  const [allTreeData, setAllTreeData] = useState<IUser[]>([]);
  const [nodeAddress, setNodeAddress] = useState<string>("");
  const [treesNode, setTreesNode] = useState<
    {
      address: string;
      children: IUser[];
    }[]
  >([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      getDataFileredByOnSnapshot(
        "users",
        [["user_tree_commissions", "array-contains", address]],
        (docs) => {
          setAllTreeData(docs as IUser[]);
        }
      );
      setTreesNode([]);
      setNodeAddress("");
    }
  }, [isConnected, address]);

  const showChildNodeHandler = (address: `0x${string}` | string) => {
    const childNode = allTreeData.filter((data) => data.ref === address);

    if (nodeAddress === address) {
      setNodeAddress("");
    } else if (!isEmpty(childNode)) {
      setNodeAddress(address);
    }

    let treeLevelObj = {};

    if (
      !isEmpty(treesNode) &&
      treesNode.some((node) => node.address === address)
    ) {
      return setTreesNode(
        treesNode.filter(
          (treeNode) =>
            !treeNode.children.some((child) =>
              child.user_tree_commissions.includes(address)
            )
        )
      );
    }

    if (
      !isEmpty(treesNode) &&
      treesNode?.some((node) =>
        node?.children?.some(
          (child) =>
            child.user_tree_commissions.length ==
            childNode?.[0]?.user_tree_commissions.length
        )
      )
    ) {
      const nodeSameLevel = treesNode.find((node) =>
        node.children.some(
          (child) =>
            child.user_tree_commissions.length ==
            childNode?.[0]?.user_tree_commissions.length
        )
      );

      const childNodeSameLevel = treesNode.filter((node) =>
        node.children.some((child) =>
          child.user_tree_commissions.includes(nodeSameLevel?.address!)
        )
      );

      return setTreesNode((prev) =>
        [...prev, { address, children: childNode }].filter((node) => {
          return !childNodeSameLevel.find(
            (childNode) => node.address === childNode.address
          );
        })
      );
    }

    if (isEmpty(childNode)) {
      // const sameLevelTreeInx = treesNode.findIndex((tree) =>
      //   tree.children.some((child) => child.user_address === address)
      // );

      // console.log(sameLevelTreeInx);

      // const sameLevelTree = treesNode.slice(sameLevelTreeInx + 1);

      // console.log(sameLevelTree);

      // return setTreesNode(sameLevelTree);
      return;
    }

    treeLevelObj = {
      address,
      children: childNode,
    };

    setTreesNode((prev: any) =>
      [...prev, treeLevelObj].filter((level) => !isEmpty(level.children))
    );
  };

  console.log({ treesNode });

  return (
    <div className="text-[--colors-secondary] p-3 border-2 border-[--colors-secondary] rounded-xl">
      <div>
        <div className="text-xl mb-8 md:text-3xl">Referral Tree</div>
      </div>

      {isClient && isConnected && (
        <div className="flex gap-3 w-full overflow-scroll">
          <div>
            <Button
              variant="success"
              className="rounded-2xl"
              onClick={() => {
                showChildNodeHandler(address!);
              }}
            >
              {getEllipsisTxt(address as `0x${string}`)}
            </Button>
          </div>
          {treesNode.map((level: any) => (
            <div
              className={`flex flex-col gap-3 ${
                nodeAddress === level.address
                  ? "rounded-2xl p-2 border-2 border-[--colors-primary]"
                  : ""
              }`}
              key={level.address}
            >
              {level?.children?.map((node: IUser) => (
                <Button
                  key={node.user_address}
                  className={`rounded-2xl ${
                    nodeAddress === node.user_address
                      ? "border-2 border-[--colors-primary]"
                      : ""
                  }`}
                  onClick={() => {
                    showChildNodeHandler(node.user_address!);
                  }}
                >
                  {getEllipsisTxt(node.user_address as `0x${string}`)}
                </Button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReferralTreeBackup;