import {
    Card, 
} from "@/components/ui/card"
import Image from "next/image";
import img1 from '../../../public/images/personal-1.png'
import img2 from '../../../public/images/personal-img (1) (1).jpg'
import { LuDownload } from "react-icons/lu";
import Link from "next/link";

const Banner = () => {
    return (
        <div className="">
            <Card className=""> 
                <div className="avg w-full max-sm:h-[680px]">
                    <div className='h-full'>
                        <div className='md:flex gap-9 lg:gap-24 items-center'>
                            <Image src={img1} alt="" data-aos="zoom-in" className='h-72 w-72 lg:h-96 lg:w-96 border-2 rounded-full lg:ml-20 md:ml-10 md:mx-1 mx-auto md:mt-8 hover:scale-105 transition-transform duration-300' />
                            <div className='text-white text-opacity-80 opacity-90 max-sm:ml-4 lg:w-3/6 md:w-2/4 mt-3 flex flex-col gap-5' data-aos="zoom-in">
                                <div>
                                    <p className='lg:text-3xl md:text-2xl text-xl font-bold'>Hi !</p>
                                    <p className='lg:text-4xl md:text-3xl text-2xl font-bold lg:ml-12 md:ml-12 mb-3'>I am <span className='text-indigo-500'>Masudur Rahman</span></p>
                                </div>
                                <p>Aspiring web developer with a solid foundation in front-end and back-end technologies, eager to contribute skills in building
                                    dynamic and user-friendly websites. Committed to continuous learning, collaboration, and a proactive approach to mastering
                                    new technologies.</p>
                                <Link href="https://drive.google.com/file/d/15zTeYNOQiSP3MSIbLk51s4SQKMvxXUWk/view?usp=sharing" target='blank' className='text-white w-fit bg-indigo-800 hover:shadow-gray-800 hover:shadow-lg px-4 py-2 rounded-md mt-3 flex gap-1 justify-center items-center max-sm:text-sm'><LuDownload></LuDownload> Download Resume</Link>
                            </div>
                        </div>
                    </div>
                </div> 
            </Card>
        </div>
    );
};

export default Banner;