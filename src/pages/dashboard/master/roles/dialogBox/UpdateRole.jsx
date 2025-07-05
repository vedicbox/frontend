import RoleMasterForm from "components/forms/master/RoleForm";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const UpdateRoleForm = forwardRef((props, ref) => {
  const { state } = useLocation();
  const formRef = useRef(null);

  const [errors, setErrors] = useState({});

  // Use useImperativeHandle to expose the resetForm method to the parent
  useImperativeHandle(ref, () => ({
    preparedData,
  }));

  const preparedData = () => {
    let payload = Object.fromEntries(new FormData(formRef.current));
    payload._id = state._id;
    return payload;
  };

  return (
    <div>
      <RoleMasterForm errors={errors} formRef={formRef} defaultData={state} />
    </div>
  );
});

export default EditRoleForm;
