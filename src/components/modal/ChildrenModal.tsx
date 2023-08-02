import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalProps,
} from "@chakra-ui/react";

export const ChildrenModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  props?: ModalProps;
  title?: string;
  size?: ModalProps["size"];
}> = ({ isOpen, onClose, title, children, props, size = { base: "xs", sm: "md", md: "xl" } }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={true}
      {...props}
      size={size}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent px={2} py={4}>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
