import {
    Card,
} from "@/components/ui/card"
import Image from "next/image";
import img1 from '../../../public/images/personal-2.jpg'
import { LuDownload } from "react-icons/lu"; 
import TextType from "../TextType";

const Banner = () => {
    return (
        <div className="">
            <Card className="bg-gradient-to-br from-gray-900/5 via-gray-800 to-black/5 border-2 shadow-lg  ">
                <div className="avg w-full max-sm:h-[680px]">
                    <div className='h-full'>
                        <div className='md:flex gap-9 lg:gap-24 items-center'>
                            {/* <Image src={img1} alt="img" className='h-72 w-72 lg:h-96 lg:w-96 border-3 rounded-full lg:ml-20 md:ml-10 md:mx-1 mx-auto md:my-8 hover:scale-105 transition-transform duration-500' /> */}
                            <Image
                                src={img1}
                                alt="img"
                                className="h-72 w-72 lg:h-96 lg:w-96 border-4 border-white rounded-full lg:ml-20 md:ml-10 md:mx-1 mx-auto md:my-8 animate-float"
                            />

                            <div className='text-white text-opacity-80 opacity-90 max-sm:px-2 md:px-2 lg:w-3/6 md:w-2/4 mt-3 flex flex-col gap-5'>
                                <div>
                                    <p className='lg:text-3xl md:text-2xl text-xl font-bold'>Hi !</p>
                                    <div className="flex">
                                        <p className='lg:text-3xl xl:text-4xl md:text-2xl text-2xl font-bold lg:ml-12 md:ml-12 mb-2'>
                                            I am{" "}
                                        </p>
                                        <TextType
                                            text={["Masudur Rahman", "Masudur Rahman"]}
                                            typingSpeed={10}
                                            deletingSpeed={10}
                                            pauseDuration={800}
                                            variableSpeed={{ min: 20, max: 50 }}
                                            showCursor={true}
                                            cursorCharacter=""
                                            className="lg:text-3xl xl:text-4xl md:text-2xl text-2xl font-bold ml-2 mb-2"
                                        />
                                    </div>
                                </div>

                                <p>Aspiring web developer with a solid foundation in front-end and back-end technologies, eager to contribute skills in building
                                    dynamic and user-friendly websites. Committed to continuous learning, collaboration, and a proactive approach to mastering
                                    new technologies.</p>
                                <a
                                    href="/masudur-rahman-resume.pdf"
                                    download
                                    className="w-fit" 
                                >
                                    <div className="outer-cont btn-flex flex items-center w-fit custom-card"> 
                                        <LuDownload className="text-lg" />
                                        Download Resume
                                    </div> 
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Banner;