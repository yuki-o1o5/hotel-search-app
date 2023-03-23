import styled from "styled-components";

export default function Nav() {
  return (
    <SContainer>
      <div>Hotel Search app</div>

      <div>
        <Sul>
          <Sli>Home</Sli>
          <Sli>My Favolite</Sli>
        </Sul>
      </div>
    </SContainer>
  );
}

const SContainer = styled.div`
  background-color: #b3f0fb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Sul = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

const Sli = styled.li`
  padding: 10px;
`;
