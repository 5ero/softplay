const HeroAbout = ({ title, content }: { title: string; content: string }) => {
    return (
        <div>
            <div className="bg-amber-50 md:pt-44">
                <div className="flex flex-col items-center">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row rounded-lg p-8">
                        <div className="w-full">
                            <h1 className="text-5xl font-bold">
                                <span className="text-orange-600">{title}</span>
                            </h1>
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/2 p-8">
                                      <img src="/storage/img/displays/PhotoRoom_20231123_153629.png" className="object-cover w-full h-full"  alt="" />
                                </div>
                              
                                    <div className="md:w-1/2 text-xl leading-relaxed md:mt-4 text-gray-600">
                                    <span className="font-semibold text-2xl">{title}</span>
                                    {' '}
                                    <div dangerouslySetInnerHTML={{ __html: content }} />
                                    </div>
                            </div>
                          
                            {/* <div className="order-last">
                                <button className="bg-orange-600 text-white rounded-lg p-4 mt-6 md:mt-4 hover:bg-orange-700">View Gallery</button>
                            </div> */}
                        </div>
                        {/* <div className="hidden md:block w-1/2 mr-8 pl-8 h-[700px]" style={{ backgroundPositionY: '-100px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: "url('/img/displays/PhotoRoom_20231123_153629.png')" }} />  */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroAbout;   