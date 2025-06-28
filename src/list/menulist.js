import { PARAMS_ROUTE } from "routes/routeurl";

export const profile_mnlst = (listenerBox) => {
  return [
    {
      label: "Home",
      link: {
        pathname: PARAMS_ROUTE.INDEX,
      },
      icon: "eva:home-fill",
    },
    { divider: true },
    {
      label: "Logout",
      icon: "ri:logout-circle-r-line",
      handler: listenerBox["logout"],
    },
  ];
};

export const staff_mnlst = (listenerBox) => {
  return [
    {
      label: "Edit Form",
      icon: "cuida:edit-outline",
      handler: listenerBox["edit"],
    },
  ];
};

export const alignPt_mnlst = (listenerBox) => {
  return [
    {
      label: "Move",
      icon: "icon-park-twotone:move",
      handler: listenerBox["move"],
    },
  ];
};
