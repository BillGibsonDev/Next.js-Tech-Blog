import Link from "next/link";

export default function Custom500() {
    return (
        <div className="flex flex-col justify-center align-center color-fff text-center min-h-screen text-white">
            <h1 className="text-4xl font-bold mx-auto mt-20 underline">Server 500 Error</h1>
            <p className="text-2xl m-auto mt-10 w-1/2">Sorry Tech Blog still runs off of a Heroku server. The server was probaly on standby.</p>
            <Link href="/" className="text-3xl m-auto mt-20 w-1/2 underline">Click Here to go to the Home Page</Link>
        </div>
    )
}
