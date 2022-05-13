import React from 'react';
import { Menu } from 'semantic-ui-react';

const NavBar = () => {
    return (
        <div>
            <Menu stackable size='huge'>
                <Menu.Item>
                    <img src='https://react.semantic-ui.com/logo.png' alt="logo"/>
                </Menu.Item>

                <Menu.Item
                    name='TensorMap'
                    active
                    style={{"fontWeight":"bold"}}

                />
            </Menu>
        </div>
    );
};

export default NavBar;
