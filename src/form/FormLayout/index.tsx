import { Button, Flex } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import PATHS from "../../routes/patch";
import { useFormStore } from "../../store/formStore";

const pathToStep: Record<string, number> = {
  [PATHS.step1.path]: 1,
  [PATHS.step2.path]: 2,
  [PATHS.step3.path]: 3,
  [PATHS.review.path]: 4,
};

export const FormLayout = () => {
  const currentStep = useFormStore((state) => state.currentStep);
  const setCurrentStep = useFormStore((state) => state.setCurrentStep);
  const validationStep = useFormStore((state) => state.validation);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const stepFromPath = pathToStep[location.pathname];
    if (stepFromPath !== undefined && stepFromPath !== currentStep) {
      setCurrentStep(stepFromPath);
    }
  }, [location.pathname, currentStep, setCurrentStep]);

  const handleNext = () => {
    const formId = `step-${currentStep}-form`;
    const form = document.getElementById(formId) as HTMLFormElement;

    if (form) {
      form.requestSubmit();
    }
  };

  const handlePrevious = () => {
    const previousStep = currentStep - 1;
    setCurrentStep(previousStep);
    navigate(PATHS[`step${previousStep}`].path);
  };

  return (
    <div>
      <Outlet />

      <Flex justify="flex-end" mt="xl">
        {currentStep > 1 && (
          <Button onClick={handlePrevious}>Предыдущий шаг</Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!validationStep[`isValidStep${currentStep}`]}
        >
          Следующий шаг
        </Button>
      </Flex>
    </div>
  );
};
