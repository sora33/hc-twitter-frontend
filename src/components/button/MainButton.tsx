import { Button, ButtonProps } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type MainButtonProps = ButtonProps & {
  link?: string;
  children: React.ReactNode;
};

export const MainButton: React.FC<MainButtonProps> = ({
  link,
  children,
  variant = "ghost",
  ...props
}) => {
  return (
    <Button
      as={link ? RouterLink : undefined}
      to={link ?? undefined}
      variant={variant}
      colorScheme="blue"
      {...props}
    >
      {children}
    </Button>
  );
};
