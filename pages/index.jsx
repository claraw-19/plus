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
import defaultColumns from "@/constants/allColumns.json";

export default function Plus() {
  const [singleOrders, setSingleOrders] = useState(
    allSingleOrdersWithDependencies
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [savedViews, setSavedViews] = useState([]);
  const [selectedViewId, setSelectedViewId] = useState(undefined);
  const allColumns =
    savedViews.find((view) => view.id === selectedViewId)?.allColumns ||
    defaultColumns;

  const filters =
    savedViews.find((view) => view.id === selectedViewId)?.filters || [];

  const setAllColumns = (newColumns) => {
    const updatedViews = savedViews.map((view) =>
      view.id === selectedViewId ? { ...view, allColumns: newColumns } : view
    );
    setSavedViews(updatedViews);
    console.log("1", newColumns, updatedViews, savedViews, selectedViewId);
  };

  const setFilters = (newFilters) => {
    const updatedViews = savedViews.map((view) =>
      view.id === selectedViewId ? { ...view, filters: newFilters } : view
    );
    setSavedViews(updatedViews);
    console.log("2", updatedViews, savedViews);
  };

  useEffect(() => {
    console.log("allColumns:", allColumns);
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
    const equalWidth =
      100 / allColumns.filter((column) => column.visible).length;
    const resetColumns = allColumns.map((column) => ({
      ...column,
      width: column.visible ? equalWidth : 0,
    }));
    setAllColumns(resetColumns);
    console.log("setAllColumns 1");
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
          savedViews={savedViews}
          setSavedViews={setSavedViews}
          setSingleOrders={setSingleOrders}
          allSingleOrdersWithDependencies={allSingleOrdersWithDependencies}
          selectedViewId={selectedViewId}
          setSelectedViewId={setSelectedViewId}
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
