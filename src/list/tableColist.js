export const DASHBOARD_HEADER = {
  STAFF: {
    MANAGE: [
      {
        label: "First Name",
        picker: "userRef.firstName",
      },
      {
        label: "Last Name",
        picker: "userRef.lastName",
      },
      {
        label: "Email",
        picker: "userRef.email",
      },
      {
        label: "Phone No",
        picker: "phoneNo",
      },
      {
        label: "Gender",
        picker: "gender",
      },
      {
        label: "Role",
        picker: "userRef.roleRef.name",
      },
      {
        label: "Created Dt",
        picker: "createdAt",
      },
      {
        label: "Action",
        action: true,
        cellProps: {
          align: "right",
        },
      },
    ],
  },
  PATIENTS: {
    ALIGN: [
      {
        label: "Patient Name",
        picker: "patientName",
      },
      {
        label: "Phone No",
        picker: "phoneNo",
      },
      {
        label: "Doctor Name",
        picker: "doctorName",
      },
      {
        label: "Status",
        picker: "status",
      },
      {
        label: "Fee",
        picker: "fee",
      },
            {
        label: "Pay Mode",
        picker: "payTag",
      },
      {
        label: "Action",
        action: true,
        cellProps: {
          align: "right",
        },
      },
    ]
  }
};
