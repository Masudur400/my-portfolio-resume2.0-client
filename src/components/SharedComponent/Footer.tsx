import Link from 'next/link';
import React from 'react';
import { FaFacebookSquare, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <div className="bg-white/5 backdrop:blur-md">
            <footer className="footer footer-center border border-base-300 p-10">
                <aside> 
                    <nav>
                        <p className="text-center text-white text-2xl font-medium my-4">Socials</p>
                        <div className="flex justify-center items-center gap-5">
                            <Link href="https://www.facebook.com/MD.RANA.MIA.VAI" target="blank"><FaFacebookSquare className="text-4xl text-blue-500"></FaFacebookSquare></Link>
                            <Link href="https://www.linkedin.com/in/masudur-bhuyan-profile/" target="blank"><FaLinkedin className="text-4xl text-sky-500"></FaLinkedin ></Link>
                            <Link href="https://github.com/Masudur400" target="blank"><FaGithub className="text-4xl text-gray-400"></FaGithub  ></Link>
                        </div>
                    </nav>
                    <p className="text-white text-center">Copyright © ${new Date().getFullYear()} - All right reserved <span className="font-bold text-lg">Masudur Rahman</span></p>
                </aside>
            </footer>
        </div>
        </div>
    );
};

export default Footer;