import Footer from '@/components/SharedComponent/Footer';
import Navbar from '@/components/SharedComponent/Navbar';
import React from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div> 
            <Navbar></Navbar>
            <main className='container mx-auto p-5 pt-20 min-h-[calc(100vh-250px)]'>
                {children}
            </main>
            <Footer></Footer>
        </div>
    );
};

export default PublicLayout;