"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Supabase configuration
const supabaseUrl = "https://mfebnkzulyewloxuitxk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mZWJua3p1bHlld2xveHVpdHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NjMzMjgsImV4cCI6MjA0OTEzOTMyOH0.we2mNrz7T6EsCSKLd6IrjDiy6pMVA3qIO3B5Ai-5n-M";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ProfileSetup() {
    const [currentTab, setCurrentTab] = useState(1);
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        profilePicture: "",
        about: "",
        country: "",
        industry: "",
        description: "",
        bulletPoints: [""],
        calendar: [],
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const steps = [
        { label: "Create Profile", step: 1 },
        { label: "Define Purpose", step: 2 },
        { label: "Set Availability", step: 3 },
    ];

    const handleSubmit = async () => {
        setLoading(true);
        setMessage(null);
        try {
            const { error } = await supabase.from("profiles").insert([profileData]);
            if (error) {
                setMessage(`Error: ${error.message}`);
            } else {
                setMessage("Profile setup successful! You can now proceed to your dashboard.");
            }
        } catch (err) {
            setMessage("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const addBulletPoint = () => {
        setProfileData({ ...profileData, bulletPoints: [...profileData.bulletPoints, ""] });
    };

    const removeBulletPoint = (index) => {
        setProfileData({
            ...profileData,
            bulletPoints: profileData.bulletPoints.filter((_, i) => i !== index),
        });
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-between mb-12">
            {steps.map((item, index) => (
                <div key={item.step} className="flex items-center w-full">
                    <div
                        className={`flex items-center justify-center h-10 w-10 rounded-full font-medium text-sm transition-colors 
                        ${currentTab === item.step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                    >
                        {item.step}
                    </div>
                    <div className="ml-3 text-gray-700 text-sm font-medium whitespace-nowrap">{item.label}</div>
                    {index < steps.length - 1 && (
                        <div className="flex-grow h-1 bg-gray-200 mx-4 rounded-full"></div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderTab1 = () => (
        <div className="animate-fadeIn">
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8 tracking-tight">
                Tell Us About Yourself
            </h2>
            <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="John"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Picture
                    </label>
                    <Input
                        id="profilePicture"
                        name="profilePicture"
                        type="file"
                        onChange={(e) => setProfileData({ ...profileData, profilePicture: e.target.files[0] })}
                    />
                </div>
                <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                        About You
                    </label>
                    <textarea
                        id="about"
                        name="about"
                        rows={4}
                        placeholder="A short introduction..."
                        value={profileData.about}
                        onChange={(e) => setProfileData({ ...profileData, about: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                        </label>
                        <Input
                            id="country"
                            name="country"
                            type="text"
                            placeholder="United States"
                            value={profileData.country}
                            onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                            Industry
                        </label>
                        <Input
                            id="industry"
                            name="industry"
                            type="text"
                            placeholder="Technology"
                            value={profileData.industry}
                            onChange={(e) => setProfileData({ ...profileData, industry: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <Button 
                        onClick={() => setCurrentTab(2)} 
                        className="bg-blue-600 text-white py-3 px-6 font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Next
                    </Button>
                </div>
            </form>
        </div>
    );

    const renderTab2 = () => (
        <div className="animate-fadeIn">
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8 tracking-tight">
                Describe Your Role
            </h2>
            <form className="space-y-8">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Short Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        placeholder="What will you be hired for?"
                        value={profileData.description}
                        onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Key Responsibilities
                    </label>
                    {profileData.bulletPoints.map((point, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <Input
                                type="text"
                                placeholder={`Responsibility ${index + 1}`}
                                value={point}
                                onChange={(e) => {
                                    const newPoints = [...profileData.bulletPoints];
                                    newPoints[index] = e.target.value;
                                    setProfileData({ ...profileData, bulletPoints: newPoints });
                                }}
                                className="flex-grow"
                            />
                            <Button
                                onClick={() => removeBulletPoint(index)}
                                variant="ghost"
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </Button>
                        </div>
                    ))}
                    <Button 
                        onClick={addBulletPoint} 
                        type="button" 
                        className="bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition-colors"
                    >
                        Add Point
                    </Button>
                </div>
                <div className="flex justify-between">
                    <Button 
                        onClick={() => setCurrentTab(1)} 
                        type="button" 
                        className="bg-gray-100 text-gray-700 py-3 px-6 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Back
                    </Button>
                    <Button 
                        onClick={() => setCurrentTab(3)} 
                        className="bg-blue-600 text-white py-3 px-6 font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Next
                    </Button>
                </div>
            </form>
        </div>
    );

    const renderTab3 = () => (
        <div className="animate-fadeIn">
            <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8 tracking-tight">
                Set Your Availability
            </h2>
            <p className="text-center text-gray-600 mb-8">
                Select dates and times you are available.
            </p>
            <form className="space-y-8">
                <div className="text-center text-gray-500">
                    Calendar picker will go here.
                </div>
                <div className="flex justify-between">
                    <Button 
                        onClick={() => setCurrentTab(2)} 
                        type="button" 
                        className="bg-gray-100 text-gray-700 py-3 px-6 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Back
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        className="bg-blue-600 text-white py-3 px-6 font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {loading ? "Saving..." : "Save Profile"}
                    </Button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div className="text-2xl font-semibold tracking-tight text-blue-600 select-none">Worthly</div>
                    <a href="/login" className="text-blue-600 hover:text-blue-700 transition-colors px-4 text-sm font-medium">
                        Login
                    </a>
                </div>

                {renderStepIndicator()}

                <div className="bg-white shadow-xl rounded-lg p-10 transition-all">
                    {currentTab === 1 && renderTab1()}
                    {currentTab === 2 && renderTab2()}
                    {currentTab === 3 && renderTab3()}
                </div>

                {message && (
                    <div className={`p-4 mt-8 rounded-lg text-sm font-medium 
                        ${message.startsWith("Error") ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
