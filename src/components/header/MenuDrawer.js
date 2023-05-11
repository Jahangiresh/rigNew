import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function MenuDrawer() {
  const { t, i18n } = useTranslation();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menuItems = [
    { text: t("haqqında"), url: "/about" },
    { text: t("təlimlər"), url: "/trainings" },
    { text: t("təlim cədvəli"), url: "/educationevents" },
    { text: t("xəbərlər"), url: "/blogs" },
    { text: t("akkreditasiyalar"), url: "/accreditations" },
    { text: t("sertifikatı yoxla"), url: "/checkcertificat" },
    { text: t("əlaqə"), url: "/contact" },
  ];
  useEffect(() => {
    const getCategory = async () => {
      await axios
        .get(`${BASE_URL}/categories`)
        .then((res) => {
          res?.data?.slice(0, 2)?.map((data) =>
            menuItems.splice(1, 0, {
              text: data.title,
              url: `/trainingscategory/${data.id}`,
            })
          );
        })
        .catch((err) => {});
    };
    getCategory();
  }, []);
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menuItems.slice(0, 6).map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            style={{
              borderBottom: "1px solid #e3e3e3",
            }}
          >
            <ListItemButton component={Link} to={item.url}>
              <ListItemText
                style={{
                  textTransform: "capitalize",
                }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[t("əlaqə")].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to="/contact">
              <ListItemText
                primary={text}
                style={{
                  backgroundColor: "#e87813",
                  borderRadius: "7px",
                  padding: "6px 12px",
                  color: "#fff",
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              borderRadius: "7px",
              width: "36px !important",
              height: "36px !important",
              textTransform: "capitalize",
            }}
          >
            <MenuIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
