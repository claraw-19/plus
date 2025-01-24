import styled from "styled-components";

export default function SingleOrdersListListHeader({ columns, setColumns }) {
  const handleResize = (index, event) => {
    event.preventDefault();
    const startX = event.clientX;
    const startWidth = columns[index].width;
    const nextStartWidth = columns[index + 1]?.width;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;

      const newWidth = startWidth + (deltaX / window.innerWidth) * 100;
      const nextNewWidth = nextStartWidth - (deltaX / window.innerWidth) * 100;

      if (newWidth > 10 && (!nextStartWidth || nextNewWidth > 10)) {
        const updatedColumns = [...columns];
        updatedColumns[index].width = newWidth;
        if (nextStartWidth) updatedColumns[index + 1].width = nextNewWidth;
        setColumns(updatedColumns);
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
      {columns.map((column, index) => (
        <Styled.SingleOrderData
          key={column.id}
          style={{ width: `${column.width}%` }}
        >
          {column.title}
          {index < columns.length - 1 && (
            <Styled.ResizeHandle onMouseDown={(e) => handleResize(index, e)} />
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
