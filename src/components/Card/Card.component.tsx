import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className: string;
}

const Card = ({ children, className }: Props) => {
  return <div className={className}>{children}</div>;
};

export default Card;
