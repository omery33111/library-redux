"use client";

import React from "react";
import Button from "@mui/joy/Button";
import { useAppDispatch } from "@/app/store/hooks";
import { togglePostUserForm } from "../users/userSlice";

const PostUserButton = () => {
  const dispatch = useAppDispatch();

  const handleAddUserClick = () => {
    dispatch(togglePostUserForm());
  };

  return (
    <Button
      variant="solid"
      size="sm"
      onClick={handleAddUserClick}
      style={{ alignItems: "center", backgroundColor: "#213555" }}
    >
      Add user
    </Button>
  );
};

export default PostUserButton;
