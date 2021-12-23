import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

// Some styles for MUI
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default Item;
