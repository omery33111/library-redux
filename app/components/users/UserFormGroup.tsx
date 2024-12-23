import { UserIns } from "@/app/models/User";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useAppDispatch } from "@/app/store/hooks";
import { closePostUserForm, setSelectedUser } from "./userSlice";

const UserFormGroup = () => {
  const { register, formState: { errors } } = useFormContext<UserIns>();
  const { setValue } = useFormContext<UserIns>();
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    dispatch(closePostUserForm());
  };

  return (
    <>
      <FormControl fullWidth margin="normal">
        <InputLabel id="title-label">Title</InputLabel>
        <Select labelId="title-label"
                defaultValue=""
                {...register("name.title", { required: "Title is required" })}
                error={!!errors.name?.title}>
          <MenuItem value="Mr">Mr</MenuItem>
          <MenuItem value="Ms">Ms</MenuItem>
          <MenuItem value="Mrs">Mrs</MenuItem>
          <MenuItem value="Miss">Miss</MenuItem>
          <MenuItem value="Madame">Madame</MenuItem>
          <MenuItem value="Monsieur">Monsieur</MenuItem>
          <MenuItem value="Mademoiselle">Mademoiselle</MenuItem>
        </Select>
        {errors.name?.title && (
          <Typography color="error">{errors.name.title.message}</Typography>
        )}
      </FormControl>

      <TextField fullWidth
                label="First Name"
                margin="normal"
                {...register("name.first", {
                  required: "First name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                })}
                error={!!errors.name?.first}
                helperText={errors.name?.first?.message}/>

      <TextField fullWidth
                label="Last Name"
                margin="normal"
                {...register("name.last", {
                  required: "Last name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                })}
                error={!!errors.name?.last}
                helperText={errors.name?.last?.message}/>

                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />


      <TextField fullWidth
                label="Country"
                margin="normal"
                {...register("location.country", { required: "Country is required" })}
                error={!!errors.location?.country}
                helperText={errors.location?.country?.message}/>

      <TextField fullWidth
                label="City"
                margin="normal"
                {...register("location.city", { required: "City is required" })}
                error={!!errors.location?.city}
                helperText={errors.location?.city?.message}/>

      <TextField fullWidth
                label="Street Name"
                margin="normal"
                {...register("location.street.name", {
                  required: "Street name is required",
                })}
                error={!!errors.location?.street?.name}
                helperText={errors.location?.street?.name?.message}/>

      <TextField fullWidth
                label="Street Number"
                margin="normal"
                type="number"
                {...register("location.street.number", {
                  required: "Street number is required",
                })}
                error={!!errors.location?.street?.number}
                helperText={errors.location?.street?.number?.message}/>

      <input type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const result = reader.result as string;
                  setValue("picture.medium", result, { shouldValidate: true });
                };
                reader.readAsDataURL(file);
              }
            }}/>

        {errors.picture?.medium && (
          <Typography color="error">{errors.picture.medium.message}</Typography>
        )}                

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="outlined" onClick={handleCancel} sx={{ border: "1px solid #636B74", color: "#636B74" }}>
          Cancel
        </Button>
        <Button variant="contained" type="submit" sx={{ backgroundColor: "#636B74" }} disabled={Object.keys(errors).length > 0}>
          Save
        </Button>
      </Box>
    </>
  );
};

export default UserFormGroup;
