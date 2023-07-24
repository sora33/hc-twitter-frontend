import { useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  type?: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error: string | undefined;
};

export const FormInput: React.FC<FormInputProps> = ({
  type = undefined,
  label = undefined,
  placeholder = undefined,
  register,
  error,
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel>{label}</FormLabel>}
      {type === "textarea" ? (
        <Textarea {...register} placeholder={placeholder} />
      ) : type === "file" ? (
        <Input {...register} type="file" hidden accept="image/*" />
      ) : (
        <InputGroup>
          <Input
            {...register}
            type={type === "password" ? (show ? "text" : "password") : type}
            placeholder={placeholder}
          />
          {type === "password" && (
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
