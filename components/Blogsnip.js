import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables.js';

// router
import Link from 'next/link';
import Image from 'next/image';

const Blogsnip = ({ article }) => {

    const [ creator, setCreator ] = useState([]);
    const [ splitDate, setSplitDate ] = useState('');

    useEffect(() => {
        const handleCreator = () => {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_CREATOR_URL}/${article.authorUsername}`)
            .then(function(response){
                setCreator(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        const handleDate = () => {
            const [ year, month, day ] = article.postDate.split('-');
            setSplitDate(`${month}-${day}-${year}`);
        }
        if(date){
            handleDate(date);
        }
        handleCreator();
    }, [ article ])

    return (
        <StyledSnip>
            <div className="article-wrapper">
                <div className="thumbnail">
                    <Link href={`/articles/${article._id}`}>
                        <Image src={article.thumbnail} alt={article.postTitle} layout="fill" />
                    </Link>
                </div>
                <div className="info-wrapper">
                    <Link href={`/tags/${article.tag}`}><a className="tag">{article.tag}</a></Link>
                    <Link href={`/articles/${article._id}`}><a className="title">{article.postTitle}</a></Link>
                    <div className="info-container">
                        <div className="author-header">
                            <div className="image-container">
                                <Image src={creator.avatar} width='30px;' height='30px;' layout="fill"  alt={`${article.author} profile picture`} />
                            </div>
                            <Link href={`/creators/${article.authorUsername}`}>{article.author}</Link>
                        </div>
                        <h5 id="date">{splitDate}</h5>
                    </div>
                </div>
            </div>
        </StyledSnip>
    )
}

export default Blogsnip

const StyledSnip = styled.div`
    height: 25vh;
    display: flex;
    justify-content: space-between;
    margin: 2em auto;
    align-items: center;
    width: 100%;
    max-width: 875px;
    @media (max-width: 750px){
        height: 100%;
    }
    .article-wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        margin: 0;
        @media (max-width: 750px){
            flex-direction: column;
        }
        .thumbnail {
            position: relative;
            width: 40%;
            height: 100%;
            @media (max-width: 750px){
                width: 90%;
                height: 25vh;
                margin: auto;
            }
            a {
                position: relative;
                width: 100%;
                height: 100%;
                display: block;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
        .info-wrapper {
            display: flex;
            flex-direction: column;
            width: 60%;
            height: 100%;
            margin: auto auto auto 10px;
            justify-content: center;
            @media (max-width: 750px){
                width: 90%;
                height: 40%;
                margin: auto;
            }
            a {
                margin: 6px 0;
                &:hover {
                    text-decoration: underline;
                }
            }
            .tag { 
                font-size: 18px;
                color: ${pallette.helperGrey};
            }
            .title {
                color: white;
                font-size: 2em;
                margin: 6px 0;
                font-weight: 700;
                 @media (max-width: 750px){
                    margin: 3px 0;
                }
            }
            .info-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 98%;
                margin: 6px auto;
                @media (max-width: 750px){
                    width: 100%;
                    margin: 10px auto;
                }
                 .author-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    .image-container {
                        position: relative;
                        display: block;
                        width: 35px;
                        height: 35px;
                        margin-right: 4px;
                        img {
                            position: relative;
                            height: 35px;
                            width: 35px;
                            max-width: 35px;
                            border-radius: 50%;
                            object-fit: cover;
                        }
                    }   
                    a {
                        font-size: 18px;
                        color: ${pallette.helperGrey};
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
                #date {
                    font-weight: 400;
                    color: ${pallette.helperGrey};
                    font-size: 14px;
                }
            }
        }
    }
`;


