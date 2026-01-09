import { Link } from '@inertiajs/react';

const Hero = () => {
    return (
        <div className="bg-blue-50 md:pt-44 w-screen p-4">
            <div className="flex flex-col items-center mb-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between rounded-lg md:p-8 bg-white">
                    <div className="w-full md:w-1/2">
                        <h1 className="p-4 text-5xl md:text-5xl font-semibold text-gray-700 mb-4 page_title">
                          Next level parties start with our unique luxury soft play
                        </h1>
                        <div className="p-0 md:mb-0 md:hidden">
                            <img src="/storage/img/home/softplay-main-image.jpg" alt="" className='object-cover w-full' />
                        </div>
                        <div className="prose leading-relaxed md:mt-4 p-4 text-gray-600">
                            <div className='text-2xl mb-2'>
                                <span className="font-semibold ">Funtime Softplay</span> From the humble beginnings of children’s soft play to a one stop event planning company. 
                            </div>
                            <ul className='text-lg mb-4'>
                                <li>For weddings, For children’s parties inside and out, For birthday parties for all ages</li>
                                <li>Soft play, Ride on carousels, Bouncy castles, Balloon houses, Bumper cars with track, Table and chairs</li>
                                <li>For the night time disco! a fabulous 3D led infinity dance floor</li>
                            </ul> 
                            <div className=' bg-gray-100 border p-4 rounded-lg '>
                                <span className="font-semibold text-lg"> We offer Full party decor along side our parent company Love Balloons Bedfordshire.</span>
                            </div>
                        </div>

                        <div className="order-last p-4">
                            <Link
                                href="/gallery"
                                className="inline-block cursor-pointer bg-gray-600 hover:bg-gray-500 font-semibold text-white rounded-lg p-4 md:mt-4"
                            >
                                View Gallery
                            </Link>
                        </div>
                    </div>
                    <div 
                        className="hidden md:block w-1/2 pl-8 border h-[600px] ml-8" 
                        style={{
                            backgroundPositionY: '0px',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: "url('/storage/img/home/softplay-main-image.jpg')"
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;