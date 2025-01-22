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
    // filterlogik
    let filterResult = allSingleOrdersWithDependencies;
    for (const filter of filters) {
      console.log("filter: ", filter);
      if (filter.filterMethod.id === "isNotEmpty") {
        filterResult = filterResult.filter((singleOrder) => {
          const fieldValue =
            singleOrder[filter.field.object][filter.field.name];
          return fieldValue;
        });
      }
      if (filter.filterMethod.id === "isEmpty") {
        filterResult = filterResult.filter((singleOrder) => {
          const fieldValue =
            singleOrder[filter.field.object][filter.field.name];
          return !fieldValue;
        });
      }
      if (filter.filterMethod.id === "equals") {
        filterResult = filterResult.filter((singleOrder) => {
          const fieldValue =
            singleOrder[filter.field.object][filter.field.name];
          if (filter.field.type === "string") {
            return fieldValue.toLowerCase() === filter.value.toLowerCase();
          } else if (filter.field.type === "number") {
            let filterValueAsNumber;
            if (filter.value.includes(",")) {
              filterValueAsNumber = Number(filter.value.replace(",", "."));
            } else {
              filterValueAsNumber = Number(filter.value);
            }
            return fieldValue === filterValueAsNumber;
          } else if (filter.field.type === "date") {
            let filterDate;
            if (filter.value.toLowerCase() === "heute") {
              const today = new Date();
              filterDate = today.toISOString().split("T")[0];
            } else {
              const [day, month, year] = filter.value.split(".");
              filterDate = `${year}-${month}-${day}`;
            }
            const fieldValueISO = new Date(fieldValue)
              .toISOString()
              .split("T")[0];
            return fieldValueISO === filterDate;
          }
        });
      }
      if (filter.filterMethod.id === "notEquals") {
        filterResult = filterResult.filter((singleOrder) => {
          const fieldValue =
            singleOrder[filter.field.object][filter.field.name];
          if (filter.field.type === "string") {
            return fieldValue.toLowerCase() !== filter.value.toLowerCase();
          } else if (filter.field.type === "number") {
            let filterValueAsNumber;
            if (filter.value.includes(",")) {
              filterValueAsNumber = Number(filter.value.replace(",", "."));
            } else {
              filterValueAsNumber = Number(filter.value);
            }
            return fieldValue !== filterValueAsNumber;
          } else if (filter.field.type === "date") {
            let filterDate;
            if (filter.value.toLowerCase() === "heute") {
              const today = new Date();
              filterDate = today.toISOString().split("T")[0];
            } else {
              const [day, month, year] = filter.value.split(".");
              filterDate = `${year}-${month}-${day}`;
            }
            const fieldValueISO = new Date(fieldValue)
              .toISOString()
              .split("T")[0];
            return fieldValueISO !== filterDate;
          }
        });
      }
      if (filter.filterMethod.id === "lessOrEqual") {
        filterResult = filterResult.filter((singleOrder) => {
          const fieldValue =
            singleOrder[filter.field.object][filter.field.name];
          if (filter.field.type === "number") {
            let filterValueAsNumber;
            if (filter.value.includes(",")) {
              filterValueAsNumber = Number(filter.value.replace(",", "."));
            } else {
              filterValueAsNumber = Number(filter.value);
            }
            return fieldValue <= filterValueAsNumber;
          } else if (filter.field.type === "date") {
            let filterDate;
            if (filter.value.toLowerCase() === "heute") {
              const today = new Date();
              filterDate = today.toISOString().split("T")[0];
            } else {
              const [day, month, year] = filter.value.split(".");
              filterDate = `${year}-${month}-${day}`;
            }
            const fieldValueISO = new Date(fieldValue)
              .toISOString()
              .split("T")[0];
            return fieldValueISO <= filterDate;
          }
        });
      }
      if (filter.filterMethod.id === "greaterOrEqual") {
        filterResult = filterResult.filter((singleOrder) => {
          const fieldValue =
            singleOrder[filter.field.object][filter.field.name];
          if (filter.field.type === "number") {
            let filterValueAsNumber;
            if (filter.value.includes(",")) {
              filterValueAsNumber = Number(filter.value.replace(",", "."));
            } else {
              filterValueAsNumber = Number(filter.value);
            }
            return fieldValue >= filterValueAsNumber;
          } else if (filter.field.type === "date") {
            let filterDate;
            if (filter.value.toLowerCase() === "heute") {
              const today = new Date();
              filterDate = today.toISOString().split("T")[0];
            } else {
              const [day, month, year] = filter.value.split(".");
              filterDate = `${year}-${month}-${day}`;
            }
            const fieldValueISO = new Date(fieldValue)
              .toISOString()
              .split("T")[0];
            return fieldValueISO >= filterDate;
          }
        });
      }
      if (filter.filterMethod.id === "contains") {
        filterResult = filterResult.filter((singleOrder) => {
          const fieldValue =
            singleOrder[filter.field.object][filter.field.name];
          return fieldValue.toLowerCase().includes(filter.value.toLowerCase());
        });
      }
      if (filter.filterMethod.id === "notContains") {
        filterResult = filterResult.filter((singleOrder) => {
          const fieldValue =
            singleOrder[filter.field.object][filter.field.name];
          return !fieldValue.toLowerCase().includes(filter.value.toLowerCase());
        });
      }
      if (filter.filterMethod.id === "startsWith") {
        filterResult = filterResult.filter((singleOrder) => {
          const fieldValue =
            singleOrder[filter.field.object][filter.field.name];
          return fieldValue
            .toLowerCase()
            .startsWith(filter.value.toLowerCase());
        });
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
