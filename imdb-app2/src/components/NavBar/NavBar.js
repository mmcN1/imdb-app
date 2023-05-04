import React, { useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SimpleBottomNavigation = ( ) => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/filmler");
    else if (value === 2) navigate("/diziler");
    else if (value === 3) navigate("/ara");
    window.scroll(10, 10)
    // eslint-disable-next-line
  }, [value]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      style={{
        width: "100%",
        backgroundColor: "rgb(23, 23, 27)",
        position: "fixed",
        bottom: 0,
        zIndex: 100,
      }}
    >
      <BottomNavigationAction
        style={{ color: "aliceblue" }}
        label="Popüler"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "aliceblue" }}
        label="Filmler"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: "aliceblue" }}
        label="Diziler"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ color: "aliceblue" }}
        label="Ara"
        icon={<SearchIcon />}
      />
    </BottomNavigation>
  );
}

export default SimpleBottomNavigation;