import { Box, Stack, HStack, Image, Text, Link, useDisclosure } from "@chakra-ui/react";
import { UserBase } from "features/user/userTypes";
import { UpdateUserForm } from "features/user/views/UpdateUserForm";
import { MainAvatar } from "components/avatar/MainAvatar";
import { MainButton } from "components/button/MainButton";
import { FollowButton } from "features/user/views/FollowButton";
import { formatDate } from "lib/functions/formatDate";
import { ChildrenModal } from "components/modal/ChildrenModal";
import { shortenString } from "lib/functions/shortenString";
import { AiOutlineCompass, AiOutlineLink, AiOutlineCrown, AiOutlineCalendar } from "react-icons/ai";

const IconText = ({ icon, text }: { icon: React.ReactNode; text: string | null }) => {
  if (!text) return null;
  return (
    <HStack spacing={1}>
      {icon}
      <Text>{text}</Text>
    </HStack>
  );
};

type UserProfileProps = {
  user: UserBase;
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  isMyPage?: boolean;
};
export const UserProfile: React.FC<UserProfileProps> = ({ user, setRefetch, isMyPage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCloseModal = () => {
    setRefetch(true);
    onClose();
  };

  return (
    <Stack spacing={4} position="relative">
      <Image
        src={user.headerImage ?? "https://images.unsplash.com/photo-1523805009345-7448845a9e53"}
        h="160px"
        w="100%"
        objectFit="cover"
        alt={user.name}
      />
      <MainAvatar
        size="2xl"
        position="absolute"
        top="24"
        left="4"
        src={user.avatarImage ?? ""}
        border={"4px solid white"}
      />
      <Box minH="10" ml="auto">
        {isMyPage ? (
          <MainButton colorScheme="gray" variant="outline" rounded="3xl" onClick={onOpen}>
            プロフィールを編集
          </MainButton>
        ) : (
          <FollowButton user={user} />
        )}
      </Box>
      <Stack spacing={2}>
        <Text fontSize="lg" fontWeight="bold">
          {user.name}
        </Text>
        <Text fontSize="sm" whiteSpace="pre-line">
          {user.description}
        </Text>
        <Box fontSize="sm" color="gray.500">
          <HStack spacing={4}>
            <IconText icon={<AiOutlineCompass />} text={user?.place} />
            {user.website && (
              <Link href={user.website} isExternal color="blue.500">
                <IconText icon={<AiOutlineLink />} text={shortenString(user.website)} />
              </Link>
            )}
            {user.birthday && (
              <IconText icon={<AiOutlineCrown />} text={formatDate(user.birthday)} />
            )}
          </HStack>
          <IconText
            icon={<AiOutlineCalendar />}
            text={`${formatDate(user.createdAt)}からTwiiterを利用しています`}
          />
        </Box>
      </Stack>
      <ChildrenModal isOpen={isOpen} onClose={onClose} title="プロフィールを編集">
        <UpdateUserForm onClose={onCloseModal} user={user} />
      </ChildrenModal>
    </Stack>
  );
};
