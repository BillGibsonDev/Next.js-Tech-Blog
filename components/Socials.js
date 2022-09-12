import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

// public
import Linkedin from '../public/linkedinBlack.png';
import Twitter from '../public/twitterBlack.png';
import Insta from '../public/instaBlack.png';
import Globe from '../public/globe.png';
import Youtube from '../public/youtubeBlack.png';
import Github from '../public/githubBlack.png';

import Image from 'next/image'

const Socials = ({authorUsername}) => {

    const [ creator, setCreator ] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
        const getCreator = () => {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_CREATOR_URL}/${authorUsername}`)
            .then(function(response){
                setCreator(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
        };
        getCreator(); 
    }, [ authorUsername ])

    return (
    <StyledSocials>
        <>
            {
                creator === undefined
                ? <></>
                :<> 
                    {
                        creator.twitter === "" 
                        ? <></>
                        : <a href={creator.twitter} target="_blank" rel="noreferrer"><Image src={Twitter} layout="fill" alt="" /></a>  
                    }
                    {
                        creator.youtube === "" 
                        ? <></>
                        :<a href={creator.youtube} target="_blank" rel="noreferrer"><Image src={Youtube} layout="fill" alt="" /></a>
                    }
                    {
                        creator.linkedin === "" 
                        ? <></>
                        : <a href={creator.linkedin} target="_blank" rel="noreferrer"><Image src={Linkedin} layout="fill" alt="" /></a>
                    }
                    {
                        creator.instagram === "" 
                        ? <></>
                        : <a href={creator.instagram} target="_blank" rel="noreferrer"><Image src={Insta} layout="fill" alt="" /></a>
                    }
                    {
                        creator.github === "" 
                        ? <></>
                        : <a href={creator.github} target="_blank" rel="noreferrer"><Image src={Github} layout="fill" alt="" /></a>
                    }
                    {
                        creator.other === "" 
                        ? <></>
                        : <a href={creator.other} target="_blank" rel="noreferrer"><Image src={Globe} layout="fill" alt="" /></a>
                    }
                </> 
            }
        </>
        </StyledSocials>
    )
}

const StyledSocials = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
    a {
        width: 35px;
        height: 35px;
        margin: 0 6px;
        position: relative;
        display: block;
        img {
            height: 100%;
            width: 100%;
        }
    }  
`;

export default Socials