import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import Hero from '@/components/app/hero';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
                <meta name="description" content="Welcome to Fun Time Soft Play - the ultimate destination for children's soft play equipment and party packages. Discover our wide range of products and services designed to create unforgettable experiences for kids of all ages." />   
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
                <link rel="canonical" href="https://funtimesoftplay.co.uk" />
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
