import FinancePage from "pages/dashboard/finance";
import OverViewPage from "pages/dashboard/overview";
import AlignPatient from "pages/dashboard/patients/align";
import PatientsEnrollment from "pages/dashboard/patients/enroll";
import AddStaff from "pages/dashboard/staff/enrollment/create";
import EditStaff from "pages/dashboard/staff/enrollment/update";
import StaffManagePage from "pages/dashboard/staff/manage";
import PageNotFoundPage from "pages/other/PageNotFound";
import ConsultInitPage from "pages/patientBoard/consult";
import MasterRolePage from "pages/dashboard/master/roles";

import { DASHBOARD_ROUTE, PARAMS_ROUTE, PATIENT_ROUTE } from "./routeurl";

export const dashboard_crl = [
  {
    path: DASHBOARD_ROUTE.INDEX,
    element: <OverViewPage />,
  },
  {
    path: DASHBOARD_ROUTE.STAFF.MANAGE,
    element: <StaffManagePage />,
  },
  {
    path: DASHBOARD_ROUTE.STAFF.MANAGE + "/" + PARAMS_ROUTE.ENROLL,
    element: <AddStaff />,
  },
  {
    path: DASHBOARD_ROUTE.STAFF.MANAGE + "/" + PARAMS_ROUTE.EDIT,
    element: <EditStaff />,
  },
  {
    path: DASHBOARD_ROUTE.PATIENT.ALIGN + "/" + PARAMS_ROUTE.WILD_CARD,
    element: <AlignPatient />,
  },
  {
    path: DASHBOARD_ROUTE.PATIENT.ENROLL,
    element: <PatientsEnrollment />,
  },
  {
    path: DASHBOARD_ROUTE.FINANCE.BOARD,
    element: <FinancePage />,
  },
  {
    path: DASHBOARD_ROUTE.MASTER.ROLES + "/" + PARAMS_ROUTE.WILD_CARD,
    element: <MasterRolePage />,
  },
  {
    path: PARAMS_ROUTE.WILD_CARD,
    element: <PageNotFoundPage />,
  },
];

export const patientboard_crl = [
  {
    path: PATIENT_ROUTE.CONSULT,
    element: <ConsultInitPage />,
  },
];
