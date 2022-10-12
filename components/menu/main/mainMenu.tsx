import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Styles from "./styles.module.scss";

const menuLabels = [
  { id: 1, title: "Home", link: "/" },
  { id: 2, title: "New Development", link: "/development" },
  { id: 3, title: "Agent Finder", link: "/agents" },
  { id: 4, title: "Exclusive", link: "/exclusive" },
];

export default function MainMenu() {
  const { pathname } = useRouter();
  return (
    <ul className={Styles.container}>
      {menuLabels?.map((menu) => (
        <li
          key={menu.id}
          className={pathname === menu?.link ? Styles.active : ""}
        >
          <Link className={Styles.active} href={menu?.link}>
            {menu?.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
