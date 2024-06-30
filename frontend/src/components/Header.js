// NavbarComponent.js
import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import { loadFull } from "tsparticles";
const Header = () => {
  
const navigate = useNavigate();

  const handleShowLogin = () =>{
    navigate("/login");
  }

  const [user, setUser] = useState();

  useEffect(() => {
    
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        
        setUser(user);
        
      }


    
  }, []);

  const handleShowLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }
  
  return (
    <>
    <div style={{ position: 'relative', overflow: 'hidden' }}>
    <Navbar className="navbarCSS" collapseOnSelect expand="lg" style={{position: 'relative', zIndex: "2 !important"}}>
      {/* <Navbar className="navbarCSS" collapseOnSelect expand="lg" bg="dark" variant="dark"> */}
        <Navbar.Brand href="/" className="text-black navTitle">Система управления расходами</Navbar.Brand>
        <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
          >
            <span
              className="navbar-toggler-icon"
              style={{
                background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
              }}
            ></span>
          </Navbar.Toggle>
        <div>
        <Navbar.Collapse id="responsive-navbar-nav" style={{color: "black"}}>
          {user ? (
            <>
            <Nav>
                <Button variant="primary" onClick={handleShowLogout} className="ml-2">Выйти</Button>
            </Nav>
            </>
          ) : (

            <>
              <Nav>
                <Button variant="primary" onClick={handleShowLogin} className="ml-2">Войти</Button>
              </Nav>
            </>
          )}
          
        </Navbar.Collapse>
      </div>
      </Navbar>
      </div>
    </>
  );
};

export default Header;
