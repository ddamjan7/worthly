"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

/*
  Improvements:
  - Tighten spacing and ensure consistent paddings and margins.
  - Introduce responsive variants for spacing and font sizes to improve mobile readability.
  - Add subtle hover states, focus outlines, and transitions for interactive elements.
  - Ensure all text is accessible (sufficient contrast) and properly sized.
  - Utilize Tailwind’s utility classes for spacing consistency (e.g., space-y-*, space-x-*).
  - Keep the hero gradient and content widths consistent with the given design.
  - Make sure images have descriptive alt text and consider adding relevant ARIA attributes where needed.
  - Where content might be missing (e.g., no featured work), ensure layout still looks balanced by conditionally rendering sections.

  The final design aims for a polished, professional, and accessible user experience.
*/

export default function UserLandingPage({ profile }) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const user = profile || {
        firstName: "Seth",
        lastName: "Godin",
        profilePicture: "https://seths.blog/wp-content/themes/godin/img/og-images/seth.jpg",
        about: "Author, entrepreneur, and marketer who inspires people around the world.",
        country: "United States",
        industry: "Marketing & Writing",
        description: "Helping you think differently, challenge the status quo, and inspire your team.",
        bulletPoints: [
            "Bestselling author of over 20 books",
            "Renowned public speaker and motivator",
            "Marketing pioneer and thought leader",
        ],
        featuredWork: [
            { title: "Purple Cow", link: "#", description: "A revolutionary marketing concept book." },
            { title: "This Is Marketing", link: "#", description: "Insights into modern marketing strategies." },
        ],
    };

    const slots = [
        { time: "9:00am", day: "Wednesday, July 17" },
        { time: "10:00am", day: "Wednesday, July 17" },
        { time: "11:00am", day: "Wednesday, July 17" },
        { time: "3:00pm", day: "Wednesday, July 17" },
        { time: "4:00pm", day: "Wednesday, July 17" },
    ];
    const hasSlots = slots.length > 0;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            {/* Navigation */}
            <nav className="w-full bg-white shadow-sm flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-3">
                    <img
                        src="/path/to/logo.png"
                        alt="Worthly Logo"
                        className="w-6 h-6 rounded-full"
                    />
                    <span className="text-lg font-semibold text-blue-600 tracking-tight">Worthly</span>
                </div>
                <ul className="hidden md:flex space-x-4">
                    <li><a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Mission</a></li>
                    <li><a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Work</a></li>
                    <li><a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Blog</a></li>
                    <li><a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Blog</a></li>
                </ul>
                <div className="flex space-x-3">
                    <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">Log in</a>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors px-4 py-1.5 rounded">
                        Help now &gt;
                    </Button>
                </div>
            </nav>

            {/* Main Container */}
            <div className="max-w-screen-xl mx-auto w-full">
                {/* Gradient Section (Hero) */}
                <div className="relative bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500 rounded-xl mt-4">
                    <div className="flex items-center p-4 md:p-6 space-x-4">
                        <img
                            src={user.profilePicture}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white shadow-lg object-cover"
                        />
                        <div className="text-white">
                            <h1 className="text-xl md:text-2xl font-bold leading-tight">{user.firstName} {user.lastName}</h1>
                            {user.description && (
                                <p className="text-sm md:text-base mt-1 leading-snug">{user.description}</p>
                            )}
                            {user.about && (
                                <p className="text-sm md:text-base mt-1 leading-snug">{user.about}</p>
                            )}
                            {(user.industry || user.country) && (
                                <p className="text-sm md:text-base mt-1 opacity-90">
                                    {user.industry && <span>{user.industry}</span>}
                                    {user.country && <span> • {user.country}</span>}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Welcome Section */}
                <div className="bg-white rounded-xl shadow-sm mt-3 p-4 md:p-6">
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        Welcome to {user.firstName}'s personal schedule page. Select an available time slot to book a session. Explore the calendar, check the next free slots, and learn more about {user.firstName}'s expertise and featured work.
                    </p>
                </div>

                {/* Slots and Calendar */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-3">
                    {/* Next Free Slots */}
                    <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                        <h2 className="text-lg md:text-xl font-semibold mb-4">Next free slots</h2>
                        {hasSlots ? (
                            <ul className="space-y-3">
                                {slots.map((slot, index) => (
                                    <li key={index} className="flex items-center justify-between">
                                        <button
                                            className="text-blue-600 border border-blue-600 px-3 py-1.5 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium text-sm md:text-base"
                                            aria-label={`Select ${slot.time} on ${slot.day}`}
                                        >
                                            {slot.time}
                                        </button>
                                        <span className="text-gray-700 text-sm md:text-base">{slot.day}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="mt-4">
                                <p className="text-gray-600 mb-3 text-sm md:text-base">Currently fully booked. Get notified when new slots open up:</p>
                                <form className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
                                        aria-label="Your email"
                                    />
                                    <button
                                        className="w-full p-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium text-sm md:text-base"
                                        aria-label="Notify me"
                                    >
                                        Notify Me
                                    </button>
                                </form>
                            </div>
                        )}
                    </section>

                    {/* Calendar Section */}
                    <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                        <h2 className="text-lg md:text-xl font-semibold mb-4">Calendar</h2>
                        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                            <Calendar
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="mb-4 lg:mb-0"
                                aria-label="Calendar"
                            />
                            <div className="space-y-2">
                                {selectedDate ? (
                                    <div>
                                        <p className="text-gray-700 font-medium mb-1 text-sm md:text-base">
                                            {selectedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        <div className="flex flex-col space-y-2">
                                            {slots.map((slot, index) => (
                                                <button
                                                    key={index}
                                                    className="text-blue-600 border border-blue-600 px-3 py-1.5 rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium text-sm md:text-base text-left"
                                                    aria-label={`Select ${slot.time} on ${selectedDate.toLocaleDateString()}`}
                                                >
                                                    {slot.time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-gray-600 text-sm md:text-base">Select a date to see available times.</p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                {/* What They Do Section */}
                {user.bulletPoints && user.bulletPoints.length > 0 && (
                    <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm mt-3">
                        <h2 className="text-lg md:text-xl font-semibold mb-3">What {user.firstName} Does</h2>
                        <ul className="space-y-1 list-disc list-inside text-gray-700 text-sm md:text-base">
                            {user.bulletPoints.map((point, index) => (
                                <li key={index} className="leading-relaxed">{point}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Featured Work Section */}
                {user.featuredWork && user.featuredWork.length > 0 && (
                    <section className="bg-white rounded-xl p-4 md:p-6 shadow-sm mt-3 mb-8">
                        <h2 className="text-lg md:text-xl font-semibold mb-3">Featured work</h2>
                        <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                            Highlighting the best of what {user.firstName} does. Explore these portfolio items, articles, or other content that showcases expertise and value.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {user.featuredWork.map((work, index) => (
                                <div
                                    key={index}
                                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 transition-colors"
                                >
                                    <h3 className="text-base md:text-lg font-semibold text-gray-900">{work.title}</h3>
                                    <p className="text-gray-600 mt-1 text-sm md:text-base">{work.description}</p>
                                    {work.link && (
                                        <a
                                            href={work.link}
                                            className="text-blue-600 mt-2 inline-block hover:underline text-sm md:text-base"
                                            aria-label={`View more about ${work.title}`}
                                        >
                                            View more →
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
