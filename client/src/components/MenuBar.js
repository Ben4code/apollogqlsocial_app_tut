import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

export default function MenuBar() {
  const handleItemClick = (e, { name }) => setActiveItem(name);
  const pathName = window.location.pathname;
  const path = pathName === '/' ? 'home' : pathName.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  return (
    <div>
      <Menu pointing secondary size='massive' color='blue'>
        <Container>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to='/'
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to='/login'
          />
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
          to='/register'
          />
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={()=> console.log("Logout clicked")}
          />
        </Menu.Menu>
        </Container>
      </Menu>

      {/* <Segment>
          <img src='/images/wireframe/media-paragraph.png' />
        </Segment> */}
    </div>
  );
}
