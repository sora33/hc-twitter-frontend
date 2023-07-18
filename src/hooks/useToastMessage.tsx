import { useCallback } from "react";
import { useToast, ToastProps } from "@chakra-ui/react";

type ToastMessageProps = {
  toastMessage: (props: ToastProps) => void;
};

export const useToastMessage = (): ToastMessageProps => {
  const toast = useToast();

  const toastMessage = useCallback(
    (props: ToastProps) => {
      toast({
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
        ...props,
      });
    },
    [toast]
  );

  return { toastMessage };
};
