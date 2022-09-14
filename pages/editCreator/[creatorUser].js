import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';
import * as pallette from '../../styled/ThemeVariables.js';

// functions
import { unauthorized } from '../../functions/Unauthorized';
import { useConfirmAdmin } from '../../functions/ConfirmAdmin';

import { useRouter } from 'next/router';

// redux
import { useSelector } from 'react-redux';

const EditCreator = () => {

    const user = useSelector((state) => state.user);

    const router = useRouter();
    const { creatorUser } = router.query

    const confirm  = useConfirmAdmin(user.role);

    const [ creator, setCreator ] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const getCreator = () => {
            axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_GET_CREATOR_URL}/${creatorUser}`)
            .then(function(response){
                setCreator(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
        };
        if(confirm){
            getCreator();
        }
    }, [ creatorUser, confirm ])

    const [ creatorName, setCreatorName ] = useState(creator.creator);
    const [ twitter, setTwitter] = useState(creator.twitter);
	const [ linkedin, setLinkedin ] = useState(creator.linkedin);
	const [ instagram, setInstagram ] = useState(creator.instagram);
	const [ other, setOther ] = useState(creator.other);
	const [ bio, setBio ] = useState(creator.bio);
	const [ youtube, setYoutube ] = useState(creator.youtube);
    const [ avatar, setAvatar ] = useState(creator.avatar);
    const [ authorUsername, setAuthorUsername ] = useState(creator.authorUsername);
    const [ location, setLocation ] = useState(creator.location);
    const [ github, setGithub ] = useState(creator.github); 
    
    const handleUpdateCreator = () => {
        if(confirm){
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_UPDATE_CREATOR_URL}/${creator._id}`, {
                creator: creatorName,
                authorUsername: authorUsername,
                avatar: avatar,
                twitter: twitter,
                linkedin: linkedin,
                instagram: instagram,
                youtube: youtube,
                github: github,
                other: other,
                bio: bio,
                location: location,
            })
            .then(function(response) {
                if(response.data !== "Creator Updated!"){
                    alert("Server Error - Creator was not created")
                } else {
                    alert('Creator Updated');
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

	return (
		<StyledRegister>
			<h1>Update Creator</h1>
			<div className="form-wrapper">
                <>
                    <div className="left-container">
                        <label>Creator Name:</label>
                        <input 
                            defaultValue={creator.creator}
                            type="text" 
                            onChange={(event) => {
                                setCreatorName(event.target.value);
                            }}
                        />
                        <label>Username:</label>
                        <input 
                            defaultValue={creator.authorUsername}
                            type="text" 
                            onChange={(event) => {
                                setAuthorUsername(event.target.value);
                            }}
                        />
                        <label>Bio:</label>
                        <input 
                            defaultValue={creator.bio}
                            type="text" 
                            onChange={(event) => {
                                setBio(event.target.value);
                            }}
                        />
                        <label>Location:</label>
                        <input 
                            defaultValue={creator.location}
                            type="text" 
                            onChange={(event) => {
                                setLocation(event.target.value);
                            }}
                        />
                        <label>Avatar:</label>
                        <input 
                            defaultValue={creator.avatar}
                            type="text" 
                            onChange={(event) => {
                                setAvatar(event.target.value);
                            }}
                        />
                    </div>
                    <div className="right-container">
                        <label>Twitter:</label>
                        <input 
                            defaultValue={creator.twitter}
                            type="text" 
                            onChange={(event) => {
                                setTwitter(event.target.value);
                            }}
                        />
                        <label>Youtube</label>
                        <input 
                            defaultValue={creator.youtube}
                            type="text" 
                            onChange={(event) => {
                                setYoutube(event.target.value);
                            }}
                        />
                        <label>Instagram:</label>
                        <input 
                            defaultValue={creator.instagram}
                            type="text" 
                            onChange={(event) => {
                                setInstagram(event.target.value);
                            }}
                        />
                        <label>Linkedin:</label>
                        <input 
                            defaultValue={creator.linkedin}
                            type="text" 
                            onChange={(event) => {
                                setLinkedin(event.target.value);
                            }}
                        />
                        <label>Github:</label>
                        <input 
                            defaultValue={creator.github}
                            type="text" 
                            onChange={(event) => {
                                setGithub(event.target.value);
                            }}
                        />
                        <label>Other:</label>
                        <input
                            defaultValue={creator.other} 
                            type="text" 
                            onChange={(event) => {
                                setOther(event.target.value);
                            }}
                        />
                    </div>
                </>
                
            </div>
            {
                user.role === process.env.NEXT_PUBLIC_ADMIN_SECRET 
                ? <button className="button" type="submit" onClick={()=>{handleUpdateCreator();}}>Update Creator</button>
                : <button className="button" type="submit" onClick={()=>{unauthorized();}}>Register Creator</button>
            }
		</StyledRegister>
	)
}

const StyledRegister = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 80vh;
    width: 100%;
    max-width: 875px;
    margin: 20px auto;
    border-radius: 12px;
    padding-bottom: 20px;
	@media (max-width: 1050px){
		width: 98%;
	}
	h1 {
		font-size: 3em;
		color: ${pallette.titleColor};
        margin-bottom: 40px;
    }
	.form-wrapper {
        display: flex;
        width: 90%;
        align-items: center;
        justify-content: space-between;
        @media (max-width: 850px){
            flex-direction: column;
            width: 90%;
        }
        label {
            font-weight: bold;
            color: white;
            @media (max-width: 1150px){
                font-size: 1.2em;
            }
        }
        input {
            width: 100%;
            margin-bottom: 20px;
            border-radius: 4px;
            padding: 4px;
        }
        .right-container, .left-container {
            display: flex;
            flex-direction: column;
            width: 45%;
            @media (max-width: 850px){
                width: 100%;
            }
        } 
    }
`;

export default EditCreator