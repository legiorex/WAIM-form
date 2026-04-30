import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Gender = "male" | "female";

interface ValidationStep {
  isValidStep1: boolean;
  isValidStep2: boolean;
  isValidStep3: boolean;
}
type Validator = Partial<ValidationStep>;

export interface Step1Data {
  phone: string;
  firstName: string;
  lastName: string;
  gender: Gender | "";
}

export interface Step2Data {
  workplace: string;
  address: string;
}

export interface Step3Data {
  loanAmount: number;
  loanDays: number;
}

export interface FormState {
  currentStep: number;
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  validation: ValidationStep;

  setCurrentStep: (step: number) => void;

  updateStep1: (data: Partial<Step1Data>) => void;
  updateStep2: (data: Partial<Step2Data>) => void;
  updateStep3: (data: Partial<Step3Data>) => void;
  updateValidation: (validation: Validator) => void;

  resetForm: () => void;
}

const initialStep1: Step1Data = {
  phone: "",
  firstName: "",
  lastName: "",
  gender: "",
};

const initialStep2: Step2Data = {
  workplace: "",
  address: "",
};

const initialStep3: Step3Data = {
  // loanAmount: BigInt(200),
  loanAmount: 200,
  loanDays: 10,
};

const initValue = {
  currentStep: 1,
  step1: initialStep1,
  step2: initialStep2,
  step3: initialStep3,
  validation: {
    isValidStep1: false,
    isValidStep2: false,
    isValidStep3: false,
  },
};

export const useFormStore = create<FormState>()(
  devtools(
    persist(
      (set) => ({
        ...initValue,

        setCurrentStep: (step) => set({ currentStep: step }),

        updateStep1: (data) =>
          set((state) => ({
            step1: { ...state.step1, ...data },
          })),

        updateStep2: (data) =>
          set((state) => ({
            step2: { ...state.step2, ...data },
          })),

        updateStep3: (data) =>
          set((state) => ({
            step3: { ...state.step3, ...data },
          })),

        updateValidation: (validation) =>
          set((state) => ({
            validation: { ...state.validation, ...validation },
          })),

        resetForm: () => set(initValue),
      }),
      {
        name: "waim-form-storage",
        partialize: (state) => ({
          step1: state.step1,
          step2: state.step2,
          step3: state.step3,
          currentStep: state.currentStep,
          validation: state.validation,
        }),
      },
    ),
  ),
);
