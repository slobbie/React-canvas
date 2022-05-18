import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Nav = () => {
  return (
    <Navbar>
      <Ul>
        <Link to='/canvas-example'>
          <Li>Wave</Li>
        </Link>
        <Link to='/card'>
          <Li>Card</Li>
        </Link>
        <Link to='/brush'>
          <Li>Paintbrush</Li>
        </Link>
        <Link to='/light'>
          <Li>light</Li>
        </Link>
        {/* <Link to='/typo'>
          <Li>Typo</Li>
        </Link> */}

        {/* <Link to='/tag'>
          <Li>Tag</Li>
        </Link> */}
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
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
`;

const Ul = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  font-size: 20px;
`;
const Li = styled.ul`
  margin: 30px;
`;

const Logo = styled.h1``;
