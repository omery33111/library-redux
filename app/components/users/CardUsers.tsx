"use client";

import { UserIns } from "@/app/models/User";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { useEffect } from "react";
import Flag from "../utils/Flag";
import Loader from "../utils/Loader";
import DeleteUserModal from "./DeleteUserModal";
import EditUserModal from "./EditUserModal";
import { getUsersAsync, selectUserIsLoading, selectUsers, selectUserSearch, setSelectedUser } from "./userSlice";

const CardUsers = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const searchQuery = useAppSelector(selectUserSearch);
  const isLoading = useAppSelector(selectUserIsLoading);

  const filteredUsers = users.filter((user) =>
    [user.name.first, user.name.last, user.email, user.location.country]
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEditClick = (user: UserIns) => {
    dispatch(setSelectedUser(user));
    dispatch({ type: 'user/openEditModal' });
  };

  const handleDeleteClick = (user: UserIns) => {
    dispatch(setSelectedUser(user));
    dispatch({ type: 'user/openDeleteModal' });
  };

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (filteredUsers.length === 0) return <h1 className="loader">No users found</h1>;

  return (
    
    <div className="card-map">
      {filteredUsers?.map((user, index) => (
        <Card
          key={index}
          color="neutral"
          invertedColors
          sx={{
            width: 320,
            overflow: "auto",
            transition: "transform 0.13s ease-in-out",
            "&:hover": {
              transform: "scale(1.08)",
            },
            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.06), 0px 0px 5px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Avatar src={user.picture.medium} size="lg" />
          </Box>
          <CardContent>
            <Typography level="body-sm" sx={{ alignItems: "center", display: "flex" }}>
              <Flag country={user.location.country} /> {user.location.country},{" "}
              {user.location.city}, {user.location.street.name} {user.location.street.number}
            </Typography>
            <Typography level="title-lg">
              {user.name.title} {user.name.first} {user.name.last}
            </Typography>
            <Typography
              level="body-sm"
              sx={{
                alignItems: "center",
                display: "flex",
                mt: "auto",
                transform: "translateY(10px)",
              }}
            >
              <MailIcon sx={{ mr: 1 }} />
              {user.email}
            </Typography>
          </CardContent>
          <CardActions buttonFlex="0 1 80px">
            <IconButton variant="outlined" color="neutral" sx={{ mr: "auto" }} onClick={() => handleDeleteClick(user)}>
              <DeleteIcon />
            </IconButton>
            <Button color="neutral" sx={{ gap: "11px" }} onClick={() => handleEditClick(user)}>
              <EditIcon fontSize="small" />
              Edit
            </Button>
          </CardActions>
        </Card>
      ))}

        <EditUserModal />

        <DeleteUserModal />
    </div>
  );
};

export default CardUsers;
