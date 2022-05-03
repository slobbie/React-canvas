import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Nav = () => {
  return (
    <Navbar>
      <Logo>
        <Link to='/'>Home</Link>
      </Logo>
      <Ul>
        <Link to='/wave'>
          <Li>Wave</Li>
        </Link>
        <Link to='/light'>
          <Li>lightWave</Li>
        </Link>
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
  display: flex;
  align-items: center;
  background-color: #fff;
`;

const Ul = styled.ul`
  display: flex;
`;
const Li = styled.ul``;

const Logo = styled.h1``;
