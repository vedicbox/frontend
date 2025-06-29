import { DASHBOARD_ROUTE } from "routes/routeurl";

export const dashboard_navigation = () => {
  return [
    {
      name: "Dashboard",
      index: true,
      path: DASHBOARD_ROUTE.INDEX,
      icon: "ic:round-dashboard",
    },
    {
      name: "Patients",
      icon: "covid:covid19-virus-patient-2",
      children: [
        {
          name: "Align",
          icon: "streamline-pixel:interface-essential-waiting-hourglass-loading",
          path: DASHBOARD_ROUTE.PATIENT.ALIGN,
        },
      ],
    },
    {
      name: "Staff",
      icon: "fluent:people-team-20-regular",
      children: [
        {
          name: "Management",
          icon: "carbon:id-management",
          path: DASHBOARD_ROUTE.STAFF.MANAGE,
        },
      ],
    },
    {
      name: "Finance",
      icon: "material-symbols:finance-sharp",
      children: [
        {
          name: "Board",
          icon: "logos:gitboard",
          path: DASHBOARD_ROUTE.FINANCE.BOARD,
        },
      ],
    },
    {
      name: "Master",
      icon: "hugeicons:master-card",
      children: [
        {
          name: "Roles",
          icon: "eos-icons:role-binding-outlined",
          path: DASHBOARD_ROUTE.MASTER.ROLES,
        },
      ],
    },
  ];
};

