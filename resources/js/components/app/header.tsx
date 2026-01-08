import React from 'react';
import NavItem from '@/components/app/nav-item';
import { Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { House, Images, List, Mail, PartyPopper, PersonStanding, Pyramid } from 'lucide-react';

const Header = ({ activeOverride }: { activeOverride?: string } = {}) => {
    const { auth } = usePage<SharedData>().props;
    const [showMobileNav, setShowMobileNav] = React.useState(false);

    return (
        <div className="md:fixed w-full border-b-2 border-slate-500 bg-slate-50 shadow-xl z-50">
            <div className="max-w-7xl mx-auto flex flex-row items-center justify-between">
                <div className="p-3">
                    <img src="/storage/img/logo/funtime-softplay-logo-trans.png" alt="" className="w-32 md:w-44" />
                </div>
                <div className="hidden md:flex flex-row items-center justify-end w-full">
                    <NavItem title="Home" href="/" activeOverride={activeOverride} />
                    <NavItem title="Gallery" href="/gallery" activeOverride={activeOverride} />
                    <NavItem title="Prices" href="/prices" activeOverride={activeOverride} />
                    <NavItem title="Packages" href="/packages" activeOverride={activeOverride} />
                    <NavItem title="Event decor" href="/event-decor" activeOverride={activeOverride} />
                    <NavItem title="Contact us" href="/contact" activeOverride={activeOverride} />
                    {auth.user ? (
                        <NavItem
                            title="Dashboard"
                            href={dashboard.url()}
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
                    <div className={`fixed md:hidden w-1/2 top-0 left-0 min-h-screen flex flex-col bg-gray-50 border-r border-gray-300 shadow-xl space-y-4 pt-4 z-50 transition-transform duration-300 ease-in-out ${showMobileNav ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div className="p-3">
                            <img src="/storage/img/logo/funtime-softplay-logo-trans.png" alt="" className="w-32 md:w-44 object-center ml-4" />
                        </div>
                        <div className='flex flex-row items-center justify-start bg-gray-200 border border-gray-300 rounded mx-4 p-2 shadow'>
                            <div className='bg-white rounded-full p-2'><House /></div>
                            <NavItem title="Home" href="/" activeOverride={activeOverride} />
                        </div>
                        <div className='flex flex-row items-center justify-start bg-gray-200 border border-gray-300 rounded mx-4 p-2 text-gray-800 shadow'>
                            <div className='bg-white rounded-full p-2'><Images /></div>
                            <NavItem title="Gallery" href="/gallery" activeOverride={activeOverride} />
                        </div>
                        <div className='flex flex-row items-center justify-start bg-gray-200 border border-gray-300 rounded mx-4 p-2 text-gray-800 shadow'>
                            <div className='bg-white rounded-full p-2'><List /></div>
                            <NavItem title="Prices" href="/prices" activeOverride={activeOverride} />
                        </div>
                        <div className='flex flex-row items-center justify-start bg-gray-200 border border-gray-300 rounded mx-4 p-2 text-gray-800 shadow'>
                            <div className='bg-white rounded-full p-2'><Pyramid /></div>
                            <NavItem title="Packages" href="/packages" activeOverride={activeOverride} />
                        </div>
                        <div className='flex flex-row items-center justify-start bg-gray-200 border border-gray-300 rounded mx-4 p-2 text-gray-800 shadow'>
                            <div className='bg-white rounded-full p-2'><PartyPopper /></div>
                            <NavItem title="Decor" href="/event-decor" activeOverride={activeOverride} />
                        </div>
                        <div className='flex flex-row items-center justify-start bg-gray-200 border border-gray-300 rounded mx-4 p-2 text-gray-800 shadow'>
                            <div className='bg-white rounded-full p-2'><Mail /></div>
                            <NavItem title="Contact" href="/contact" activeOverride={activeOverride} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;