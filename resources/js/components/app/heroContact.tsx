const HeroContact = () => {
    return (
        <div>
            <div className="bg-blue-50 md:pt-44">
                <div className="flex flex-col items-center">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row rounded-lg p-8">
                        <div className="w-full">
                            <h1 className="text-5xl font-bold">
                                <span className="text-orange-600">Get in touch</span>
                            </h1>
                            <div className="md:hidden">
                                <img src="/img/displays/PhotoRoom_20231123_153629.png" alt="" />
                            </div>
                            <p className="prose text-xl leading-relaxed md:mt-4 text-gray-600">
                                Thank you for your interest in <span className="font-semibold">Funtime Softplay</span>. We're here to assist you with any questions you may have.
                            </p>
                        </div>
                        {/* <div className="hidden md:block w-1/2 mr-8 pl-8 h-[700px]" style={{ backgroundPositionY: '-100px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: "url('/img/displays/PhotoRoom_20231123_153629.png')" }} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroContact; 