import { createBrowserRouter, Navigate } from "react-router";
import { FormLayout } from "../form/FormLayout";
import { Step1 } from "../form/Step1";
import { Step2 } from "../form/Step2";
import { Step3 } from "../form/Step3";
import { NotFound } from "../pages/NotFound";
import PATHS from "./patch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FormLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={PATHS.step1.path} replace />,
      },
      {
        path: PATHS.step1.path,
        element: <Step1 />,
      },
      {
        path: PATHS.step2.path,
        element: <Step2 />,
      },
      {
        path: PATHS.step3.path,
        element: <Step3 />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
