import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  type?: string;
  label: string;
  register: UseFormRegisterReturn;
  error: string | undefined;
};

export const FormInput: React.FC<FormInputProps> = ({
  type = undefined,
  label,
  register,
  error,
}) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          {...register}
          type={type === "password" ? (show ? "text" : "password") : type}
        />
        {type === "password" && (
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
