"use client";

import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "@/app/store/hooks";
import { setSearchUser } from "../users/userSlice";
import { StyledInputBase, StyledSearch, StyledSearchIconWrapper } from "../base/MainNavbar.styles";

const SearchBar = () => {
  const dispatch = useAppDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    dispatch(setSearchUser(query));
  };

  return (
    <StyledSearch>
      <StyledSearchIconWrapper>
        <SearchIcon />
      </StyledSearchIconWrapper>
      <StyledInputBase
        placeholder="Search User…"
        inputProps={{ "aria-label": "search" }}
        onChange={handleSearchChange}
      />
    </StyledSearch>
  );
};

export default SearchBar;
