import React  from 'react';
import { Link } from 'react-router-dom';

import Title from 'react-bulma-companion/lib/Title';
import Navbar from 'react-bulma-companion/lib/Navbar';

export default function NavbarEndItems() {
  return (
    <React.Fragment>
      <Navbar.Item
        to="/iselftoken"
        component={Link}
      >
        <Title size="6">
          $iSELF Token
        </Title>
      </Navbar.Item>
      <Navbar.Item
        to="/litepaper"
        component={Link}
      >
        <Title size="6">
          Litepaper
        </Title>
      </Navbar.Item>
      <Navbar.Item
        to="/staking"
        component={Link}
      >
        <Title size="6">
          Staking
        </Title>
      </Navbar.Item>
    </React.Fragment>
  );
}
