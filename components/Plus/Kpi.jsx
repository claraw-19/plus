import styled from "styled-components";

export default function KPI() {
  const Styled = {
    KpiWrapper: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      /* border: 1.5px solid ${({ theme }) => theme.colors.grey6}; */
      width: 100%;
      background-color: ${({ theme }) => theme.colors.schullv4};
    `,
  };
  return <Styled.KpiWrapper>KPI</Styled.KpiWrapper>;
}
