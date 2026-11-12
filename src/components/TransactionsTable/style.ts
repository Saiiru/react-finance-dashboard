import styled from "styled-components";

export const Container = styled.section`
  margin-top: 3rem;
  max-width: 100%;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  @media (max-width: 760px) {
    margin-top: 2rem;
  }

  table {
    width: 100%;
    min-width: 600px;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: var(--shape);

      color: var(--text-body);
      border-radius: 0.25rem;

      &:first-child {
        color: var(--text-tittle)
      }

      &.deposit {
        color: var(--green);
      }
      &.withdraw {
        color: var(--red);
      }
    }

  }
`