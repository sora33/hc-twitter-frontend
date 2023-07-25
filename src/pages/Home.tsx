import { PostTweetForm } from "features/tweet/views/PostTweetForm";
import { HeadingH1 } from "components/heading/HeadingH1";
export const Home: React.FC = () => {
  return (
    <>
      <HeadingH1>ホーム</HeadingH1>
      <PostTweetForm />
    </>
  );
};
