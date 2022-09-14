import { useState, useEffect } from 'react';
import axios from 'axios';

// styled
import styled from 'styled-components';

// components
import { useRouter } from 'next/router';
import Head from 'next/head';

// redux
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/actions/user';

const Login = () => {

	const dispatch = useDispatch();

	const router = useRouter();

	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ lastLogin, setLastLogin ] = useState('');

	const handleTokens = (password, username) => {
		let tokenPW = sessionStorage.getItem("tokenPW");
		let tokenUser = sessionStorage.getItem("tokenUser");
		if (tokenPW === null) {
			router.push("/");
		} else {
			tokenPW = password;
			tokenUser = username;
		}
		sessionStorage.setItem("tokenPW", tokenPW);
		sessionStorage.setItem("tokenUser", tokenUser);
	}

	useEffect(() =>{
		const handleDate = () => {
			const current = new Date();
			const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()} @ ${current.getHours()}:${current.getMinutes()}`;
			setLastLogin(date);
		}
		handleDate();
	},[])

	const handleLogin = () => {
		axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_LOGIN_URL}`, {
			username: username,
			password: password,
			lastLogin: lastLogin,
		})
		.then(function(response){
			if (response.data === "LOGGED IN"){
				handleTokens(password, username)
				axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SET_ROLE_URL}`, {
					username: username, 
					password: password,
				})
				.then((response) => {
					dispatch(getUser(username, response.data));
					router.push('/');
				})
				.catch((error) => {
					console.log(error);
				})
			} else {
				localStorage.clear();
				sessionStorage.clear();
			}
		})
		.catch(function (error) {
			alert("Wrong Username or Password");
			console.log(error);
		});
}

	return (
		<StyledLoginPage>
			<Head>
				<title>{`Tech Blog | Login`}</title>
				<meta property="og:url" content="https://next-js-tech-blog-8p60ttybu-gibbybreakstech.vercel.app/" />
				<meta property="og:site_name" content="Tech Blog" />
				<meta property="og:title" content={`Tech Blog | Login`} />
				<meta property="twitter:title" content={`Tech Blog | Login`} />
			</Head>
			<h3>Log In</h3>
			<div className="form-wrapper">
				<label>Username:</label>
				<input 
					type="text" 
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
				<label>Password:</label>
				<input 
					type="password" 
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
				<button className="button" type="submit" onClick={() =>{ handleLogin( username, password, lastLogin ) }}>Sign In</button>
			</div>
		</StyledLoginPage>
	)
}

const StyledLoginPage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 95%;
    min-height: 40vh;
    max-width: 875px;
	margin: 20px auto;
	h3 {
		font-size: 2em;
		margin-bottom: 20px;
		color: #ffffff;
	}
	.form-wrapper {
		display: flex;
		width: 50%;
		flex-direction: column;
		align-items: center;
		label {
			color: white;
			width: 100%;
			max-width: 300px;
		}
		input {
			margin-bottom: 20px;
			width: 100%;
			max-width: 300px;
		}
		button {
			background: white;
			color: black;
			&:hover {
				color: white;
				background: black;
			}
		}
	}
`;

export default Login;