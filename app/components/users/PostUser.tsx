"use client";

import { UserIns } from '@/app/models/User';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import UserFormGroup from './UserFormGroup';
import { addUser, closePostUserForm, selectIsPostUserFormOpen } from './userSlice';


const PostUser = () => {
  const dispatch = useAppDispatch();
  
  const isPostUserFormOpen = useAppSelector(selectIsPostUserFormOpen);

  const methods = useForm<UserIns>({
    defaultValues: {
      name: { title: "", first: "", last: "" },
      email: "",
      location: { country: "", city: "", street: { name: "", number: 0 } },
      picture: { medium: "" },
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<UserIns> = (data) => {
    dispatch(addUser(data));
    dispatch(closePostUserForm());
    reset();
  };

  if (!isPostUserFormOpen) return null;

  return (
    <div className = "add-user-section">
      <h3>Add New User</h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserFormGroup />
        </form>
      </FormProvider>
    </div>
  );
};

export default PostUser;
