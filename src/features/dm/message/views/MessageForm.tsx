import { Flex } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MainButton } from "components/button/MainButton";
import { FormInput } from "components/form/FormInput";
import { useToastMessage } from "hooks/useToastMessage";
import { useState } from "react";
import { postMessage } from "features/dm/message/messageApis";
import { useParams } from "react-router-dom";
import { Message } from "features/dm/message/messageTypes";

type Props = {
  onNewMessage: (message: Message) => void;
};
type MessageParams = {
  content: string;
};

export const MessageForm: React.FC<Props> = ({ onNewMessage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage } = useToastMessage();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageParams>();

  const onSubmit: SubmitHandler<MessageParams> = async (form) => {
    const { content } = form;
    try {
      setIsLoading(true);
      const message = await postMessage(content, id!);
      onNewMessage(message);
      toastMessage({ title: `メッセージを投稿できました` });
      reset();
    } catch (error) {
      toastMessage({ title: `メッセージの投稿に失敗しました`, status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      as="form"
      w="100%"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        placeholder="新しいメッセージを作成"
        type="textarea"
        register={register("content", {
          required: "必須項目です",
          maxLength: { value: 140, message: "140文字以内で入力してください" },
        })}
        error={errors.content?.message}
      />

      <MainButton
        type="submit"
        variant="solid"
        isLoading={isLoading}
        size="sm"
        rounded="3xl"
        ml="4"
      >
        投稿
      </MainButton>
    </Flex>
  );
};
