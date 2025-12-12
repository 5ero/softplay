import React from 'react';
import NavItem from '@/components/app/nav-item';
import { Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';

const Header = () => {
    const { auth } = usePage<SharedData>().props;
    const [showMobileNav, setShowMobileNav] = React.useState(false);

    return (
        <div className="md:fixed w-full border-b-2 border-slate-500 bg-slate-50 shadow-xl z-50">
            <div className="max-w-7xl mx-auto flex flex-row items-center justify-between">
                <div className="p-3">
                    <img src="/storage/img/logo/funtime-softplay-logo-trans.png" alt="" className="w-32 md:w-44" />
                </div>
                <div className="hidden md:flex flex-row items-center justify-end w-full">
                    <NavItem title="Home" href="/" />
                    <NavItem title="Gallery" href="/gallery" />
                    <NavItem title="Prices" href="/prices" />
                    <NavItem title="Packages" href="/packages" />
                    <NavItem title="About us" href="/about" />
                    <NavItem title="Contact us" href="/contact" />
                    {auth.user ? (
                        <NavItem
                            title="Dashboard"
                            href={dashboard()}
                            method="get"
                        />
                    ) : (
                        <>
                            {/* <NavItem
                                title='Login'
                                href={login()}
                                method="get"
                            /> */}
                        </>
                    )}
                </div>
                <div>
                    {/* mobile nav */}
                    <div className="md:hidden flex flex-row items-center">
                        <button className="p-4" onClick={() => setShowMobileNav(!showMobileNav)}>
                            <svg className="w-12 h-8 text-slate-500 hover:text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                    {showMobileNav && (
                        <div className="md:hidden absolute w-1/2 top-0 left-0 min-h-screen flex flex-col items-center bg-orange-600 space-y-10 pt-20 transition-transform duration-300 ease-in-out z-50">
                            <NavItem title="Home" href="/" />
                            <NavItem title="About" href="/about" />
                            <NavItem title="Gallery" href="/gallery" />
                            <NavItem title="Contact" href="/contact" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;