import { Slider, Stack, Text } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { useEffect } from "react";
import { z } from "zod/v4";
import { useFormStore } from "../../store/formStore";
import {
  LOAN_AMOUNT_STEP,
  LOAN_DAYS_STEP,
  MAX_LOAN_AMOUNT,
  MAX_LOAN_DAYS,
  MIN_LOAN_AMOUNT,
  MIN_LOAN_DAYS,
} from "./constants";
import { calculateMarkStep, formatUSDWithSymbol } from "./utils";

const marksLoanAmount = calculateMarkStep(
  MAX_LOAN_AMOUNT,
  MIN_LOAN_AMOUNT,
  "$",
);
const marksLoanDays = calculateMarkStep(
  String(MAX_LOAN_DAYS),
  String(MIN_LOAN_DAYS),
  "",
);

const step3Schema = z.object({
  loanAmount: z
    .number()
    .min(Number(MIN_LOAN_AMOUNT), "Минимальная сумма займа $200")
    .max(Number(MAX_LOAN_AMOUNT), "Максимальная сумма займа $1000"),
  loanDays: z
    .number()
    .min(MIN_LOAN_DAYS, "Минимальный срок займа 10 дней")
    .max(MAX_LOAN_DAYS, "Максимальный срок займа 30 дней"),
});

type Step3FormValues = z.infer<typeof step3Schema>;

export const Step3 = () => {
  const step3 = useFormStore((state) => state.step3);
  const updateStep3 = useFormStore((state) => state.updateStep3);
  const updateValidation = useFormStore((state) => state.updateValidation);

  const form = useForm<Step3FormValues>({
    mode: "controlled",
    initialValues: {
      loanAmount: Number(step3.loanAmount),
      loanDays: step3.loanDays,
    },
    validate: schemaResolver(step3Schema, { sync: true }),
  });

  const isValid = form.isValid();

  useEffect(() => {
    updateValidation({
      isValidStep3: isValid,
    });
  }, [isValid, updateValidation]);

  useEffect(() => {
    updateStep3({
      loanAmount: String(form.values.loanAmount),
      loanDays: form.values.loanDays,
    });
  }, [form.values, updateStep3]);

  return (
    <form id="step-3-form">
      <Stack gap="xl">
        <div>
          <Text size="sm" fw={500} mb="xs">
            Сумма займа: {formatUSDWithSymbol(step3.loanAmount)}
          </Text>
          <Slider
            min={Number(MIN_LOAN_AMOUNT)}
            max={Number(MAX_LOAN_AMOUNT)}
            step={Number(LOAN_AMOUNT_STEP)}
            marks={marksLoanAmount}
            key={form.key("loanAmount")}
            {...form.getInputProps("loanAmount")}
          />
        </div>

        <div>
          <Text size="sm" fw={500} mb="xs">
            Срок займа: {form.values.loanDays} дней
          </Text>
          <Slider
            min={MIN_LOAN_DAYS}
            max={MAX_LOAN_DAYS}
            step={LOAN_DAYS_STEP}
            marks={marksLoanDays}
            key={form.key("loanDays")}
            {...form.getInputProps("loanDays")}
          />
        </div>
      </Stack>
    </form>
  );
};
