import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import HeroAbout from '@/components/app/heroAbout';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

interface AboutContent {
    id: number;
    title: string;
    content: string;
}

export default function Welcome({ content }: { content: AboutContent }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="About us">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex flex-col min-h-screen">
                <Header />
                <HeroAbout title={content.title} content={content.content} />
                <Footer />
            </div>
        </>
    );
}
