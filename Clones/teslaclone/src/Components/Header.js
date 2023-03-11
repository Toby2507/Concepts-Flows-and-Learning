import React, { useState } from 'react'
import styled from 'styled-components'
import { MdOutlineMenu } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { selectCars } from '../features/cars/carSlice';

const Header = () => {
    const cars = useSelector(selectCars);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <Container>
            <a href="/"><img src="/images/logo.svg" alt="logo" /></a>
            <Menu>
                {cars && cars.map((car, index) => (<a key={index} href="#">{car}</a>))}
            </Menu>
            <RightMenu>
                <a href="#">Shop</a>
                <a href="#">Tesla Account</a>
                <CustomMenu onClick={() => setSidebarOpen(true)} />
            </RightMenu>
            <BurgerNav open={sidebarOpen}>
                <CloseWrapper><GrClose style={{ cursor: "pointer" }} onClick={() => setSidebarOpen(false)} /></CloseWrapper>
                {cars && cars.map((car, index) => (<li key={index}><a href="#">{car}</a></li>))}
                <li><a href="#">Existing Inventory</a></li>
                <li><a href="#">Used Inventory</a></li>
                <li><a href="#">Trade In</a></li>
                <li><a href="#">Cyber Truck</a></li>
                <li><a href="#">Roadster</a></li>
                <li><a href="#">Semi</a></li>
                <li><a href="#">Power Charging</a></li>
                <li><a href="#">Power Charging</a></li>
                <li><a href="#">Utilities</a></li>
                <li><a href="#">Test Drive</a></li>
            </BurgerNav>
        </Container>
    )
}

export default Header

const Container = styled.div`
    min-height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    padding-inline: 20px;
    z-index: 1;
`
const Menu = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
    a {
        font-weight: 600;
        text-transform: uppercase;
        font-size: 14px;
        padding-inline: 10px;
    }
    @media (max-width: 768px) {
        display: none;
    }
`
const RightMenu = styled.div`
    display: flex;
    align-items: center;
    a {
        font-weight: 600;
        text-transform: uppercase;
        margin-right: 10px;
    }
`
const CustomMenu = styled(MdOutlineMenu)`
    cursor: pointer;
`
const BurgerNav = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    background: white;
    width: 300px;
    z-index: 10;
    list-style: none;
    padding: 20px;
    display: flex;
    flex-direction: column;
    text-align: start;
    overflow-y: auto;
    transform: ${props => props.open ? "translateX(0)" : "translateX(100%)"};
    transition: transform 0.3s ease-in-out;
    ::-webkit-scrollbar {
        display: none;
    }
    li {
        padding-block: 15px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        a {
            font-weight: 600;
        }
    }
`
const CloseWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`