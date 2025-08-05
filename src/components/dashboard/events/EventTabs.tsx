'use client';

import { useState } from 'react';
import EventCard from './EventCard';
import LiveEvents from './LiveEvents';
import UpComingEvents from './UpComingEvents';

const TABS = {
  ALL: 'All Events',
  LIVE: 'Live Events',
  UPCOMING: 'Upcoming Events',
} as const;

type TabKey = keyof typeof TABS;

export default function EventTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('ALL');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'ALL':
        return <EventCard />;
      case 'LIVE':
        return <LiveEvents />;
      case 'UPCOMING':
        return <UpComingEvents />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-6 font-open-sans border-b border-gray-200 text-sm md:text-sm font-medium">
        {Object.entries(TABS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as TabKey)}
            className={`pb-3 transition-all ${activeTab === key
                ? 'text-black border-b-3 border-black font-bold'
                : 'border-b-3 border-transparent hover:text-gray-700'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-4">{renderActiveComponent()}</div>
    </div>
  );
}
