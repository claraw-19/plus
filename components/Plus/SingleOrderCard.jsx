import styled from "styled-components";
import SingleOrderDetails from "./SingleOrderDetails";
import { useState } from "react";

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

export default function SingleOrderCard({ singleOrderWithDependencies }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Styled.SingleOrderContainer $isOpen={isOpen} onClick={toggleDetails}>
        <Styled.SingleOrderData>
          {singleOrderWithDependencies.firstName}{" "}
          {singleOrderWithDependencies.lastName}
        </Styled.SingleOrderData>
        <Styled.SingleOrderData>
          {singleOrderWithDependencies.email}
        </Styled.SingleOrderData>
        <Styled.SingleOrderData>
          {singleOrderWithDependencies.accessCodesId}
        </Styled.SingleOrderData>
        <Styled.SingleOrderData>
          {singleOrderWithDependencies.nextPaymentDate
            ? new Date(
                singleOrderWithDependencies.nextPaymentDate
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
