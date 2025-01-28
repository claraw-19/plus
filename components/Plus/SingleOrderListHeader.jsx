import styled from "styled-components";

export default function SingleOrdersListListHeader({
  allColumns,
  setAllColumns,
}) {
  const handleResize = (column, event) => {
    let indexInAllColumns;
    let indexNextVisibleColumnInAllColumns;
    for (let index = 0; index < allColumns.length; index++) {
      if (indexInAllColumns !== undefined && allColumns[index].visible) {
        indexNextVisibleColumnInAllColumns = index;
        break;
      }
      if (allColumns[index].key === column.key) {
        indexInAllColumns = index;
      }
    }

    event.preventDefault();
    const startX = event.clientX;
    const startWidth = allColumns[indexInAllColumns].width;
    const nextStartWidth =
      allColumns[indexNextVisibleColumnInAllColumns]?.width;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;

      const newWidth = startWidth + (deltaX / window.innerWidth) * 100;
      const nextNewWidth = nextStartWidth - (deltaX / window.innerWidth) * 100;

      if (newWidth > 10 && (!nextStartWidth || nextNewWidth > 10)) {
        const updatedColumns = [...allColumns];
        updatedColumns[indexInAllColumns].width = newWidth;
        if (nextStartWidth) {
          updatedColumns[indexNextVisibleColumnInAllColumns].width =
            nextNewWidth;
        }
        setAllColumns(updatedColumns);
      }
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <Styled.SingleOrderContainer>
      {allColumns
        .filter((column) => column.visible)
        .map((column, index) => (
          <Styled.SingleOrderData
            key={column.key}
            style={{ width: `${column.width}%` }}
          >
            {column.displayName}
            {index < allColumns.length - 1 && (
              <Styled.ResizeHandle
                onMouseDown={(e) => handleResize(column, e)}
              />
            )}
          </Styled.SingleOrderData>
        ))}
    </Styled.SingleOrderContainer>
  );
}

const Styled = {
  ResizeHandle: styled.div`
    width: 5px;
    cursor: col-resize;
    background-color: transparent;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    &:hover {
      background-color: #ccc;
    }
  `,

  SingleOrderContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    position: relative;
  `,

  SingleOrderData: styled.div`
    position: relative;
    font-family: roboto-bold;
    padding: 20px 0 10px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};
