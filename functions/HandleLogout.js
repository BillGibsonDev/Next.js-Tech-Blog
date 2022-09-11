import { useRouter } from 'next/router';

const logout = () => {
    const router = useRouter();
    dispatchEvent(logout);
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    router.push("/");
}