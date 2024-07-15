"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from "react";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isRegistering, setIsRegistering] = useState<boolean>(false); // 登録モードかどうかのフラグ
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    useEffect(() => {
        console.log("Session:", session);
        console.log("Status:", status);
    }, [session, status]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[\W_]/.test(password);
    };

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (!validatePassword(password)) {
            alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
            return;
        }
        if (!email || !password) {
            alert("Email and password are required");
            return;
        }
        const result = await signIn("login", {
            email: email,
            password: password,
            redirect: false,
            callbackUrl: callbackUrl,
        });

        if (result?.error) {
            alert("Failed to log in");
        } else {
            window.location.href = callbackUrl; // ログイン後にリダイレクト
        }
    };

    const handleRegister = async () => {
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (!validatePassword(password)) {
            alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
            return;
        }
        if (!email || !password) {
            alert("Email and password are required");
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("Failed to register");
            }

            alert("Registration successful. Please log in.");
            setIsRegistering(false);
        } catch (error) {
            alert("Registration failed");
        }
    };

    useEffect(() => {
        if (status === 'authenticated' && session) {
            window.location.href = callbackUrl;
        }
    }, [session, status, callbackUrl]);

    return (
        <div className="min-h-dvh place-content-center p-4 gap-4 place-items-center grid">
            <div>{status}</div>
            {status !== 'authenticated' ? (
                <>
                    <Input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {isRegistering ? (
                        <>
                            <Button onClick={handleRegister}>Register</Button>
                            <Button onClick={() => setIsRegistering(false)}>Back to Login</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={handleLogin}>Login</Button>
                            <Button onClick={() => setIsRegistering(true)}>Register</Button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <p>Welcome, {session.user?.email}</p>
                    <Button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>
                </>
            )}
        </div>
    );
}
