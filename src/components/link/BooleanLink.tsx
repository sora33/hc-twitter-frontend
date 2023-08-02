import { Link as RouterLink } from "react-router-dom";

type BooleanLinkProps = {
  isLink?: boolean;
  link?: string;
  children: React.ReactNode;
};
export const BooleanLink: React.FC<BooleanLinkProps> = ({
  isLink = false,
  link = "",
  children,
}) => {
  return isLink ? <>{children}</> : <RouterLink to={link}>{children}</RouterLink>;
};
