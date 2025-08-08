import ProfileHeader from '@/components/dashboard/profile/ProfileHeader';
import ProfileTabContent from '../../../components/dashboard/profile/ProfileContentTab';
import Header from '@/layout/dashboard/Header';

export default function ProfilePage() {
  return (
    <div>
      <Header Heading={'Profile'} link='/dashboard/profile' />
      <div className="py-10">
        <ProfileHeader />
        <ProfileTabContent />
      </div>
    </div>
  );
}