import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -5rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: -6rem;
  }

  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-tittle);

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    };
    header {
      display: flex;
      align-items: center;  
      justify-content: space-between;
    };
    &.background {
      background: var(--green)
    }
  }
`