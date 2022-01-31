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
    <div style={{ height: '400vh' }} id="homepage-text1">
      <div className="dot">
        <h1>AI Human</h1>
        <div className="tagline">
          <div>AI digital workforce</div>
          <div>Earn online</div>
        </div>
      </div>
    </div>
    <div style={{ height: '200vh' }} id="homepage-text2">
      <div className="dot">
        <h1>iSELF Token</h1>
        <div className="tagline text">
          <p>A currency to digital avatar generation and usability.</p>
          <button type="button" className="buy-token-btn">
            Buy $iSELF Token
          </button>
        </div>
      </div>
    </div>
    <div style={{ height: '200vh' }} id="homepage-text3">
      <div className="dot" id="iavatarverse-info">
        <h3>iAvatarverse</h3>
        <h1>
          WE ARE ON A MISSION TO GIVE ACCESS TO DIGITAL ECONOMY TO ALL
          EARTHLINGS, AND DEFINE THE FUTURE OF WORK
        </h1>
        <p>
          Artificial intelligent avatars are interoperable across metaverses,
          means it allows you to explore varied metaverses with your avatar
          creations
        </p>
        <p>
          iAvatars can be trained on varied skills, such as dancing, yoga,
          modelling and customer services, which allows you to employ them in
          varied metaverse and learn from other avatars
        </p>
      </div>
    </div>
    <div style={{ height: '200vh' }} id="homepage-text4">
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
    </div>
    <div style={{ height: '200vh' }} id="homepage-text5">
      <div className="dot">
        <h1>table</h1>A table is an item of furniture with a flat top and one or
        more legs, used as a surface for working at, eating from or on which to
        place things.[1][2]
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
