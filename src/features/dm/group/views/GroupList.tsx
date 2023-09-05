import { Text, Box } from "@chakra-ui/react";
import { MainSpinner } from "components/loading/MainSpinner";
import { useGroups } from "features/dm/group/useGroups";
import { GroupCard } from "features/dm/group/views/GroupCard";

export const GroupList: React.FC = () => {
  const { data, isLoading, error } = useGroups();

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (isLoading) {
    return <MainSpinner />;
  }

  return (
    <Box>
      {data && data?.length > 0 ? (
        data?.map((item) => <GroupCard key={item.id} group={item} />)
      ) : (
        <Text fontSize="sm">グループがありません。</Text>
      )}
    </Box>
  );
};
