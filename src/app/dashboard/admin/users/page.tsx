import Header from '@/layout/dashboard/Header';
import { generateMetadata } from '@/utils/metadata';
import AdminUsersPage from '@/components/admin/AdminUsersPage';

export const metadata = generateMetadata({
    title: 'FOJO | Dashboard - Users Management',
    url: '/dashboard/admin/users',
    description: 'Users Management - FOJO Dashboard',
});

export default function EventsPage() {
    return (
        <div className="flex flex-col gap-6">
            <Header Heading="Users Management" link="/dashboard/admin/users" />
            <AdminUsersPage />
        </div>
    );
}
