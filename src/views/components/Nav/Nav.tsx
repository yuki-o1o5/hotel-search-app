import styled from "styled-components";

export default function Nav() {
  return (
    <SContainer>
      <Sh1>Hotel Search app</Sh1>

      <div>
        <Sul>
          <Sli>Home</Sli>
        </Sul>
      </div>
    </SContainer>
  );
}

const SContainer = styled.div`
  background-color: #15273b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  color: #d96644;
`;

const Sul = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
`;

const Sli = styled.li`
  padding: 10px;
`;

const Sh1 = styled.h1`
  padding: 10px;
`;
