import React  from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bulma-companion/lib/Navbar';
import Title from 'react-bulma-companion/lib/Title';

export default function NavbarStartItems() {
  return (
    <React.Fragment>
      <Navbar.Start>
        <Navbar.Item
          className="is-hidden-mobile"
          to="/avatars"
          tab
          component={Link}
        >
          <Title size="6">AI Avatars</Title>
        </Navbar.Item>
        <Navbar.Item
          className="is-hidden-mobile"
          to="/avatarverse"
          tab
          component={Link}
        >
          <Title size="6">
            Avatarverse
          </Title>
        </Navbar.Item>
        <Navbar.Item
          className="is-hidden-mobile"
          to="/roadmap"
          tab
          component={Link}
        >
          <Title size="6">
            Roadmap
          </Title>
        </Navbar.Item>
        <Navbar.Item
          className="is-hidden-mobile"
          to="/showcase"
          tab
          component={Link}
        >
          <Title size="6">
            Showcase
          </Title>
        </Navbar.Item>
        <Navbar.Item
          className="is-hidden-mobile"
          to="/team"
          tab
          component={Link}
        >
          <Title size="6">
            Team
          </Title>
        </Navbar.Item>
        <Navbar.Item
          className="is-hidden-mobile"
          to="/settings"
          tab
          component={Link}
        >
          <Title size="6">
            Settings
          </Title>
        </Navbar.Item>
      </Navbar.Start>
    </React.Fragment>
  );
}
