import {
  Autocomplete,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { connect } from "react-redux";
import Styles from "./styles.module.scss";
import { Search as SearchIcon } from "@carbon/icons-react";
import { styled, lighten, darken } from "@mui/system";
import { PropertyProps } from "../../../interfaces/main";
import { useEffect, useState } from "react";
import { updateSearchTerm } from "../../../store/actions/app";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.98)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

interface SearchProps {
  properties: PropertyProps[];
  updateSearchTerm: (arg0: string) => void;
}

const Search = ({ properties, updateSearchTerm }: SearchProps) => {
  const [value, setValue] = useState<PropertyProps | null>(null);

  const options = properties?.map((option) => {
    const firstLetter = option.city;
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  useEffect(() => {
    const { id } = value ?? {};
    updateSearchTerm(id as string);
  }, [value]);

  return (
    <div className={Styles.container}>
      <Autocomplete
        id="grouped-demo"
        options={options.sort(
          (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
        )}
        groupBy={(option) => option.city}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        value={value}
        onChange={(event: any, newValue: PropertyProps | null) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField
            focused
            variant="outlined"
            placeholder="City, neighboarhood or address"
            {...params}
          />
        )}
        renderGroup={(params) => (
          <li>
            <GroupHeader>{params.group}</GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
      />
    </div>
  );
};

interface StateProps {
  properties: PropertyProps[];
}

export default connect(
  (state: StateProps) => ({
    properties: state.properties,
  }),
  { updateSearchTerm }
)(Search);
