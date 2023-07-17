import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";

type Props = {
  title: string;
  status?: "info" | "warning" | "success" | "error";
};
type ToastMessage = {
  toastMessage: (props: Props) => void;
};

export const useToastMessage = (): ToastMessage => {
  const toast = useToast();

  const toastMessage = useCallback(
    (props: Props) => {
      const { title, status = "success" } = props;
      toast({
        title,
        status,
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );

  return { toastMessage };
};
