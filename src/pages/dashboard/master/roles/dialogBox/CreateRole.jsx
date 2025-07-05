import CrudRoleForm from "components/forms/master/CrudRoleForm";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const CreateRoleForm = forwardRef((props, ref) => {
  const formRef = useRef(null);

  const [errors, setErrors] = useState({});

  useImperativeHandle(ref, () => ({
    preparedData,
  }));

  const preparedData = () => {
    if (!formRef.current) {
      console.error("Form reference is not attached.");
      return null;
    }
    let payload = Object.fromEntries(new FormData(formRef.current));

    return payload;
  };

  return (
    <div>
      <CrudRoleForm errors={errors} formRef={formRef} />
    </div>
  );
});

export default CreateRoleForm;
