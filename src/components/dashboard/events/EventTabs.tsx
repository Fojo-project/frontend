'use client';

import { useState } from 'react';
import EventCard from '../events/EventCard';
import CardSkeleton from '@/components/ui/skeleton/CardSkeleton';
import NoResource from '@/components/common/NoResource';
import AlertMessage from '@/components/common/AlertMessage'; // ✅ import this

type Event = {
    title: string;
    description: string;
    time: string;
    imageUrl: string;
    isLive?: boolean;
    dayLabel: string;
};

const TABS = {
    ALL: 'All Events',
    LIVE: 'Live Events',
    UPCOMING: 'Upcoming Events',
} as const;

type TabKey = keyof typeof TABS;

export default function EventTabs() {
    const [activeTab, setActiveTab] = useState<TabKey>('ALL');

    const isLoading = false;
    const isError = false;

    const events: Event[] = [
        {
            title: 'Sunday Worship Service',
            description: 'Grow into a Christ-centered leader — humble, bold, and Spirit-led.',
            time: '9:00AM',
            imageUrl: '/images/event1.jpg',
            isLive: true,
            dayLabel: 'Live',
        },
        {
            title: 'Bible Study',
            description: 'Grow into a Christ-centered leader — humble, bold, and Spirit-led.',
            time: '6:00PM',
            imageUrl: '/images/event2.jpg',
            isLive: false,
            dayLabel: 'Tues',
        },
    ];

    const filteredEvents = events.filter((e) => {
        if (activeTab === 'LIVE') return e.isLive;
        if (activeTab === 'UPCOMING') return !e.isLive;
        return true;
    });

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                {[...Array(5)].map((_, idx) => (
                    <div key={idx} className="w-full">
                        <CardSkeleton />
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex flex-col gap-4 items-center w-full">
                <AlertMessage
                    type="error"
                    message="Failed to load events. Please check your network and try again."
                />
                <div className="w-full flex flex-col gap-4">
                    {[...Array(2)].map((_, idx) => (
                        <CardSkeleton key={idx} />
                    ))}
                </div>
            </div>
        );
    }

    if (filteredEvents.length === 0) {
        return (
            <NoResource
                title="No course started yet"
                subtitle="Go to the 'explore courses' to start a course"
                icon="/images/event/no-event.png"
            />
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex space-x-6 font-open-sans border-b border-gray-200 text-sm md:text-sm font-medium">
                {Object.entries(TABS).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key as TabKey)}
                        className={`relative pb-3 transition-all duration-200 ${activeTab === key
                                ? 'font-semibold font-open-sans  text-black after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-[#000]'
                                : 'text-gray-600 font-open-sans  hover:text-black'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredEvents.map((event, index) => (
                    <EventCard
                        key={index}
                        title={event.title}
                        description={event.description}
                        time={event.time}
                        imageUrl={event.imageUrl}
                        isLive={event.isLive}
                        dayLabel={event.dayLabel}
                    />
                ))}
            </div>
        </div>
    );
}
