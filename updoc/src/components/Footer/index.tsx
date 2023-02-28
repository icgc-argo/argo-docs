import { FC } from "react";

type Footer = {
  navItems: { [key: string]: string }[];
  copyright: string;
};

const Footer: FC<Footer> = ({ navItems, copyright }) => (
  <footer>
    {navItems.map(({ title }) => (
      <div>{title}</div>
    ))}{" "}
    {copyright}
  </footer>
);

export default Footer;
