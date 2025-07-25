'use client';

import { useState } from 'react';
import EventCard from '../events/EventCard';
import CardSkeleton from '@/components/ui/skeleton/CardSkeleton';
import NoEvent from '../events/NoEvent';

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
            <div className="flex flex-wrap gap-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-full md:w-[48%]">
                        <CardSkeleton />
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return <div className="text-red-500">Error loading events.</div>;
    }

    if (filteredEvents.length === 0) {
        return <NoEvent />;
    }

    return (
        <div className="space-y-6">
            <div className="flex space-x-6 font-open-sans border-b border-gray-200 text-sm md:text-sm font-medium">
                {Object.entries(TABS).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key as TabKey)}
                        className={`pb-3 transition-all ${activeTab === key
                            ? 'text-black border-b-3 border-black font-bold'
                            : 'border-b-3 border-transparent hover:text-gray-700 '
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
