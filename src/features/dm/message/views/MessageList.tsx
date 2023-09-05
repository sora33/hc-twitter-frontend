import { Text, Box } from "@chakra-ui/react";
import { MainSpinner } from "components/loading/MainSpinner";
import { useMessages } from "features/dm/message/useMessages";
import { MessageCard } from "features/dm/message/views/MessageCard";
import { MessageForm } from "features/dm/message/views/MessageForm";
import { useState, useEffect, useRef } from "react";
import { Message } from "features/dm/message/messageTypes";

export const MessageList: React.FC = () => {
  const { data, isLoading, error } = useMessages();
  const [viewMessages, setViewMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      setViewMessages(data);
      messagesEndRef?.current?.scrollIntoView();
    }
  }, [data]);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [viewMessages]);

  const handleNewMessage = (newMessage: Message) => {
    setViewMessages((prev) => [...prev, newMessage]);
  };

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (isLoading) {
    return <MainSpinner />;
  }

  return (
    <Box h="100%">
      <Box>
        {viewMessages?.length > 0 ? (
          viewMessages?.map((item) => {
            return <MessageCard message={item} />;
          })
        ) : (
          <Text fontSize="sm">メッセージがありません</Text>
        )}
        <div ref={messagesEndRef} />
      </Box>
      <Box position="sticky" bottom="0" h="100px" bg="white">
        <MessageForm onNewMessage={handleNewMessage} />
      </Box>
    </Box>
  );
};
