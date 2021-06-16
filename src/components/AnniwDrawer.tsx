import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { atom, useRecoilValue } from "recoil";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Home from "@material-ui/icons/Home";
import LocalLibrary from "@material-ui/icons/LocalLibrary";
import styles from "./AnniwDrawer.module.scss";

const DrawerItems: DrawerItem[] = [
  { text: "Home", icon: <Home />, route: "/" },
  { text: "Library", icon: <LocalLibrary />, route: "/library" },
];

export const DrawerIsOpen = atom({
  key: "DrawerIsOpen",
  default: false,
});

function ListItemRoute(
  props: ListItemProps<RouterLink, { to: string; button?: true }>
) {
  return <ListItem button component={RouterLink} {...props} />;
}

export const AnniwDrawer: React.FC<{}> = () => {
  const open = useRecoilValue(DrawerIsOpen);
  return (
    <Drawer variant="persistent" anchor="left" open={open}>
      <div className={styles.drawerBody}>
        <List component="nav" style={{ padding: 0 }}>
          {DrawerItems.map((item) => (
            <ListItemRoute key={item.text} to={item.route}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemRoute>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

interface DrawerItem {
  text: string;
  icon: React.ReactNode;
  route: string;
}