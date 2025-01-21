import allSingleOrdersWithDependencies from "../constants/structuredDummyData.json";
import SingleOrderCard from "@/components/Plus/SingleOrderCard";
import styled from "styled-components";
import SingleOrdersListHeader from "@/components/Plus/SingleOrderListHeader";
import SearchBar from "@/components/Plus/SearchBar";
import { useEffect, useState } from "react";
import KPI from "@/components/Plus/Kpi";
import Filter from "@/components/Plus/Filter";
import Fuse from "fuse.js";

export default function Plus() {
  const [filteredSingleOrders, setFilteredSingleOrders] = useState(
    allSingleOrdersWithDependencies
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    console.log("Filter or search changed");

    //  starte mit allSingle.......

    // filterlogik
    let filterResult = allSingleOrdersWithDependencies;
    for (const filter of filters) {
      if (filter.filterMethod.id === "equals") {
        filterResult = filterResult.filter(
          (singleOrder) =>
            singleOrder[filter.field.object][filter.field.name] == filter.value
        );
      }
      console.log("result: ", filterResult);
      console.log("filterline: ", filter);
    }

    // suchlogik
    let searchResult = filterResult;
    if (searchTerm) {
      const fuse = new Fuse(filterResult, {
        keys: [
          "user.firstName",
          "user.lastName",
          {
            name: "combinedName",
            getFn: (singleOrderWithDependencies) =>
              `${singleOrderWithDependencies.user.firstName} ${singleOrderWithDependencies.user.lastName}`,
          },
          "accessCodesId",
        ],
        threshold: 0.1,
      });

      searchResult = fuse.search(searchTerm).map((result) => result.item);
    }

    // setFilteredS......
    setFilteredSingleOrders(searchResult);
  }, [filters, searchTerm]);

  return (
    <>
      <Styled.Header>
        <h1>PLUS-Lizenzen</h1>
        <Filter filters={filters} setFilters={setFilters} />
        <Styled.KPIAndSearchWrapper>
          <KPI singleOrdersWithDependencies={filteredSingleOrders} />
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Styled.KPIAndSearchWrapper>

        <SingleOrdersListHeader />
      </Styled.Header>
      <Styled.singleOrdersList>
        {filteredSingleOrders.length > 0 ? (
          filteredSingleOrders.map((singleOrderWithDependencies) => (
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
    height: calc(100vh - 247px);
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
