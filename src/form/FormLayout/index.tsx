import { Button, Flex } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import {
  pathToStep,
  useFormValidationRedirect,
} from "../../hooks/useFormValidationRedirect";
import PATHS from "../../routes/patch";
import { useFormStore } from "../../store/formStore";

export const FormLayout = () => {
  const currentStep = useFormStore((state) => state.currentStep);
  const setCurrentStep = useFormStore((state) => state.setCurrentStep);
  const validationStep = useFormStore((state) => state.validation);
  const isLoading = useFormStore((state) => state.isLoading);
  const resetForm = useFormStore((state) => state.resetForm);

  const isLastStep = currentStep === 3;

  const location = useLocation();
  const navigate = useNavigate();

  useFormValidationRedirect();

  useEffect(() => {
    const stepFromPath = pathToStep[location.pathname];
    if (stepFromPath !== undefined && stepFromPath !== currentStep) {
      setCurrentStep(stepFromPath);
    }
  }, [location.pathname, currentStep, setCurrentStep]);

  const onSubmitNext = () => {
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

  const handleReset = () => {
    resetForm();
    navigate(PATHS.step1.path);
  };

  return (
    <div>
      <Outlet />

      <Flex justify="space-between" mt="xl">
        <Button variant="outline" color="red" onClick={handleReset}>
          Сбросить форму
        </Button>
        <Flex gap="md">
          {currentStep > 1 && (
            <Button onClick={handlePrevious}>Предыдущий шаг</Button>
          )}
          <Button
            loading={isLoading}
            onClick={onSubmitNext}
            disabled={!validationStep[`isValidStep${currentStep}`]}
          >
            {isLastStep ? "Отправить заявку" : "Следующий шаг"}
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};
