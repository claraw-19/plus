import allSingleOrdersWithDependencies from "../constants/dummyData.json";
import SingleOrderCard from "@/components/Plus/SingleOrderCard";
import styled from "styled-components";
import SingleOrdersListHeader from "@/components/Plus/SingleOrderListHeader";
import SearchBar from "@/components/Plus/SearchBar";
import { useState } from "react";
import KPI from "@/components/Plus/Kpi";

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

export default function Plus() {
  const [singleOrdersWithDependencies, setSingleOrdersWithDependencies] =
    useState(allSingleOrdersWithDependencies);

  return (
    <>
      <Styled.Header>
        <h1>PLUS-Lizenzen</h1>
        <Styled.KPIAndSearchWrapper>
          <KPI singleOrdersWithDependencies={singleOrdersWithDependencies} />
          <SearchBar
            singleOrdersWithDependencies={singleOrdersWithDependencies}
            onSearch={setSingleOrdersWithDependencies}
          />
        </Styled.KPIAndSearchWrapper>

        <SingleOrdersListHeader />
      </Styled.Header>
      <Styled.singleOrdersList>
        {singleOrdersWithDependencies.length > 0 ? (
          singleOrdersWithDependencies.map((singleOrderWithDependencies) => (
            <li key={singleOrderWithDependencies.id}>
              <SingleOrderCard
                singleOrderWithDependencies={singleOrderWithDependencies}
              />
            </li>
          ))
        ) : (
          <p>Keine User gefunden.</p>
        )}
      </Styled.singleOrdersList>
    </>
  );
}
