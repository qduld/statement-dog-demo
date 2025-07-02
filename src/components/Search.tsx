import * as React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export const Search = () => {
  return (
    <div className="flex">
      <InputBase
        sx={{ ml: 1, flex: 1, width: 428 }}
        placeholder="輸入台／美股代號，查看公司價值"
        inputProps={{ "aria-label": "輸入台／美股代號，查看公司價值" }}
      />
      <IconButton type="button" aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
};
