import Banner from '@/components/HomeComponent/Banner'; 
import EducationalQualifications from '@/components/HomeComponent/EducationalQualifications'; 
import Skills from '@/components/HomeComponent/Skills';
import React from 'react';

const PublicHome = () => {
    return (
        <div>
            <Banner></Banner>  
            <Skills></Skills>
            {/* <Hobbies></Hobbies>  */}
            <EducationalQualifications></EducationalQualifications>
        </div>
    );
};

export default PublicHome;