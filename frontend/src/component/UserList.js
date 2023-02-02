import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import UserItem from "./UserItem";

export default function UserList() {
  const userLists = [
    {
      id: 1,
      name: "John Smith",
      avatar: "/static/images/avatar/1.jpg",
      primary: "John",
      joinedTime: "8:00 am",
    },
    {
      id: 2,
      name: "John Smith",
      avatar: "/static/images/avatar/1.jpg",
      primary: "John",
      joinedTime: "8:00 am",
    },
    {
      id: 3,
      name: "John Smith",
      avatar: "/static/images/avatar/1.jpg",
      primary: "John",
      joinedTime: "8:00 am",
    },
    {
      id: 4,
      name: "John Smith",
      avatar: "/static/images/avatar/1.jpg",
      primary: "John",
      joinedTime: "8:00 am",
    },
  ];
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {userLists.map((val, ind) => {
        return (
          <>
            <UserItem
              userData={val}
              key={val.name + val.avatar + val.primary}
              id={val.id.toString()}
            />
            {ind + 1 !== userLists.length ? (
              <Divider
                variant="inset"
                component="li"
                key={val.name + val.joinedtime}
              />
            ) : null}
          </>
        );
      })}
    </List>
  );
}
