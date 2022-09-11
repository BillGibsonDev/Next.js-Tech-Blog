import { useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { useSelector } from "react-redux";

export const useConfirmRole = (role) => {
    const router = useRouter();
    const user = useSelector((state) => state.user );
    const [ confirm, setConfirm ] = useState(false);
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_ROLE_CONFIRM_URL}`, {
        role: user.role,
    })
    .then(function(response){
        if (response.data !== "Role Confirmed" ){
            router.push("/");
            alert("Role was not confirmed");
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
        } else {
            setConfirm(true);
        }
    })
    return confirm;
}
