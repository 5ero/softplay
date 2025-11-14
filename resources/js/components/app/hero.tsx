import { Link } from '@inertiajs/react';

const Hero = () => {
    return (
        <div className="bg-amber-50 md:pt-44 w-screen">
            <div className="flex flex-col items-center">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row rounded-lg p-8">
                    <div className="w-full md:w-1/3">
                        <h1 className="text-6xl font-bold">
                            Soft play areas for <span className="text-orange-600">kids</span>
                        </h1>
                        <div className="md:hidden">
                            <img src="/storageimg/displays/PhotoRoom_20231123_153629.png" alt="" />
                        </div>
                        <div className="prose text-xl leading-relaxed md:mt-4 text-gray-600">
                            <span className="font-semibold text-2xl">Funtime Softplay</span> offer a vibrant and engaging environment designed to ignite the imagination and energy of young ones. These playgrounds are a haven of padded structures, ball pits, and bouncy castles, all carefully crafted to encourage exploration, social interaction, and physical activity.
                        </div>

                        <div className="order-last">
                            <Link
                                href="/gallery"
                                className="inline-block cursor-pointer bg-orange-600 hover:bg-orange-500 text-white rounded-lg p-4 mt-6 md:mt-4"
                            >
                                View Gallery
                            </Link>
                        </div>
                    </div>
                    <div 
                        className="hidden md:block w-2/3 pl-8 h-[700px] ml-8" 
                        style={{
                            backgroundPositionY: '-100px',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: "url('/storage/img/displays/PhotoRoom_20231123_153629.png')"
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;