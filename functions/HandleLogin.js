import axios from "axios";

// redux
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/actions/user';

const useHandleLogin = (username, password, lastLogin) => {
    const dispatch = useDispatch();
    setLoading(true);
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_LOGIN_URL}`, {
        username: username,
        password: password,
        lastLogin: lastLogin,
    })
    .then(function(response){
        setLoading(false);
        handleTokens();
        if (response.data === "LOGGED IN"){
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SET_ROLE_URL}`, {
                username: username, 
                password: password,
            })
            .then((response) => {
                dispatch(getUser(username, response.data));
                dispatch(setLoggedIn(true));
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
        setLoading(false);
    });
}

export default useHandleLogin