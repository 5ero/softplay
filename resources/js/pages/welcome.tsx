import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import Hero from '@/components/app/hero';
import { Head } from '@inertiajs/react';

export default function Welcome() {
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
                <Hero />
                {/* <Sets sets={sets} /> */}
                <Footer />
            </div>
        </>
    );
}
