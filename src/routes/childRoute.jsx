import { Route, Routes } from "react-router-dom";

export default function ChildRoutes({ routelist }) {
  return (
    <Routes>
      {routelist.map((childObj, index) => (
        <Route key={index} {...childObj} />
      ))}
    </Routes>
  );
}
