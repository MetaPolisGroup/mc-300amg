const NAV_HEADER = [
  {
    id: "GAME",
    title: "Game",
    link: "/",
    // renderDot: "bg-[--colors-success]",
    items: [
      {
        title: "BO",
        link: "/prediction",
      },
      {
        title: "Dice",
        link: "/",
      },
      {
        title: "Mark Zuckerberg vs. Elon Musk",
        link: "/",
      },
      {
        title: "American Election",
        link: "/",
      },
      {
        title: "Socer",
        link: "/",
      },
    ],
  },
  {
    id: "LEADERBOARD",
    title: "Leaderboard",
    link: "/prediction/leaderboard",
    // renderDot: "bg-[--colors-success]",
    items: [],
  },
  {
    id: "STAKING",
    title: "Staking",
    link: "/staking",
    // renderDot: "bg-[--colors-success]",
    items: [],
  },
  {
    id: "REFERRALS",
    title: "Referrals",
    link: "/referrals",
    // renderDot: "bg-[--colors-success]",
    items: [],
  },
  // {
  //   id: "MORE",
  //   title: "MORE",
  //   link: "/",
  //   renderDot: "bg-[--colors-warning]",
  //   items: [
  //     {
  //       title: "Info",
  //       link: "/",
  //     },
  //     {
  //       title: "IFO",
  //       link: "/",
  //       subContent: { text: "SOON", color: "--colors-warning" },
  //     },
  //     {
  //       title: "Affiliate Program",
  //       link: "/",
  //     },
  //     {
  //       title: "Voting",
  //       link: "/",
  //     },
  //     {
  //       title: "Leaderboard",
  //       link: "/",
  //     },
  //     {
  //       title: "Blog",
  //       link: "/",
  //     },
  //     {
  //       title: "Docs",
  //       link: "/",
  //     },
  //   ],
  // },
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
