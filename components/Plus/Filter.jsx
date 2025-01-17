import FilterListIcon from "@mui/icons-material/FilterList";
import styled from "styled-components";

const Styled = {
  FilterListIcon: styled(FilterListIcon)`
    font-size: 2rem;
    padding: 10px;

    cursor: pointer;
    &:hover {
      border-radius: 100%;
      background-color: ${({ theme }) => theme.colors.grey7};
    }
  `,
};

export default function Filter() {
  return <Styled.FilterListIcon />;
}
