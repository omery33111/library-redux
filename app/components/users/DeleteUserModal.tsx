"use client";

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import Avatar from "@mui/joy/Avatar";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import React from 'react';
import { deleteUser, selectIsDeleteModalOpen, selectSelectedUser, selectUsers } from './userSlice';



const DeleteUserModal = () => {
  const dispatch = useAppDispatch();
  
  const user = useAppSelector(selectSelectedUser);
  const isDeleteModalOpen = useAppSelector(selectIsDeleteModalOpen);
  const users = useAppSelector(selectUsers);

  const handleDelete = () => {
    if (user) {
      const userIndex = users.findIndex((u) => u.email === user.email);
      if (userIndex !== -1) {
        dispatch(deleteUser(userIndex));
      }
    }
    dispatch({ type: "user/closeDeleteModal" });
  };

  const handleClose = () => {
    dispatch({ type: "user/closeDeleteModal" });
  };

  if (!user) return null;

  return (
    <Modal open={isDeleteModalOpen} onClose={handleClose}>
      <ModalDialog>
        <Box sx={{ textAlign: 'center' }}>
          <Typography level="body-sm" sx={{ mb: 2 }}>
            Are you sure you want to delete this user?
          </Typography>
          <Box sx={{ justifyContent: "center", display: "flex", mb: 1 }}>
            <Avatar src={user.picture.medium} size="lg" />
          </Box>
          <Typography level="body-md" sx={{ mb: 3 }}>
            {user.name.title} {user.name.first} {user.name.last}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="solid" color="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default DeleteUserModal;
