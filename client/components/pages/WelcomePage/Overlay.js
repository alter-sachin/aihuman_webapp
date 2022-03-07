import React, { forwardRef } from 'react';

const Overlay = forwardRef(({ caption, scroll }, ref) => (
  <div
    ref={ref}
    onScroll={(e) => {
      scroll.current =
        e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
      caption.current.innerText = scroll.current.toFixed(2);
    }}
    className="scroll"
  >
    <div className="dot">
      <h1>AI Human</h1>
      <div className="tagline">
        <div>Your digital workforce to help you play & earn</div>
        <div>Autonomous Workers for the Metaverse & Real World</div>
      </div>
    </div>

    <div className="dot">
      <h1>SELF Token</h1>
      <div className="tagline text">
        <p>A currency to create avatars with skills, Deploy them for Real Work & Real Money.</p>
        <button type="button" className="buy-token-btn">
          Buy $iSELF Token
        </button>
      </div>
    </div>

    <div className="dot" id="iavatarverse-info">
      <h3>Avatarverse</h3>
      <div id="inner">
        <h1>
          OUR AVATARS ARE ON A MISSION TO GIVE YOU ACCESS TO THE DIGITAL ECONOMY,
          WHILE LEARNING TO BE MORE HUMAN BY BEING DEPLOYED FOR ECONOMIC GOOD.
        </h1>
        <p>
          Artificial intelligent avatars are interoperable across metaverses,
          Explore varied metaverses with your avatar
          creations
        </p>
        <p>
          Avatars can be trained on varied skills, such as dancing, yoga,
          modelling and customer services, which allows you to employ them in
          varied metaverse and learn from other avatars.
        </p>
      </div>
    </div>

    <div className="dot" id="roadmap-info">
      <h1>Roadmap</h1>
      <div className="roadmap-container">
        <div className="roadmap-item">
          <h2>Quarter 1</h2>
          <ul className="roadmap-list">
            <li>
              <div className="roadmap-list-dot" />
              item 1
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 2
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 3
            </li>
          </ul>
          <div className="roadmap-bottom-line" />
          <div className="roadmap-bottom-orb" />
        </div>
        <div className="roadmap-item">
          <h2>Quarter 2</h2>
          <ul className="roadmap-list">
            <li>
              <div className="roadmap-list-dot" />
              item 1
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 2
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 3
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 4
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 5
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 6
            </li>
          </ul>
          <div className="roadmap-bottom-line" />
          <div className="roadmap-bottom-orb" />
        </div>
        <div className="roadmap-item">
          <h2>Quarter 3</h2>
          <ul className="roadmap-list">
            <li>
              <div className="roadmap-list-dot" />
              item 1
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 2
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 3
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 4
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 5
            </li>
          </ul>
          <div className="roadmap-bottom-line" />
          <div className="roadmap-bottom-orb" />
        </div>
        <div className="roadmap-item">
          <h2>Quarter 4</h2>
          <ul className="roadmap-list">
            <li>
              <div className="roadmap-list-dot" />
              item 1
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 2
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 3
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 4
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 5
            </li>
            <li>
              <div className="roadmap-list-dot" />
              item 6
            </li>
          </ul>
          <div className="roadmap-bottom-line" />
          <div className="roadmap-bottom-orb" />
        </div>
      </div>
    </div>

    <div style={{ height: '200vh' }} id="homepage-text5">
      <div className="dot" id="gateway-metaverse">
        <img
          src="https://assets-global.website-files.com/61dbe71db67f565007131340/61dbe71db67f569ba81313ef_XOID_XETA-(1)right%20(1).png"
          alt="Avatar"
        />
        <div className="gateway-metaverse-text">
          <h1>This is your gateway to the metaverse</h1>
          <p>
            An operating system to forge your Web 3.0 identity & dashboard. Gain
            access to exclusive tools, communities, and worlds...
          </p>
        </div>
        <img
          src="https://assets-global.website-files.com/61dbe71db67f565007131340/61dbe71db67f568e141313a2_XOID_XEDE-1edit.png"
          alt="Avatar"
        />
      </div>
    </div>
    <div style={{ height: '200vh' }} id="homepage-text6">
      <div className="dot">
        <h1>laptop</h1>A laptop, laptop computer, or notebook computer is a
        small, portable personal computer (PC) with a screen and alphanumeric
        keyboard.
      </div>
    </div>
    <div style={{ height: '200vh' }} id="homepage-text7">
      <div className="dot">
        <h1>zeppelin</h1>A Zeppelin is a type of rigid airship named after the
        German inventor Count Ferdinand von Zeppelin (German pronunciation:
        [ˈt͡sɛpəliːn]) who pioneered rigid airship development at the beginning
        of the 20th century.
      </div>
    </div>
    <span className="caption" ref={caption}>
      0.00
    </span>
  </div>
));

export default Overlay;
