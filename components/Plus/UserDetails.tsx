import styled from "styled-components";

export default function UserDetails({ user }) {
  const Styled = {
    DetailsContainer: styled.div`
      display: flex;
      justify-content: space-between;
      padding: 8px 20px;
      border-bottom: 1px solid #ccc;
    `,

    DetailsData: styled.p`
      flex: 1;
    `,
  };
  return (
    <Styled.DetailsContainer>
      <Styled.DetailsData>
        Weitere Details zu {user.firstName} {user.lastName}
      </Styled.DetailsData>
    </Styled.DetailsContainer>
  );
}
