"use client";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import React from "react";
import { useAccount } from "wagmi";
import Button from "../ui/Button";

const ReferralTree = () => {
  const { address } = useAccount();
  const [visibleNodes, setVisibleNodes] = React.useState<any[]>([]);
  const [child, setChild] = React.useState<string[]>([]);
  const [data, setData] = React.useState<string[]>([]);

  const handleGetData = (id: string) => {
    return getDataFileredByOnSnapshot(
      "users",
      [["user_tree_commissions", "array-contains", id]],
      (docs) => {
        setData(
          docs
            .filter((i) => i.user_tree_belong[0] === id)
            .map((i) => i) as unknown as string[]
        );
      }
    );
  };

  const handleToggleNode = (nodeId: string, isSubTree: boolean) => {
    console.log(nodeId);

    getDataFileredByOnSnapshot(
      "users",
      [["user_tree_commissions", "array-contains", nodeId]],
      (docs) => {
        if (isSubTree)
          setChild(
            docs
              .filter((i) => i.user_tree_belong[0] === nodeId)
              .map((i) => i) as unknown as string[]
          );
        else
          setVisibleNodes(
            docs
              .filter((i) => i.user_tree_belong[0] === nodeId)
              .map((i) => i) as unknown as string[]
          );
      }
    );
  };

  const renderTreeNode = (
    node: any,
    isSubTree: boolean,
    isDisnable?: boolean
  ) => {
    return (
      <div key={node.id} className="flex relative">
        <div
          className={`w-12 h-12 rounded flex items-center justify-center border-2 border-black cursor-pointer m-2 ${
            visibleNodes.includes(node.id) ? " border border-green-400" : ""
          }`}
          onClick={() => handleToggleNode(node.id, isSubTree)}
        >
          {node.id && <ButtonItem text={`${node.id}`} disnable={isDisnable} />}
        </div>
      </div>
    );
  };

  return (
    <div className="text-white  p-3 border-2 border-[--colors-secondary] rounded-xl">
      <div>
        <div className="text-xl mb-8 md:text-3xl">Referral Tree</div>
        <div className="grid justify-self-center grid-cols-4 gap-5">
          <div className="mt-[10px]">
            <ButtonItem text="Root" handle={() => handleGetData(address!)} />
          </div>
          {data && (
            <div className="block mx-auto px-5 h-[500px] overflow-y-scroll ">
              {data.map((rootNode) => renderTreeNode(rootNode, false))}
            </div>
          )}
          {visibleNodes && (
            <div className="ml-4 block mx-auto px-5 h-[500px] overflow-y-scroll  ">
              {visibleNodes.map((childNode: any) =>
                renderTreeNode(childNode, true)
              )}
            </div>
          )}
          {child && (
            <div className="ml-4 block mx-auto px-5 h-[500px] overflow-y-scroll  ">
              {child.map((childNode: any) =>
                renderTreeNode(childNode, true, true)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ButtonItem: React.FC<{
  text: string;
  handle?: () => void;
  disnable?: boolean;
}> = ({ handle, text, disnable }) => (
  <Button
    disabled={disnable}
    onClick={() => handle?.()}
    className="bg-gradient-to-r from-[#00CEEA] to-[#28C38B] text-center py-2 rounded-2xl w-[264px] h-[60px]"
  >
    {text}
  </Button>
);
export default ReferralTree;
