import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../../styled/ThemeVariables.js';

// router
import Link from 'next/link';

// functions
import { useConfirmRole } from '../../functions/ConfirmRole';

// redux
import { useSelector } from 'react-redux';

const Profile = ({articles}) => {

    const user = useSelector((state) => state.user);

    const confirm = useConfirmRole(user.role);

    const [ joinDate, setJoinDate ] = useState("");

    useEffect(() => {
        if(confirm){
            let tokenPW = sessionStorage.getItem("tokenPW");
            let tokenUser = sessionStorage.getItem("tokenUser");
            const handleJoinDate = () => {
                axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_LOGIN_URL}`, {
                    username: tokenUser,
                    password: tokenPW,
                })
                .then(function(response){
                    if (response.data === "LOGGED IN"){
                        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_DATE_URL}`, {
                            username: tokenUser, 
                            password: tokenPW,
                        })
                        .then((response) => {
                            setJoinDate(response.data)
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            handleJoinDate();
        }
    }, [ confirm ])

    return (
        <StyledProfilePage>
            <h1>Profile</h1>
            <header>
                <div className="user-container">
                    <h2><span>Username: </span>{user.user}</h2>
                    <h2><span>Joined: </span>{joinDate}</h2>
                </div>
            </header>
            {
                user.role === process.env.NEXT_PUBLIC_ADMIN_SECRET || user.role === process.env.NEXT_PUBLIC_CREATOR_SECRET 
                ? <div className="creator-dashboard">
                    <h3>Creator Dashboard</h3>
                    <div className="link-container">
                        <Link href="/createPost">Create Post</Link>
                        <Link href={`/editCreator/${user.user}`}>Edit Creator</Link>
                        {
                            user.role === process.env.NEXT_PUBLIC_ADMIN_SECRET 
                            ?  <>
                                <Link href="/createUser">Create User</Link>
                                <Link href="/createCreator">Create Creator</Link>
                            </>
                            : <></>
                        }
                    </div>
                    <h4>Your Articles</h4>
                    {
                        articles.filter(articles => articles.authorUsername === `${user.user}`).length === 0 
                        ? <p>No Articles Found</p>
                        : <div className="article-wrapper" > 
                            {
                                articles.filter(articles => articles.authorUsername === `${user.user}`).slice().reverse().map((article, key) => {
                                    return (
                                        <div className="article-container" key={key}>
                                            <h5>{article.postDate}</h5>
                                            <Link href={`/articles/${article._id}`}>{article.postTitle}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div> 
                    }
                </div>
                : <></>
            }
        </StyledProfilePage>
    )
}

export const getServerSideProps = async ({params}) => {
    const profile = params.user;
    const data = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_POSTS_URL}`)
    return {
        props: {
            articles: data.data,
        },
    }
}


const StyledProfilePage = styled.div`
    width: 100%;
    min-height: 60vh;
    max-width: 875px;
    margin: 2em auto;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    h1 {
        font-size: 3em;
        color: #ffffff;
        margin: 20px auto;
        display: flex;
        justify-content: center;
        width: 90%;
        border-bottom: 2px #ffffff solid;
    }
    header {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        .user-container {
            display: flex;
            justify-content: space-around;
            width: 90%;
            min-height: 200px;
            @media (max-width: 750px){
                flex-direction: column;
                justify-content: left;
            }
            h2 {
                margin: 20px 0;
                color: white;
                font-size: 24px;
                @media (max-width: 1150px){
                    margin: 10px 0;
                }
                span {
                    color: ${pallette.helperGrey};
                }
            }
        }
    }
    .creator-dashboard {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-top: 20px;
        min-height: 400px;
        h3 {
            color: white;
            border-bottom: 2px solid white;
        }
        .link-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            row-gap: 20px;
            justify-content: space-between;
            width: 100%;
            margin: 6px 0 auto 0;
            a {
                font-size: 24px;
                color: ${pallette.helperGrey};
                transition: 0.2s;
                &:hover {
                    color: black;
                }
            }
        }
        h4 {
            color: white;
            font-size: 2em;
        }
        p {
            color: white;
            margin: 6px 0;
            font-size: 1em;
        }
        .article-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;
            @media (max-width: 750px){
                grid-template-columns: 1fr;
            }
            .article-container {
                display: flex;
                align-items: center;
                background: #ffffff;
                border: 2px white solid;
                border-radius: 8px;
                padding: 0 10px;
                width: 95%;
                min-height: 40px;
                margin: 10px 0;
                transition: 0.2s;
                &:hover {
                    background: #fff;
                    border: 2px black solid;
                }
                h5 {
                    font-size: 16px;
                    margin-right: 6px;
                }
                a {
                    font-size: 18px;
                    color: black;
                }
            }
        }
    }
`;

export default Profile