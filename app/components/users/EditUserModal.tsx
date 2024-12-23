"use client";

import { UserIns } from "@/app/models/User";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { Box, Modal, Typography } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import UserFormGroup from "./UserFormGroup";
import { closeEditModal, selectIsEditModalOpen, selectSelectedUser, selectUsers, updateUser } from "./userSlice";

const EditUserModal = () => {
  const dispatch = useAppDispatch();
  
  const user = useAppSelector(selectSelectedUser);
  const isEditModalOpen = useAppSelector(selectIsEditModalOpen);
  const users = useAppSelector(selectUsers);

  const methods = useForm<UserIns>({
    defaultValues: user || {},
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<UserIns> = (data) => {
    if (user) {
      const userIndex = users.findIndex((u) => u.email === user.email);
      if (userIndex !== -1) {
        dispatch(updateUser({ index: userIndex, user: { ...user, ...data } }));
      }
    }
    dispatch(closeEditModal());
  };

  const handleClose = () => {
    dispatch(closeEditModal());
  };

  if (!user) return null;

  return (
    <Modal open={isEditModalOpen} onClose={handleClose}>
      <Box sx={{ position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90%",
                  maxWidth: "400px",
                  maxHeight: "90vh",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  overflowY: "auto"}}>
        <Typography variant="h6" component="h2">Edit User</Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <UserFormGroup />
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
