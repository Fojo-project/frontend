import UploadButton from '@/components/common/Upaloder';
import { generateMetadata } from '@/utils/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({ title: 'FOJO | Dashboard - Home', description: 'Dashboard - FOJO', url: '/dashboard' });

export default function DashboardHome() {
  return (
    <div>
      <p>Dashboard</p>
      <UploadButton />
    </div>
  );
}
