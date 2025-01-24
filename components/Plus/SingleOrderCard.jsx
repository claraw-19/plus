import styled from "styled-components";
import SingleOrderDetails from "./SingleOrderDetails";
import { useState } from "react";

export default function SingleOrderCard({
  singleOrderWithDependencies,
  columns,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen((prev) => !prev);
  };

  console.log(columns);

  return (
    <>
      <Styled.SingleOrderContainer
        columns={columns}
        $isOpen={isOpen}
        onClick={toggleDetails}
      >
        {columns.map((column) => (
          <Styled.SingleOrderData key={column.id}>
            {column.id === "name"
              ? `${singleOrderWithDependencies.user.firstName} ${singleOrderWithDependencies.user.lastName}`
              : column.id === "email"
                ? singleOrderWithDependencies.user.email
                : column.id === "license"
                  ? singleOrderWithDependencies.singleOrder.accessCodesId
                  : column.id === "paymentDate"
                    ? singleOrderWithDependencies.singleOrder.nextPaymentDate
                      ? new Date(
                          singleOrderWithDependencies.singleOrder.nextPaymentDate
                        ).toLocaleDateString("de-DE")
                      : ""
                    : ""}
          </Styled.SingleOrderData>
        ))}
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
    display: grid;
    grid-template-columns: ${({ columns }) =>
      columns.map((col) => `${col.width}%`).join(" ")};
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
    word-wrap: break-word;
    padding-right: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};
