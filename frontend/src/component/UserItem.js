import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const UserItem = ({ userData, id }) => {
  return (
    <ListItem alignItems="flex-start" key={id}>
      <ListItemAvatar>
        <Avatar alt={userData.name} src={userData.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={userData.primary}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              was joind at {userData.joinedTime}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default UserItem;
