import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import Hero from '@/components/app/hero';
import HeroAbout from '@/components/app/heroAbout';
import Sets from '@/components/app/sets';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex flex-col min-h-screen">
                <Header />
                <HeroAbout />
                <Footer />
            </div>
        </>
    );
}
