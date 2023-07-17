import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  label: string;
  register: UseFormRegisterReturn;
  error: string | undefined;
};

export const FormInput: React.FC<FormInputProps> = ({
  label,
  register,
  error,
}) => (
  <FormControl isInvalid={!!error}>
    <FormLabel>{label}</FormLabel>
    <Input {...register} />
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);
