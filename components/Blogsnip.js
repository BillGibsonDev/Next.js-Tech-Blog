import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../styled/ThemeVariables.js';

// router
import Link from 'next/link';

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
                    <Link href={`/articles/${article.linkTitle}/${article._id}`}>
                        <img src={article.thumbnail} alt={article.thumbnail} />
                    </Link>
                </div>
                <div className="info-wrapper">
                    <Link href={`/tags/${article.tag}`}><a className="tag">{article.tag}</a></Link>
                    <Link href={`/articles/${article._id}`}><a className="title">{article.postTitle}</a></Link>
                    <div className="info-container">
                        <div className="author-header">
                            <img src={creator.avatar} alt="" />
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
    height: 30vh;
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
            width: 50%;
            height: 100%;
            @media (max-width: 750px){
                width: 100%;
            }
            img {
                width: 100%;
                height: 100%;
            }
        }
        .info-wrapper {
            display: flex;
            flex-direction: column;
            width: 50%;
            height: 70%;
            margin: auto auto auto 10px;
            @media (max-width: 750px){
                width: 100%;
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
                    img {
                        height: 30px;
                        width: 30px;
                        border-radius: 50%;
                        object-fit: cover;
                        margin-right: 4px;
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


