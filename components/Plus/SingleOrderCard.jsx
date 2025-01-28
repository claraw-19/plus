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
            <Styled.SingleOrderData
              key={column.key}
              style={{ width: `${column.width}%` }}
            >
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
  SingleOrderContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    position: relative;
  `,

  SingleOrderData: styled.p`
    word-wrap: break-word;
    padding-right: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};
