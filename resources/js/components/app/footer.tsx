const Footer = () => {
    return (
        <footer className="bg-slate-800 p-8 mt-auto">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <img src="/storage/img/logo/funtime-softplay-logo-trans.png" className="w-44" alt="Funtime Softplay Logo" />
                    </div>
                    <div>
                        <h2 className="hidden md:block text-slate-100 text-lg font-semibold">Contact information</h2>
                        <ul className="text-slate-300 space-y-1 text-sm mt-2">
                            <li>07942 386386</li>
                            <li>hello@funtimesoftplay.co.uk</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="hidden md:block text-slate-100 text-lg font-semibold">Social Media</h2>
                        <a href="https://www.instagram.com/love_balloons_bedfordshire_/?hl=en" target="_blank" rel="noopener noreferrer">
                            <img src="/storage/img/social/Instagram_Glyph_White.png" className="w-8 h-8 inline-block mt-4" alt="Instagram" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;