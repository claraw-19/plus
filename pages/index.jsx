import allSingleOrdersWithDependencies from "../constants/structuredDummyData.json";
import SingleOrderCard from "@/components/Plus/SingleOrderCard";
import styled from "styled-components";
import SingleOrdersListHeader from "@/components/Plus/SingleOrderListHeader";
import SearchBar from "@/components/Plus/SearchBar";
import { useEffect, useState } from "react";
import KPI from "@/components/Plus/Kpi";
import Filter from "@/components/Plus/Filter";
import { filter, search } from "@/utils/filterAndSearch";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import defaultColumns from "@/constants/defaultColumns";

export default function Plus() {
  const [singleOrders, setSingleOrders] = useState(
    allSingleOrdersWithDependencies
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const [allColumns, setAllColumns] = useState(defaultColumns);

  console.log("allColumns: ", allColumns);

  useEffect(() => {
    const savedColumnWidths = localStorage.getItem("columnWidths");
    if (savedColumnWidths) {
      setAllColumns(JSON.parse(savedColumnWidths));
    }
  }, []);

  useEffect(() => {
    if (allColumns) {
      localStorage.setItem("columnWidths", JSON.stringify(allColumns));
    }
  }, [allColumns]);

  useEffect(() => {
    const filteredSingleOrders = filter(
      allSingleOrdersWithDependencies,
      filters
    );

    const searchedSingleOrders = search(searchTerm, filteredSingleOrders);
    setSingleOrders(searchedSingleOrders);
  }, [filters, searchTerm]);

  const resetColumnWidths = () => {
    const equalWidth = 100 / allColumns.length;
    const resetColumns = allColumns
      .filter((column) => column.visible)
      .map((column) => ({
        ...column,
        width: equalWidth,
      }));
    setAllColumns(resetColumns);
  };

  return (
    <>
      <Styled.Header>
        <h1>PLUS-Lizenzen</h1>
        <Filter
          allColumns={allColumns}
          setAllColumns={setAllColumns}
          filters={filters}
          setFilters={setFilters}
          setSingleOrders={setSingleOrders}
          allSingleOrdersWithDependencies={allSingleOrdersWithDependencies}
        />

        <Styled.KPIAndSearchWrapper>
          <KPI singleOrdersWithDependencies={singleOrders} />
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Styled.ViewColumnIcon onClick={resetColumnWidths} />
        </Styled.KPIAndSearchWrapper>
        {allColumns && (
          <SingleOrdersListHeader
            allColumns={allColumns}
            setAllColumns={setAllColumns}
          />
        )}
      </Styled.Header>
      {allColumns && (
        <Styled.singleOrdersList>
          {singleOrders.length > 0 ? (
            singleOrders.map((singleOrderWithDependencies) => (
              <li key={singleOrderWithDependencies.singleOrder.id}>
                <SingleOrderCard
                  allColumns={allColumns}
                  singleOrderWithDependencies={singleOrderWithDependencies}
                />
              </li>
            ))
          ) : (
            <p>Keine Lizenzen gefunden.</p>
          )}
        </Styled.singleOrdersList>
      )}
    </>
  );
}

const Styled = {
  ViewColumnIcon: styled(ViewColumnIcon)`
    font-size: 2rem;
    padding: 10px;
    cursor: pointer;
    &:hover {
      border-radius: 100%;
      background-color: ${({ theme }) => theme.colors.grey7};
    }
  `,
  singleOrdersList: styled.ul`
    list-style: none;
    margin: 0;
    padding: 0 16px;
    overflow-y: auto;
    height: calc(100vh - 320px);
  `,

  Header: styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 1;
    padding: 0 16px;
    overflow: hidden;
  `,

  KPIAndSearchWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 0;
    gap: 1rem;
  `,
};
