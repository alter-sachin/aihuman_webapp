import React  from 'react';

import Navbar from 'react-bulma-companion/lib/Navbar';
import Title from 'react-bulma-companion/lib/Title';

export default function NavbarStartItems() {
  return (
    <Navbar.Start>
      <Navbar.Item className="is-hidden-mobile" tab>
        <a href="#homepage-text1">
          <Title size="6">AI Avatars</Title>
        </a>
      </Navbar.Item>
      <Navbar.Item className="is-hidden-mobile" tab>
        <a href="#homepage-text2">
          <Title size="6">Avatarverse</Title>
        </a>
      </Navbar.Item>
      <Navbar.Item className="is-hidden-mobile" tab>
        <a href="#homepage-text3">
          <Title size="6">Roadmap</Title>
        </a>
      </Navbar.Item>
      <Navbar.Item className="is-hidden-mobile" tab>
        <a href="#homepage-text4">
          <Title size="6">Showcase</Title>
        </a>
      </Navbar.Item>
      <Navbar.Item className="is-hidden-mobile" tab>
        <a href="#homepage-text5">
          <Title size="6">Team</Title>
        </a>
      </Navbar.Item>
      <Navbar.Item className="is-hidden-mobile" tab>
        <Title size="6">Settings</Title>
      </Navbar.Item>
    </Navbar.Start>
  );
}
