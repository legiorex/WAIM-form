import { Button, Flex } from "@mantine/core";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
// import { useAddProduct } from "../../api/config/hooks/products";
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
  console.log("currentStep", currentStep);
  const setCurrentStep = useFormStore((state) => state.setCurrentStep);
  const validationStep = useFormStore((state) => state.validation);
  const isLoading = useFormStore((state) => state.isLoading);
  // const step1 = useFormStore((state) => state.step1);
  // const step2 = useFormStore((state) => state.step2);
  // const step3 = useFormStore((state) => state.step3);

  const isLastStep = currentStep === 3;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const stepFromPath = pathToStep[location.pathname];
    if (stepFromPath !== undefined && stepFromPath !== currentStep) {
      setCurrentStep(stepFromPath);
    }
  }, [location.pathname, currentStep, setCurrentStep]);

  // const { trigger: addProduct } = useAddProduct();

  // const onSubmit = () => {
  //   console.log("step1", step1);
  //   console.log("step2", step2);
  //   console.log("step3", step3);
  // };

  const onSubmitNext = () => {
    const formId = `step-${currentStep}-form`;
    const form = document.getElementById(formId) as HTMLFormElement;

    if (form) {
      form.requestSubmit();
    }
  };
  // const handleNext = () => {
  //   if (isLastStep) {
  //     onSubmit();
  //     return;
  //   }
  //   onSubmitNext();
  // };

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
          loading={isLoading}
          onClick={onSubmitNext}
          disabled={!validationStep[`isValidStep${currentStep}`]}
        >
          {isLastStep ? "Отправить заявку" : "Следующий шаг"}
        </Button>
      </Flex>
    </div>
  );
};
