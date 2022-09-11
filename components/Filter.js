// styled
import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables.js';

// router
import Link from 'next/link';

export default function Filter() {

  return (
    <StyledFilter>
      <Link className="filter" id="html" href="/tags/@HTML">HTML</Link>
      <Link className="filter" id="css" href="/tags/@CSS">CSS</Link>
      <Link className="filter" id="javascript" href="/tags/@JavaScript">JavaScript</Link>
      <Link className="filter" id="react" href="/tags/@React">React</Link>
      <Link className="filter" id="apis" href="/tags/@Apis">APIs</Link>
    </StyledFilter>
  )
}

const StyledFilter = styled.div`
  display: flex;
  width: 60%;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  @media(max-width: 1250px){
    width: 90%;
  }
  @media(max-width: 700px){
    width: 95%;
    flex-wrap: wrap;
    justify-content: center;
  }
  a {
    color: ${pallette.helperGrey};
    font-size: 20px;
    &:hover {
      text-decoration: underline;
      text-underline-position: under;
      color: white;
    }
    @media(max-width: 700px){
      margin: 0 10px;
    }
  }
  .active {
    font-weight: 700;
    color: white;
    text-decoration: underline;
    text-underline-position: under;
  }
`;