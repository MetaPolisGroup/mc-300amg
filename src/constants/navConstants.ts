const NAV_HEADER = [
  {
    id: "TRADE",
    title: "Trade",
    link: "/",
    renderDot: "bg-[--colors-success]",
    items: [
      {
        title: "Swap",
        link: "/",
      },
      {
        title: "Liquidity",
        link: "/",
      },
      {
        title: "Perpetual",
        link: "/",
      },
      {
        title: "Bridge",
        link: "/",
      },
      {
        title: "Limit (V2)",
        link: "/",
      },
      {
        title: "Buy Crypto",
        link: "/",
        subContent: { text: "NEW", color: "--colors-success" },
      },
    ],
  },
  {
    id: "EARN",
    title: "Earn",
    link: "/",
    renderDot: null,
    items: [
      {
        title: "Farms",
        link: "/",
      },
      {
        title: "Pools",
        link: "/",
      },
      {
        title: "Liquid Staking",
        link: "/",
      },
    ],
  },
  {
    id: "WIN",
    title: "Win",
    link: "/",
    renderDot: "bg-[--colors-failure]",
    items: [
      {
        title: "Trading Reward",
        link: "/",
        subContent: { text: "LIVE", color: "--colors-failure" },
      },
      {
        title: "Trading Competition",
        link: "/",
      },
      {
        title: "Prediction (BETA)",
        link: "/",
      },
      {
        title: "Lottery",
        link: "/",
      },
      {
        title: "Pottery (BETA)",
        link: "/",
      },
    ],
  },
  {
    id: "NFT",
    title: "NFT",
    link: "/",
    renderDot: null,
    items: [
      {
        title: "Overview",
        link: "/",
      },
      {
        title: "Collections",
        link: "/",
      },
      {
        title: "Activity",
        link: "/",
      },
    ],
  },
  {
    id: "GAME",
    title: "Game",
    link: "/",
    renderDot: "bg-[--colors-success]",
    items: [
      {
        title: "Pancake Protectors",
        link: "/",
      },
    ],
  },
  {
    id: "MORE",
    title: "MORE",
    link: "/",
    renderDot: "bg-[--colors-warning]",
    items: [
      {
        title: "Info",
        link: "/",
      },
      {
        title: "IFO",
        link: "/",
        subContent: { text: "SOON", color: "--colors-warning" },
      },
      {
        title: "Affiliate Program",
        link: "/",
      },
      {
        title: "Voting",
        link: "/",
      },
      {
        title: "Leaderboard",
        link: "/",
      },
      {
        title: "Blog",
        link: "/",
      },
      {
        title: "Docs",
        link: "/",
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
