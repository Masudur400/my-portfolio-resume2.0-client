 
 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link'; 

const NotFoundPage = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <Card className="w-100 h-55 m-auto custom-card animate-float hover:scale-105 transition-transform duration-300 bg-linear-to-br from-gray-900/5 via-gray-800 to-black/5">
            <CardHeader>
              <CardTitle className="text-4xl text-center"> 
                404
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-lg text-center">
               Page Is Not Found
              </p>
            </CardContent>
            <CardDescription className='flex justify-center items-center'>
                {/* <Link href='/' className='outer-cont text-lg mb-5'>Home</Link> */}
                <Link
                href="/" 
                className=" outer-cont px-1 lg:px-2 py-1 custom-card btn-flex"
              >
                Home
              </Link>
            </CardDescription>
          </Card>
        </div>
    );
};

export default NotFoundPage;