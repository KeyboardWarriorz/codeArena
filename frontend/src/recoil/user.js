// globals.js
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';

export function GetNickname() {
    const secretKey = 'your-secret-key';
    const jwttoken = window.localStorage.getItem("accessToken")
    let decoded = null;
    let isExpired = false;
    try {
        decoded = jwtDecode(jwttoken);
        const now = Math.floor(Date.now() / 1000);
        isExpired = decoded.exp < now;
    } catch (error) {
        console.log('Invalid token');
    }
    if (isExpired) {
        return null;
    }
    return decoded.nickname;
}

export function GetUserId() {
    const secretKey = 'your-secret-key';
    const jwttoken = window.localStorage.getItem("accessToken")
    let decoded = null;
    let isExpired = false;
    try {
        decoded = jwtDecode(jwttoken);
        const now = Math.floor(Date.now() / 1000);
        isExpired = decoded.exp < now;
    } catch (error) {
        console.log('Invalid token');
    }
    if (isExpired) {
        return null;
    }
    return decoded.userId;
}



