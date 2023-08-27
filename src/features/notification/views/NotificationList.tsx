import { Box, Text, Stack } from "@chakra-ui/react";
import { MainSpinner } from "components/loading/MainSpinner";
import { useNotification } from "features/notification/useNotifications";
import { NotificationCard } from "features/notification/views/NotificationCard";

export const NotificationList = () => {
  const { data: nootifications, isLoading, error } = useNotification();

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <Box>
      <Stack spacing={4}>
        {isLoading ? (
          <MainSpinner />
        ) : (
          nootifications?.map((notification) => <NotificationCard notification={notification} />)
        )}
      </Stack>
    </Box>
  );
};
