import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Nav = () => {
  return (
    <Navbar>
      <Logo>
        <Link to='/'>Home</Link>
      </Logo>
      <Ul>
        <Link to='/brush'>
          <Li>Paintbrush</Li>
        </Link>
      </Ul>
    </Navbar>
  );
};
export default Nav;

const Navbar = styled.nav`
  width: 100%;
  height: 40px;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

const Ul = styled.ul``;
const Li = styled.ul``;

const Logo = styled.h1``;
