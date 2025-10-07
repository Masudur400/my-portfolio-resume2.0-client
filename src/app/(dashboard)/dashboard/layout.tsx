// import { Sidebar } from 'lucide-react';
import Sidebar from '@/components/SharedComponent/Sidebar';
import React from 'react';

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="lg:flex h-screen lg:gap-5"> 
        <Sidebar></Sidebar>
      <main className="flex-1 p-2 lg:p-6 overflow-auto border-l-2">{children}</main>
    </div>
    );
};

export default DashboardLayout;