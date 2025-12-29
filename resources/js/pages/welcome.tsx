import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import Hero from '@/components/app/hero';
import Sets from '@/components/app/sets';
import { Head } from '@inertiajs/react';

interface IconData {
    src: string;
    label: string;
}

interface SetItem {
    id: number;
    title: string;
    description: string;
    coverage?: string;
    price: string;
    images: string[];
    icons: IconData[];
    sort_order: number;
}

export default function Welcome({ sets }: { sets: SetItem[] }) {
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
