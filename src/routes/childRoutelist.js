import OverViewPage from "pages/dashboard/overview";
import PatientsEnrollment from "pages/dashboard/patients/enroll";
import AlignPatient from "pages/dashboard/patients/align";
import AddStaff from "pages/dashboard/staff/enrollment/create";
import EditStaff from "pages/dashboard/staff/enrollment/edit";
import StaffManagePage from "pages/dashboard/staff/manage";
import PageNotFoundPage from "pages/other/PageNotFound";
import ConsultInitPage from "pages/patientBoard/consult";
import { DASHBOARD_ROUTE, PARAMS_ROUTE, PATIENT_ROUTE } from "./routeurl";
import FinancePage from "pages/dashboard/finance";

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
    path: DASHBOARD_ROUTE.STAFF.MANAGE + "/" + PARAMS_ROUTE.CREATE,
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
