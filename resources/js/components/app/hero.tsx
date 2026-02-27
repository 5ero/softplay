import { Link } from '@inertiajs/react';

const Hero = () => {
    return (
        <div className="bg-blue-50 md:pt-44 w-screen p-4">
            <div className="flex flex-col items-center mb-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between rounded-lg md:p-8 bg-white">
                    <div className="w-full md:w-1/2">
                        <h1 className="p-4 text-5xl md:text-5xl font-semibold text-gray-700 mb-4 page_title">
                         Luxury Soft Play & Event Styling. Creating unforgettable party experiences.
                        </h1>
                        <div className="p-0 md:mb-0 md:hidden">
                            <img src="/storage/img/home/fts-main.jpg" alt="" className='object-cover w-full' />
                        </div>
                        <div className="prose leading-relaxed md:mt-4 p-4 text-gray-600">
                            <p>
                                Funtime Softplay provides full-scale event styling as the specialist décor arm of <a href='https://www.loveballoonsbedfordshire.co.uk'>Love Balloons Bedfordshire</a>, expanding beyond balloons into immersive setups with interactive elements like luxury soft play, balloon houses, ball pits with exciting slides, electric spinning rides, bumper cars with tracks, LED infinity floors, LED carousels, and our showstopper Train Track with dazzling LED lights. 
                                This partnership creates a "one-stop" solution for high-end unique parties.
                            </p>
                            <div className=' bg-gray-100 border p-4 rounded-lg mt-4 '>
                                <span className="font-semibold text-lg">"For The Ultimate Party Partnership: Immersive High-End Event decor with that Luxury Experience." </span> <br /> Visit our Sister company:  👉 <a href='https://www.loveballoonsbedfordshire.co.uk' className='text-pink-600 underline'>Love Balloons Bedfordshire</a>
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
                            backgroundImage: "url('/storage/img/home/fts-main.jpg')"
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;