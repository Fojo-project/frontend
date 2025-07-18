"use client"
import { useState } from 'react';
import ProfileHeader from '@/components/common/ProfileHeader';
import AccountTab from '@/components/common/AccountTab';
import AccountSection from '@/components/common/AccountSection';
import NotificationSection from '@/components/common/ProfileNotification';
import SecuritySection from '@/components/common/ProfileSecurity';
import Header from '@/layout/dashboard/Header';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'account' | 'notification' | 'security'>('account');

  return (
    <div>
      <Header Heading={'Profile'} link='/dashboard/profile' />
      <div className=" py-10 px-4">
        <ProfileHeader />
        <AccountTab activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'account' && <AccountSection />}
          {activeTab === 'notification' && <NotificationSection />}
          {activeTab === 'security' && <SecuritySection />}
        </div>
      </div>
    </div>
  );
}
