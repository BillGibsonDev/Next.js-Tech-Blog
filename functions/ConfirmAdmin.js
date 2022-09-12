import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";

export const useConfirmAdmin = (role) => {
    const router = useRouter();
    const user = useSelector((state) => state.user );
    const [ confirm, setConfirm ] = useState(false);
    axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_ADMIN_CONFIRM_URL}`, {
        role: user.role,
    })
    .then(function(response){
        if (response.data !== "Role Confirmed"){
            alert("You do not have this permission!");
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
            router.push("/");
        } else {
            setConfirm(true);
        }
    })
    return confirm;
}