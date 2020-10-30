import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function Navigation() {
    return (
        <Navbar bg="danger" variant="dark">
            <Navbar.Brand href="/">PokéDex</Navbar.Brand>
            <Nav className="ml-auto">
                <NavDropdown title="Search" id="basic-nav-dropdown">
                    <NavLink className="dropdown-item" to="/pokemon">Pokemon</NavLink>
                    <NavLink className="dropdown-item" to="/moves">Moves</NavLink>
                    <NavDropdown.Divider />
                    <NavLink className="dropdown-item" to="/items">Items</NavLink>
                    <NavLink className="dropdown-item" to="/machines">TMs/HMs</NavLink>
                </NavDropdown>
                <NavLink className="nav-link" to="/games">Games</NavLink>
                <NavDropdown title="Calculators" id="basic-nav-dropdown">
                    <NavLink className="dropdown-item" to="/stats-calculator">Stats Calculator</NavLink>
                    <NavLink className="dropdown-item" to="/moves-calculator">Damage Calculator</NavLink>
                </NavDropdown>
                <NavLink className="nav-link" to="/vote">Voting</NavLink>
                <NavLink className="nav-link" to="/about">About Us</NavLink>
            </Nav>
        </Navbar>
    )
}

export default Navigation
