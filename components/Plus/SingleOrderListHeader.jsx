import styled from "styled-components";

export default function SingleOrdersListListHeader() {
  return (
    <Styled.SingleOrderContainer>
      <Styled.SingleOrderData>Name</Styled.SingleOrderData>
      <Styled.SingleOrderData>E-Mail</Styled.SingleOrderData>
      <Styled.SingleOrderData>Lizenzcode</Styled.SingleOrderData>
      <Styled.SingleOrderData>Nächstes Zahlungsdatum</Styled.SingleOrderData>
    </Styled.SingleOrderContainer>
  );
}

const Styled = {
  SingleOrderContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray4};
    }
  `,

  SingleOrderData: styled.p`
    flex: 1;
    font-family: roboto-bold;
  `,
};
