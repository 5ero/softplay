import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PartyTheme {
    id: number;
    title: string;
    slug: string;
    description: string;
    images: string[];
    main_image?: string;
}

export default function PartyTheme({ theme }: { theme: PartyTheme }) {
    return (
        <>
            <Head title={theme.title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-blue-50">
                <Header activeOverride="/event-decor" />
                <div className="container mx-auto px-4 py-12 md:mt-28">
                    <Link href="/event-decor">
                        <Button variant="ghost" className="mb-6">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Event Decor
                        </Button>
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-5xl font-bold text-gray-600">{theme.title}</h1>
                    </div>

                    {/* Main Image */}
                    {(theme.main_image || theme.images[0]) && (
                        <div className="mb-8 overflow-hidden rounded-lg">
                            <img
                                src={`/storage/${theme.main_image || theme.images[0]}`}
                                alt={theme.title}
                                className="h-auto w-full max-h-[600px] object-cover"
                            />
                        </div>
                    )}

                    {/* Description */}
                    <Card className="mb-8">
                        <CardContent className="prose prose-lg max-w-none p-6">
                            <div dangerouslySetInnerHTML={{ __html: theme.description }} />
                        </CardContent>
                    </Card>

                    {/* Additional Images */}
                    {theme.images && theme.images.length > 1 && (
                        <div>
                            <h2 className="mb-4 text-2xl font-bold text-gray-600">Gallery</h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {theme.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square overflow-hidden rounded-lg bg-gray-100"
                                    >
                                        <img
                                            src={`/storage/${image}`}
                                            alt={`${theme.title} ${index + 1}`}
                                            className="h-full w-full object-cover transition-transform hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}
