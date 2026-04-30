import { InputBase } from "@mantine/core";
import { IMaskInput } from "react-imask";

const maskOptions = {
  mask: "\\0000-000-000",
  lazy: false,
  placeholder: "Введите номер телефона",
  placeholderChar: "X",
  definitions: {
    "0": /\d/,
  },
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: React.ReactNode;
};

export const PhoneField: React.FC<Props> = ({ value, onChange, error }) => {
  const handlePhoneInput = (event: React.InputEvent<HTMLInputElement>) => {
    const cleanedValue = event.currentTarget.value.replace(/-/g, "");
    onChange(cleanedValue);
  };

  return (
    <InputBase
      component={IMaskInput}
      label="Телефон"
      required
      {...maskOptions}
      value={value}
      onInput={handlePhoneInput}
      error={error}
    />
  );
};
