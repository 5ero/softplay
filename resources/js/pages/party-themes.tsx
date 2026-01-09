import { Head, Link } from '@inertiajs/react';
import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Breadcrumbs from '@/components/app/breadcrumbs';

interface PartyTheme {
    id: number;
    title: string;
    slug: string;
    description: string;
    images: string[];
    main_image?: string;
}

interface Props {
    items: PartyTheme[];
}

export default function PartyThemes({ items }: Props) {

    return (
        <>
            <Head title="Event Decor">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-blue-50">
                <Header activeOverride="/event-decor" />
                <div className="container mx-auto px-4 py-12 md:mt-20">
                    <Breadcrumbs items={[{ label: 'Event Decor' }]} />
                    <div className="mb-8">
                        <h1 className="text-6xl page_title font-bold text-gray-600">Event Decor</h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Make your event extra special with our themed decorations and accessories.
                        </p>
                    </div>

                {/* Results */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        Showing {items.length} {items.length === 1 ? 'theme' : 'themes'}
                    </p>
                </div>

                {/* Gallery Grid */}
                {items.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => {
                            // Display main image first if set, otherwise first image
                            const displayImage = item.main_image || item.images[0];
                            
                            return (
                            <Link key={item.id} href={`/event-decor/${item.slug}`}>
                                <Card className="overflow-hidden transition-shadow hover:shadow-lg cursor-pointer">
                                    <div className="aspect-square overflow-hidden bg-gray-100">
                                        {displayImage ? (
                                            <img
                                                src={`/storage/${displayImage}`}
                                                alt={item.title}
                                                className="h-full w-full object-cover transition-transform hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-gray-400">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                    <CardHeader>
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div 
                                            className="line-clamp-3 text-sm text-gray-600"
                                            dangerouslySetInnerHTML={{ __html: item.description }}
                                        />
                                    </CardContent>
                                    <CardFooter className="flex items-center justify-between">
                                        {item.images && item.images.length > 1 && (
                                            <p className="text-sm font-semibold text-orange-600">
                                                +{item.images.length - 1} more{' '}
                                                {item.images.length - 1 === 1 ? 'photo' : 'photos'}
                                            </p>
                                        )}
                                    </CardFooter>
                                </Card>
                            </Link>
                        );
                        })}
                    </div>
                ) : (
                    <Card className="p-8 text-center">
                        <p className="text-gray-600">
                            No event decor available at the moment. Check back soon!
                        </p>
                    </Card>
                )}
                </div>
                <Footer />
            </div>
        </>
    );
}
