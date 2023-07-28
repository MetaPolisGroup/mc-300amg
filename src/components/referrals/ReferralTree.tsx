"use client";
import { getEllipsisTxt } from "@/utils/formmater-address";
import React from "react";
import { useAccount } from "wagmi";
import Button from "../ui/Button";
const data = ["a"];
const ReferralTree = () => {
  const { address } = useAccount();
  const treeData = [
    {
      id: "A",
      children: [
        {
          id: "B",
          parent: "A",
          children: [
            { id: "B1", parent: "B", children: [] },
            { id: "B2", parent: "B", children: [] },
            { id: "B3", parent: "B", children: [] },
          ],
        },
        {
          id: "C",
          parent: "A",
          children: [
            { id: "C1", parent: "C", children: [] },
            { id: "C2", parent: "C", children: [] },
            { id: "C3", parent: "C", children: [] },
          ],
        },
        {
          id: "D",
          parent: "A",
          children: [
            { id: "D1", parent: "D", children: [] },
            { id: "D2", parent: "D", children: [] },
            { id: "D3", parent: "D", children: [] },
          ],
        },
      ],
    },
  ];

  const [visibleNodes, setVisibleNodes] = React.useState<any[]>([]);

  const handleToggleNode = (nodeId: number) => {
    if (visibleNodes.includes(nodeId)) {
      setVisibleNodes((prevVisibleNodes) =>
        prevVisibleNodes.filter((node) => node !== nodeId)
      );
    } else {
      setVisibleNodes((prevVisibleNodes) => [...prevVisibleNodes, nodeId]);
    }
  };
  const renderTreeNode = (node: any) => {
    console.log(node.parent && visibleNodes.includes(node.parent));
    return (
      <div key={node.id} className="flex relative">
        <div
          className={`w-12 h-12 rounded flex items-center justify-center border-2 border-black cursor-pointer m-2 ${
            visibleNodes.includes(node.id) ? " border border-green-400" : ""
          }`}
          onClick={() => handleToggleNode(node.id)}
        >
          {node.id}
        </div>
        {visibleNodes.includes(node.id) && node.children.length > 0 && (
          <div className="ml-4 flex flex-col">
            {node.children.map((childNode: any) => renderTreeNode(childNode))}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="text-white  p-3 border-2 border-[--colors-secondary] rounded-xl">
      <div>
        <div className="text-xl mb-8 md:text-3xl">Referral Tree</div>
        {/* <ButtonItem text="F1" /> */}
        <div>{treeData.map((rootNode) => renderTreeNode(rootNode))}</div>
      </div>
    </div>
  );
};

const ButtonItem: React.FC<{ text: string; handle?: () => void }> = ({
  handle,
  text,
}) => (
  <Button
    onClick={() => handle?.()}
    className="bg-gradient-to-r from-[--colors-lightBlueLeft] to-[--colors-lightBlueRight] text-center py-2 rounded-2xl"
  >
    {/* {getEllipsisTxt(address!, 6)} */}
    {text}
  </Button>
);
export default ReferralTree;
