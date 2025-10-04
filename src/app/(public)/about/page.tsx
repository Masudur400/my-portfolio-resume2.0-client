 import GithubStats from '@/components/AboutComponent/GithubStats';
import Hobbies from '@/components/AboutComponent/Hobbies';
import React from 'react';

const ABoutPage = () => {
    return (
        <div>
            {/* <About></About> */}
            <GithubStats></GithubStats>
            <Hobbies></Hobbies>
        </div>
    );
};

export default ABoutPage;