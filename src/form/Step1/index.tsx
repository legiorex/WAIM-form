import { Select, Stack, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { z } from "zod/v4";
import { useFormStore } from "../../store/formStore";
import { PhoneField } from "./PhoneField";

const phoneRegex = /^0\d{9}$/;
const symbolsRegex = /^[А-Яа-яA-Za-z\s\-']+$/;

const step1Schema = z.object({
  phone: z
    .string()
    .min(1, "Телефон обязателен")
    .regex(phoneRegex, "Телефон должен содержать 10 цифр"),
  firstName: z
    .string("Должно быть строкой")
    .min(1, "Имя обязательно")
    .min(2, "Имя должно содержать минимум 2 символа")
    .regex(symbolsRegex, "Имя может содержать только буквы"),
  lastName: z
    .string("Должно быть строкой")
    .min(1, "Фамилия обязательна")
    .min(2, "Фамилия должна содержать минимум 2 символа")
    .regex(symbolsRegex, "Фамилия может содержать только буквы"),
  gender: z.enum(["male", "female"], { message: "Выберите пол" }),
});

type Step1FormValues = z.infer<typeof step1Schema>;

export const Step1 = () => {
  const navigate = useNavigate();

  // const { updateStep1, nextStep } = useFormStore();
  const step1 = useFormStore((state) => state.step1);
  const updateStep1 = useFormStore((state) => state.updateStep1);
  // const validation = useFormStore((state) => state.validation);
  const updateValidation = useFormStore((state) => state.updateValidation);

  const form = useForm<Step1FormValues>({
    mode: "uncontrolled",
    initialValues: {
      phone: step1.phone,
      firstName: step1.firstName,
      lastName: step1.lastName,
      gender: step1.gender || undefined,
    },
    validate: schemaResolver(step1Schema, { sync: true }),
    validateInputOnChange: true,
  });

  const isValid = form.isValid();
  // const isDirty = form.isDirty();

  useEffect(() => {
    console.log("isValid", isValid);
    // console.log("isDirty", isDirty);
    updateValidation({
      isValidStep1: isValid,
    });
  }, [isValid, updateValidation]);

  const handleSubmit = (values: Step1FormValues) => {
    console.log("handleSubmit", values);
    updateStep1(values);
    navigate("/step2");
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} id="step-1-form">
      <Stack gap="md">
        <PhoneField
          value={form.values.phone}
          onChange={(value) => form.setFieldValue("phone", value)}
          error={form.errors.phone}
        />

        <TextInput
          label="Имя"
          placeholder="Введите имя"
          required
          key={form.key("firstName")}
          {...form.getInputProps("firstName")}
        />

        <TextInput
          label="Фамилия"
          placeholder="Введите фамилию"
          required
          key={form.key("lastName")}
          {...form.getInputProps("lastName")}
        />

        <Select
          label="Пол"
          placeholder="Выберите пол"
          required
          data={[
            { value: "male", label: "Мужской" },
            { value: "female", label: "Женский" },
          ]}
          key={form.key("gender")}
          {...form.getInputProps("gender")}
        />
      </Stack>
    </form>
  );
};
