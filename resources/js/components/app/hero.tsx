import { Link } from '@inertiajs/react';

const Hero = () => {
    return (
        <div className="bg-blue-50 md:pt-44 w-screen">
            <div className="flex flex-col items-center">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row rounded-lg p-8">
                    <div className="w-full md:w-1/3">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-600 mb-4">
                          Next level parties start with our unique luxury soft play
                        </h1>
                        <div className="md:hidden">
                            <img src="/storage/img/home/softplay-main-image.jpg" alt="" />
                        </div>
                        <div className="prose  leading-relaxed md:mt-4 text-gray-600">
                            <div className='text-2xl mb-2'>
                                <span className="font-semibold ">Funtime Softplay</span> From the humble beginnings of children’s soft play to a one stop event planning company. 
                            </div>
                            <ul className='text-lg'>
                                <li>For weddings, For children’s parties inside and out, For birthday parties for all ages</li>
                                <li>Soft play, Ride on carousels, Bouncy castles, Balloon houses, Bumper cars with track, Table and chairs</li>
                                <li>For the night time disco! a fabulous 3D led infinity dance floor</li>
                            </ul> 
                             We offer Full party decor along side our parent company Love Balloons Bedfordshire.
                        </div>

                        <div className="order-last">
                            <Link
                                href="/gallery"
                                className="inline-block cursor-pointer bg-blue-600 hover:bg-blue-500 text-white rounded-lg p-4 mt-6 md:mt-4"
                            >
                                View Gallery
                            </Link>
                        </div>
                    </div>
                    <div 
                        className="hidden md:block w-1/2 pl-8 h-[700px] ml-8" 
                        style={{
                            backgroundPositionY: '-100px',
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