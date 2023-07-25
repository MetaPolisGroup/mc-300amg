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
        title: "Prediction (BETA)",
        link: "/",
      },
      {
        title: "Prediction (BETA)",
        link: "/dice",
        subContent: { text: "Dice", color: "--colors-failure" },
      },

      {
        title: "Trading Competition",
        link: "/",
      },
      {
        title: "Trading Reward",
        link: "/",
        subContent: { text: "LIVE", color: "--colors-failure" },
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
    title: "Prediction (BETA)",
    ref: "/",
  },
  {
    id: "SubMenu2",
    title: "Dice",
    ref: "/dice",
  },
  {
    id: "SubMenu3",
    title: "Trading Competition",
    ref: "/",
  },
  {
    id: "SubMenu4",
    title: "Trading Reward ",
    ref: "/",
  },
  {
    id: "SubMenu5",
    title: "Lottery",
    ref: "/",
  },
  {
    id: "SubMenu6",
    title: "Pottery (BETA)",
    ref: "/",
  },
];

export default NAV_HEADER;
