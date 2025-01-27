import styled from "styled-components";
import SingleOrderDetails from "./SingleOrderDetails";
import { useState } from "react";

export default function SingleOrderCard({
  singleOrderWithDependencies,
  allColumns,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Styled.SingleOrderContainer
        $allColumns={allColumns}
        $isOpen={isOpen}
        onClick={toggleDetails}
      >
        {allColumns
          .filter((column) => column.visible)
          .map((column) => (
            <Styled.SingleOrderData key={column.key}>
              {console.log("column: ", column)}
              {singleOrderWithDependencies[column.object][column.name]}
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
    grid-template-columns: ${({ $allColumns }) =>
      $allColumns.map((col) => `${col.width}%`).join(" ")};
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
