'use client';
import { RingLoader } from "react-spinners";

export default function Preloader() {
    return(
        <>
         <RingLoader loading={true} speedMultiplier={4} />
        </>
    );
}