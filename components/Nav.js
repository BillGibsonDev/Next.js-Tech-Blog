import Link from 'next/link';

// styled
import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables.js';

// public
import Hamburger from '../public/hamburgerWhite2.png';
import Image from 'next/image.js';

// redux
import { useSelector } from 'react-redux';

const Nav = () => {

    const user = useSelector((state) => state.user);

    const openNav = () => {
        document.getElementById("myNav").style.width = "100%";
    }

    const closeNav = () => {
        document.getElementById("myNav").style.width = "0%";
    }

    return (
        <StyledNav>
            <Link href="/"><a className="logo">Tech Blog</a></Link>
            {
                user === []
                ? <nav>
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </nav>
                : <nav>
                    <Link href="/">Home</Link>
                    <Link href="/profile">Profile</Link>
                    <Link href="/" onClick={() => { logout() }}>Sign Out</Link>
                </nav>
            }
            <div id="myNav" className="overlay">
                <button onClick={() => { closeNav() }}>&times;</button>
                {
                    user === []
                    ? <div className="overlayContent" onClick={() => { closeNav() }}>
                        <Link href="/" onClick={() => { closeNav() }}>Home</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                    : <div className="overlayContent" onClick={() => { closeNav() }}>
                        <Link href="/" onClick={() => { closeNav() }}>Home</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/profile" onClick={() => { closeNav() }}>Profile</Link>
                        <Link href="/" onClick={()=>{ closeNav(); logout(); }}>Sign Out</Link>
                    </div>
                }
            </div>
            <div className="hamburger">
                <Image src={Hamburger} width='30px;' height='30px;' onClick={() => { openNav() }} alt="hamburger menu"/>
            </div>
        </StyledNav>
    )
}

const StyledNav = styled.nav`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 875px;
    margin: auto;
    align-items: center;
    height: 8vh;
    padding: 3px 0;
    border-bottom: 2px white solid;
    @media (max-width: 750px){
        width: 95%;
    }
    .logo {
        font-size: 32px;
        color: white;
        font-weight: 700;
    }
    nav {
        display: flex;
        width: 40%;
        justify-content: space-between;
        @media (max-width: 750px){
            display: none;
        }
        a {
            text-decoration: none;
            font-size: 1.2em;
            color: ${pallette.helperGrey};
            font-weight: 700;
            &:hover {
                color: white;
                text-decoration: underline;
            }
        }
    }
    .overlay {
        height: 100%;
        width: 0;
        position: fixed; 
        z-index: 1; 
        left: 0;
        top: 0;
        background-color: rgb(0,0,0); 
        background-color: rgba(0,0,0, 0.9); 
        overflow-x: hidden; 
        transition: 0.5s; 
        button {
            position: absolute;
            top: 20px;
            right: 45px;
            font-size: 60px;
            color: ${pallette.accentColor2};
            background: transparent;
            border: none;
            cursor: pointer;
            transition: 0.2s;
            &:hover, &:focus {
                transform: scale(1.05);
            }
        }
        .overlayContent {
            position: relative;
            top: 25%; 
            width: 100%;
            text-align: center; 
            margin-top: 30px; 
            a {
                padding: 8px;
                text-decoration: none;
                font-size: 36px;
                color: ${pallette.accentColor2};
                display: block; 
                transition: 0.2s; 
                    &:hover, &:focus {
                    color: #f1f1f1;
                    transform: scale(1.05);
                }
            }
        } 
    }
    .hamburger {
        cursor: pointer;
        display: none;
        width: 30px;
        transition: 0.2s;
        &:hover, &:focus {
            transform: rotateZ(30deg);
        }
        @media (max-width: 750px){
            display: block;
        }
    }
`;

export default Nav
