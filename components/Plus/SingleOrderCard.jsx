import styled from "styled-components";
import SingleOrderDetails from "./SingleOrderDetails";
import { useState } from "react";

export default function SingleOrderCard({ singleOrderWithDependencies }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Styled.SingleOrderContainer $isOpen={isOpen} onClick={toggleDetails}>
        <Styled.SingleOrderData>
          {singleOrderWithDependencies.user.firstName}{" "}
          {singleOrderWithDependencies.user.lastName}
        </Styled.SingleOrderData>
        <Styled.SingleOrderData>
          {singleOrderWithDependencies.user.email}
        </Styled.SingleOrderData>
        <Styled.SingleOrderData>
          {singleOrderWithDependencies.singleOrder.accessCodesId}
        </Styled.SingleOrderData>
        <Styled.SingleOrderData>
          {singleOrderWithDependencies.singleOrder.nextPaymentDate
            ? new Date(
                singleOrderWithDependencies.singleOrder.nextPaymentDate
              ).toLocaleDateString("de-DE")
            : ""}
        </Styled.SingleOrderData>
      </Styled.SingleOrderContainer>
      {isOpen && (
        <SingleOrderDetails
          singleOrderWithDependencies={singleOrderWithDependencies}
        />
      )}
    </>
  );
}

const Styled = {
  SingleOrderContainer: styled.button`
    all: unset;
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    background-color: ${({ $isOpen, theme }) =>
      $isOpen ? theme.colors.grey7 : theme.colors.white};
    cursor: pointer;
    width: 100%;
    &:hover {
      background-color: ${({ theme }) => theme.colors.grey7};
    }
  `,

  SingleOrderData: styled.p`
    flex: 1;
  `,
};
