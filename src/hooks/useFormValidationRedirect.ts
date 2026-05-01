import { useMounted } from "@mantine/hooks";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import PATHS from "../routes/patch";
import { useFormStore } from "../store/formStore";

export const pathToStep: Record<string, number> = {
  [PATHS.step1.path]: 1,
  [PATHS.step2.path]: 2,
  [PATHS.step3.path]: 3,
};

export const useFormValidationRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mounted = useMounted();

  const validation = useFormStore((state) => state.validation);

  useEffect(() => {
    if (mounted) return;

    const currentPathStep = pathToStep[location.pathname];

    if (currentPathStep === undefined) return;

    if (!validation) return;

    if (validation.isValidStep3) {
      navigate(PATHS.step3.path, { replace: true });
      return;
    }
    if (validation.isValidStep2) {
      navigate(PATHS.step2.path, { replace: true });
      return;
    }
    if (validation.isValidStep1) {
      navigate(PATHS.step1.path, { replace: true });
      return;
    }
    navigate(PATHS.step1.path, { replace: true });
  }, [location.pathname, mounted, navigate, validation]);
};
