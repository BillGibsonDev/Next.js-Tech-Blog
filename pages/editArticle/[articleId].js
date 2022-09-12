import { useState, useEffect } from 'react';
import axios from 'axios';
import { marked } from 'marked';

// styled
import styled from 'styled-components';
import * as pallette from '../../styled/ThemeVariables.js';

import { useRouter } from 'next/router';

import { useConfirmRole } from '../../functions/ConfirmRole';

// redux
import { useSelector } from 'react-redux';

// components
import EditIntro from '../../components/EditIntro';

const EditArticle = () => {

    const user = useSelector((state) => state.user);

    const confirm = useConfirmRole(user.role);

    const router = useRouter();
    const { articleId } = router.query

    const [ isLoading, setLoading ] = useState(true);
    const [ article, setArticle ] = useState({});

    useEffect(() => {
        const handlePost = () => {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_POST_URL}/${articleId}`, {
                postId: articleId,
            })
            .then(function(response){
                setLoading(false);
                setArticle(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        handlePost(articleId);
    }, [ articleId ])

    const [ postTitle, setPostTitle ] = useState(article.postTitle);
    const [ linkTitle, setLinkTitle ] = useState(article.linkTitle);
    const [ postDate, setPostDate ] = useState(article.postDate);
    const [ thumbnail, setThumbnail ] = useState(article.thumbnail);
    const [ content, setContent ] = useState(article.content);
    const [ tag, setTag ] = useState(article.tag);

    const handleUpdate = () => {
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_UPDATE_POST_URL}/${articleId}`, {
            postId: articleId,
            postTitle: postTitle,
            linkTitle: linkTitle,
            postDate: postDate,
            thumbnail: thumbnail,
            content: content,
            tag: tag,
        })
        .then(function(response){
            if(response.data === "Post Updated"){
                alert('Post Updated')
                setLoading(false);
            } else {
                alert("Server Error - Post Not Updated")
                setLoading(false);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    const deletePost = () => {
        const result = window.confirm("Are you sure you want to delete?");
        if(result === true){
            setLoading(true);
            axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_DELETE_POST_URL}/${articleId}`)
            .then(function(response){
                if(response.data === "Post Deleted"){
                    setLoading(false);
                    alert('Post Deleted!');
                } else {
                    setLoading(false);
                    alert("Server Error - Post not updated");
                }
            })
        }
    }

    return (
        <StyledEditPage>
            {
                isLoading
                ? <h1>Loading</h1>
                : <div className="form-wrapper">
                    <EditIntro
                        article={article}
                        setLinkTitle={setLinkTitle}
                        setPostDate={setPostDate}
                        setThumbnail={setThumbnail}
                        setContent={setContent}
                        setPostTitle={setPostTitle}
                        setTag={setTag}
                    />
                    <h2>Preview</h2>
                    <div className="content-container"
                            dangerouslySetInnerHTML={{
                                __html: marked(article.content),
                            }}
                        >
                    </div>  
                    <div className="bottom-button-container">
                        <button className="button" onClick={() => { handleUpdate() }}>Update</button>
                        <button className="button" id="delete" onClick={() => { deletePost() }}>Delete</button>
                    </div>
                </div>
            }
        </StyledEditPage>
    )
}

const StyledEditPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 875px;
    min-height: 100vh;
    margin: 20px auto;
    .form-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        border-radius: 12px;
        h2 {
            color: ${pallette.helperGrey};
            font-size: 2em;
            border-bottom: 2px solid white;
            width: 100%;
            margin-bottom: 20px;
            width: 90%;
            margin: auto;
        }
        .content-container {
            width: 90%;
            margin: auto;
            ul {
                list-style: square inside;
            }
            img {
                width: 100%;
                margin-bottom: 10px;
            }
            p, li {
                font-size: 1rem;
                margin-bottom: 1.5em;
                letter-spacing: 1px;
                line-height: 1.7;
                color: #fff;
            }
            a {
                color: #9acdff;
                font-size: 1rem;
                text-decoration: underline;
            }
            h4 {
                color: ${pallette.titleColor};
                margin: 30px 0 6px 0;
                font-size: 2.5rem;
            }
            h5 {
                color: ${pallette.titleColor};
                margin: 10px 0;
                font-size: 2rem;
            }
            h6 {
                color: ${pallette.titleColor};
                margin: 10px 0 6px 0;
                font-size: 1.5rem;
            }
            code {
                display: flex;
                background: white;
                padding: 10px;
                font-size: 1rem;
                margin: 10px 0;
                white-space: pre-wrap;
            }
        }
        .bottom-button-container {
            display: flex;
            width: 100%;
            justify-content: space-between;
            margin-bottom: 10px;
            #delete {
                background: #da4040;
                &:hover {
                    background: red;
                }
            }
        }
    }
`;

export default EditArticle