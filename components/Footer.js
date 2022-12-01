// styled
import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables.js';

import Link from 'next/link';
import Image from 'next/image.js';

// public
import Twitter from '../public/twitterBlack.png';
import Linkedin from '../public/linkedinBlack.png';
import Github from '../public/githubBlack.png';
import Globe from '../public/globe.png';

const Footer = () => { 
    return (
        <StyledFooter>
            <div className="icon-container">
                <a href="https://twitter.com/BillGibsonDev" target="_blank" rel="noreferrer">
                    <Image src={Twitter} alt="Twitter Link" width='30px;' height='30px;' />
                </a>
                <a href="https://www.linkedin.com/in/bill-gibson-868182104/" target="_blank" rel="noreferrer">
                    <Image src={Linkedin} alt="Linkedin Link" width='30px;' height='30px;' />
                </a>
                <a href="https://github.com/BillGibsondev" target="_blank" rel="noreferrer">
                    <Image src={Github} alt="Github Link" width='30px;' height='30px;' />
                </a>
                <a href="https://billgibson.net" target="_blank" rel="noreferrer">
                    <Image src={Globe} alt="Portfolio Link" width='30px;' height='30px;' />
                </a>
            </div>
            <div className="link-container">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
            </div>
        </StyledFooter>
    )
}

export default Footer

const StyledFooter = styled.footer`
    margin: 20px auto 50px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 2px solid white;
    flex-direction: column;
    max-width: 875px;
    width: 100%;
    margin: auto auto 40px auto;
    @media (max-width: 750px){
        width: 95%;
    }
    .icon-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 200px;
        margin: 20px auto 20px auto; 
        a {
            width: 30px;
            height: 30px;
            border-radius: 8px;
            &:hover {
                background: white;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .link-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 80%;
        max-width: 400px;
        @media (max-width: 1050px){
            margin-top: 10px;
        }
        a {
            display: flex;
            justify-content: center;
            width: 100%;
            font-size: 1em;
            color: ${pallette.helperGrey};
            font-weight: 700;
            &:hover {
                color: #fff;
                text-decoration: underline;
            }
        }
    }

`;

