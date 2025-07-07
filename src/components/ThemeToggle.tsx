'use client';

import { useEffect } from "react";

export default function ThemeToggle() {
    useEffect(() => {
        if(window.localStorage.getItem('theme') == 'dark'){
            const html = document.querySelector('html');
            if(html){
                html.dataset.theme = window.localStorage.getItem('theme') || 'light';
            }
        }
    }, []);
    return(
        <>
        
        </>
    );
}