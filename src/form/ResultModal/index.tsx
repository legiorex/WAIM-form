import { Button, Modal, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import PATHS from "../../routes/patch";
import { useFormStore } from "../../store/formStore";
import { formatUSDWithSymbol } from "../Step3/utils";

export const ResultModal = () => {
  const navigate = useNavigate();
  const step1 = useFormStore((state) => state.step1);
  const step3 = useFormStore((state) => state.step3);
  const isModalOpened = useFormStore((state) => state.isModalOpened);
  const isSuccessState = useFormStore((state) => state.isSuccess);
  const resetForm = useFormStore((state) => state.resetForm);
  const toggleModalOpened = useFormStore((state) => state.toggleModalOpened);

  const handleSuccessClose = () => {
    toggleModalOpened(false);
    navigate(PATHS.step1.path);
    setTimeout(() => {
      resetForm();
    }, 0);
  };

  const handleRetry = () => {
    toggleModalOpened(false);
  };

  const onClick = isSuccessState ? handleSuccessClose : handleRetry;

  const title = isSuccessState ? "Заявка одобрена!" : "Ошибка";

  const text = isSuccessState
    ? `Поздравляем, ${step1.lastName} ${step1.firstName}. Вам одобрена $${formatUSDWithSymbol(step3.loanAmount)} на ${step3.loanDays} дней.`
    : "Произошла ошибка при обработке заявки. Пожалуйста, попробуйте снова.";

  return (
    <Modal opened={isModalOpened} onClose={onClick} title={title} centered>
      <Stack gap="md">
        <Text size="sm">{text}</Text>
        <Button onClick={onClick} fullWidth>
          {isSuccessState ? "Закрыть" : "Попробовать снова"}
        </Button>
      </Stack>
    </Modal>
  );
};
