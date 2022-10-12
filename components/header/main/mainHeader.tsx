import { Button } from "@mui/material";
import { Add } from "@carbon/icons-react";
import Link from "next/link";
import React from "react";
import Search from "../../elements/search/search";
import HotenLogo from "../../hotenLogo";
import MainMenu from "../../menu/main/mainMenu";
import Styles from "./styles.module.scss";

export default function MainHeader({
  toggleDrawer,
}: {
  toggleDrawer: () => void;
}) {
  return (
    <div className={Styles.container}>
      <HotenLogo />
      <Search />
      <MainMenu />
      <Button
        onClick={toggleDrawer}
        sx={{ borderLeft: "1px solid #f2f4f6" }}
        variant="text"
      >
        <Add size={20} />
        <span>List Your Property</span>
      </Button>
    </div>
  );
}
