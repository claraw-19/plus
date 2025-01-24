import allSingleOrdersWithDependencies from "../constants/structuredDummyData.json";
import SingleOrderCard from "@/components/Plus/SingleOrderCard";
import styled from "styled-components";
import SingleOrdersListHeader from "@/components/Plus/SingleOrderListHeader";
import SearchBar from "@/components/Plus/SearchBar";
import { useEffect, useState } from "react";
import KPI from "@/components/Plus/Kpi";
import Filter from "@/components/Plus/Filter";
import { filter, search } from "@/utils/filterAndSearch";

export default function Plus() {
  const [singleOrders, setSingleOrders] = useState(
    allSingleOrdersWithDependencies
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const [columns, setColumns] = useState([
    { id: "name", title: "Name", width: 25 },
    { id: "email", title: "E-Mail", width: 25 },
    { id: "license", title: "Lizenzcode", width: 25 },
    {
      id: "paymentDate",
      title: "Nächstes Zahlungsdatum",
      width: 25,
    },
  ]);

  useEffect(() => {
    const filteredSingleOrders = filter(
      allSingleOrdersWithDependencies,
      filters
    );

    const searchedSingleOrders = search(searchTerm, filteredSingleOrders);
    setSingleOrders(searchedSingleOrders);
  }, [filters, searchTerm]);

  return (
    <>
      <Styled.Header>
        <h1>PLUS-Lizenzen</h1>
        <Filter
          filters={filters}
          setFilters={setFilters}
          setSingleOrders={setSingleOrders}
          allSingleOrdersWithDependencies={allSingleOrdersWithDependencies}
        />
        <Styled.KPIAndSearchWrapper>
          <KPI singleOrdersWithDependencies={singleOrders} />
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Styled.KPIAndSearchWrapper>
        <SingleOrdersListHeader columns={columns} setColumns={setColumns} />
      </Styled.Header>
      <Styled.singleOrdersList>
        {singleOrders.length > 0 ? (
          singleOrders.map((singleOrderWithDependencies) => (
            <li key={singleOrderWithDependencies.singleOrder.id}>
              <SingleOrderCard
                singleOrderWithDependencies={singleOrderWithDependencies}
              />
            </li>
          ))
        ) : (
          <p>Keine Lizenzen gefunden.</p>
        )}
      </Styled.singleOrdersList>
    </>
  );
}

const Styled = {
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
