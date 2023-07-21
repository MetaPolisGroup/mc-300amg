import { Icons } from "@/components/Icons";

const renderDotTemplate = (css: string) => {
  return <span className={`!w-[8px] !h-[8px] rounded-full ${css}`} />;
};

const renderStatusTemplate = (title: string, color: string) => {
  return (
    <div
      className={`font-bold px-2 py-1 !border-2 !border-solid rounded-2xl border-[${color}] text-[${color}]`}
      style={{ borderColor: `var(${color})` }}
    >
      {title}
    </div>
  );
};

const cssDot = "text-[--colors-textSubtle]";

const NAV_HEADER = [
  {
    id: "TRADE",
    title: () => "Trade",
    link: "/",
    renderDot: () => {
      return renderDotTemplate("bg-[--colors-success]");
    },
    items: [
      {
        title: "Swap",
        link: "/",
        subContent: () => null,
      },
      {
        title: "Liquidity",
        link: "/",
        subContent: () => null,
      },
      {
        title: "Perpetual",
        link: "/",
        subContent: () => <Icons.LogOut />,
      },
      {
        title: "Bridge",
        link: "/",
        subContent: () => <Icons.LogOut />,
      },
      {
        title: "Limit (V2)",
        link: "/",
        subContent: () => null,
      },
      {
        title: "Buy Crypto",
        link: "/",
        subContent: () => renderStatusTemplate("NEW", "--colors-success"),
      },
    ],
  },
  {
    id: "EARN",
    title: () => "Earn",
    link: "/",
    renderDot: () => {
      return null;
    },
    items: [
      {
        title: "Farms",
        link: "/",
        subContent: () => null,
      },
      {
        title: "Pools",
        link: "/",
        subContent: () => null,
      },
      {
        title: "Liquid Staking",
        link: "/",
        subContent: () => null,
      },
    ],
  },
  {
    id: "WIN",
    title: () => "Win",
    link: "/",
    renderDot: () => {
      return renderDotTemplate("bg-[--colors-failure]");
    },
    items: [
      {
        title: "Trading Reward",
        link: "/",
        subContent: () => renderStatusTemplate("LIVE", "--colors-failure"),
      },
      {
        title: "Trading Competition",
        link: "/",
        subContent: () => null,
      },
      {
        title: "Prediction (BETA)",
        link: "/",
        subContent: () => null,
      },
      {
        title: "Lottery",
        link: "/",
        subContent: () => null,
      },
      {
        title: "Pottery (BETA)",
        link: "/",
        subContent: () => null,
      },
    ],
  },
  {
    id: "NFT",
    title: () => "NFT",
    link: "/",
    renderDot: () => {
      return null;
    },
    items: [
      {
        title: "Overview",
        link: "/",
        subContent: () => null,
      },
      {
        title: "Collections",
        link: "/",
        subContent: () => null,
      },
      {
        title: "Activity",
        link: "/",
        subContent: () => null,
      },
    ],
  },
  {
    id: "GAME",
    title: () => "Game",
    link: "/",
    renderDot: () => {
      return renderDotTemplate("bg-[--colors-success]");
    },
    items: [
      {
        title: "Pancake Protectors",
        link: "/",
        subContent: () => <Icons.LogOut />,
      },
    ],
  },
  {
    id: "MORE",
    title: () => (
      <div className="relative w-[21px]">
        <div className="absolute top-[-14px] text-2xl h-4 flex items-center leading-none">
          ...
        </div>
      </div>
    ),
    link: "/",
    renderDot: () => {
      return renderDotTemplate("bg-[--colors-warning]");
    },
    items: [
      {
        title: "Info",
        link: "/",
        subContent: () => null,
      },
      {
        title: "IFO",
        link: "/",
        subContent: () => null,
      },
      {
        title: "Affiliate Program",
        link: "/",
        subContent: () => null,
      },
      {
        title: "Voting",
        link: "/",
        subContent: () => renderStatusTemplate("SOON", "--colors-warning"),
      },
      {
        title: "Leaderboard",
        link: "/",
        subContent: () => null,
      },
      {
        title: "Blog",
        link: "/",
        subContent: () => <Icons.LogOut />,
      },
      {
        title: "Docs",
        link: "/",
        subContent: () => <Icons.LogOut />,
      },
    ],
  },
];

export const NAV_SUB_HEADER = [
  {
    id: "SubMenu1",
    title: "Trading Reward",
  },
  {
    id: "SubMenu2",
    title: "Trading Competition",
  },
  {
    id: "SubMenu3",
    title: "Prediction (BETA)",
  },
  {
    id: "SubMenu4",
    title: "Lottery",
  },
  {
    id: "SubMenu5",
    title: "Pottery (BETA)",
  },
];

export default NAV_HEADER;
