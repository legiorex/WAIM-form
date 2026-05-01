import { Select, Stack, TextInput, Title } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { z } from "zod/v4";
import { useGetProductsCategoryList } from "../../api/config/hooks/products";
import { useFormStore } from "../../store/formStore";

const step2Schema = z.object({
  workplace: z.string().min(1, "Место работы обязательно"),
  address: z
    .string()
    .min(1, "Адрес обязателен")
    .min(5, "Адрес должен содержать минимум 5 символов"),
});

type Step2FormValues = z.infer<typeof step2Schema>;

export const Step2 = () => {
  const navigate = useNavigate();

  const step2 = useFormStore((state) => state.step2);
  const updateStep2 = useFormStore((state) => state.updateStep2);
  const updateValidation = useFormStore((state) => state.updateValidation);

  const { data: productsCategoryList, isLoading } = useGetProductsCategoryList({
    query: {
      queryKey: ["productsCategoryList"],
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  });

  const form = useForm<Step2FormValues>({
    mode: "controlled",
    initialValues: {
      workplace: step2.workplace,
      address: step2.address,
    },
    validate: schemaResolver(step2Schema, { sync: true }),
    validateInputOnBlur: true,
  });

  const isValid = form.isValid();

  useEffect(() => {
    updateValidation({
      isValidStep2: isValid,
    });
  }, [isValid, updateValidation]);

  const handleSubmit = (values: Step2FormValues) => {
    updateStep2(values);
    navigate("/step3");
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} id="step-2-form">
      <Stack gap="md">
        <Title order={2} ta="center">
          Место работы и адрес
        </Title>
        <Select
          label="Место работы"
          placeholder="Выберите место работы"
          required
          data={
            productsCategoryList?.map((category: string) => ({
              value: category,
              label: category,
            })) || []
          }
          loading={isLoading}
          searchable
          key={form.key("workplace")}
          {...form.getInputProps("workplace")}
        />

        <TextInput
          label="Адрес"
          placeholder="Введите адрес"
          required
          key={form.key("address")}
          {...form.getInputProps("address")}
        />
      </Stack>
    </form>
  );
};
