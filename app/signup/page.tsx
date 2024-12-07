"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Supabase configuration
const supabaseUrl = "https://mfebnkzulyewloxutxk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mZWJua3p1bHlld2xveHVpdHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NjMzMjgsImV4cCI6MjA0OTEzOTMyOH0.we2mNrz7T6EsCSKLd6IrjDiy6pMVA3qIO3B5Ai-5n-M";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            // Input validation
            if (!formData.name.trim() || !formData.email.trim()) {
                setMessage("Name and email are required.");
                return;
            }

            // Insert user data into Supabase
            const { error } = await supabase.from("users").insert([
                {
                    name: formData.name,
                    email: formData.email,
                    cal_link: `https://cal.worthly.com/${formData.name.toLowerCase().replace(/\s+/g, '-')}`,
                },
            ]);

            if (error) {
                console.error("Error inserting user:", error);
                setMessage(`Error: ${error.message}`);
            } else {
                setMessage("Signup successful! User profile created.");
                setFormData({ name: "", email: "" });
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            setMessage("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Marketing/Hero section */}
<div className="bg-[#0496FF] text-white flex flex-col justify-center p-8 relative font-['Maven_Pro']">
    <div className="absolute top-4 left-4 text-xl font-bold">
        Worthly
    </div>
    <div className="mx-auto max-w-[600px]">
        <div className="text-6xl font-bold leading-tight">
            Give an <span className="text-white">hour</span>,
            make a <span className="text-[#FFBC42]">difference.</span>
        </div>
        <p className="mt-6 text-xl">
            Donate your expertise, not your money.<br />
            You help to solve real people's problems. They pay.<br />
            Charities get that money.
        </p>
    </div>
            </div>

            {/* Right side - Sign up form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-[400px] space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-semibold">Create account</h2>
                        <Button variant="ghost" asChild>
                            <a href="/login" className="text-[#0496FF] hover:text-[#0496FF]/80">Login</a>
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            placeholder="Full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={loading}
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={loading}
                        />
                        <Button 
                            type="submit" 
                            className="w-full bg-[#0496FF] hover:bg-[#0496FF]/90"
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Sign up with Email"}
                        </Button>
                    </form>

                    {message && (
                        <div className={`p-4 rounded-md ${
                            message.startsWith("Error") 
                                ? "bg-red-50 text-red-900" 
                                : "bg-green-50 text-green-900"
                        }`}>
                            {message}
                        </div>
                    )}

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {/* Add Google OAuth */}}
                    >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </Button>

                    <p className="text-center text-sm text-gray-500">
                        By clicking continue, you agree to our{" "}
                        <a href="/terms" className="text-[#0496FF] hover:underline">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-[#0496FF] hover:underline">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}