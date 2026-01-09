import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import Breadcrumbs from '@/components/app/breadcrumbs';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';

interface Location {
    id: number;
    name: string;
    slug: string;
}

interface GalleryItem {
    id: number;
    title: string;
    main_image: string;
}

interface LandingPage {
    id: number;
    title: string;
    slug: string;
    content: string;
    meta_title?: string;
    meta_description?: string;
    location?: Location;
}

interface LandingPageProps {
    page: LandingPage;
    galleryItems: GalleryItem[];
    packages: GalleryItem[];
}

export default function LandingPage({ page, galleryItems, packages }: LandingPageProps) {
    return (
        <>
            <Head title={page.meta_title || page.title}>
                {page.meta_description && (
                    <meta name="description" content={page.meta_description} />
                )}
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-blue-50">
                <Header />
                <div className="container mx-auto px-4 py-12 md:mt-28">
                    <Breadcrumbs items={[
                        { label: 'Areas Covered', href: '/areas-covered' },
                        { label: page.location?.name || 'Location', href: '/areas-covered' },
                        { label: page.title }
                    ]} />
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-6xl page_title font-bold text-gray-600 mb-2">{page.title}</h1>
                        {page.location && (
                            <p className="text-xl text-gray-500">
                                {page.location.name}
                            </p>
                        )}
                    </div>

                    {/* Page Content */}
                    {page.content && (
                        <Card className="mb-8">
                            <CardContent className="prose prose-lg max-w-none p-6">
                                <div dangerouslySetInnerHTML={{ __html: page.content }} />
                            </CardContent>
                        </Card>
                    )}

                    {/* Gallery Items */}
                    {galleryItems && galleryItems.length > 0 && (
                        <div className="mb-12">
                            <h2 className="mb-6 text-4xl page_title font-bold text-gray-600">
                                Our Work in {page.location?.name || 'the Area'}
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {galleryItems.map((item) => (
                                    <Card
                                        key={item.id}
                                        className="overflow-hidden transition-shadow hover:shadow-lg"
                                    >
                                        <div className="aspect-square overflow-hidden bg-gray-100">
                                            <img
                                                src={`/storage/${item.main_image}`}
                                                alt={item.title}
                                                className="h-full w-full object-cover transition-transform hover:scale-105"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-gray-700">
                                                {item.title}
                                            </h3>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Package Items */}
                    {packages && packages.length > 0 && (
                        <div>
                            <h2 className="mb-6 text-3xl font-bold text-gray-600">
                                Available Packages
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {packages.map((pkg) => (
                                    <Card
                                        key={pkg.id}
                                        className="overflow-hidden transition-shadow hover:shadow-lg"
                                    >
                                        <div className="aspect-square overflow-hidden bg-gray-100">
                                            <img
                                                src={`/storage/${pkg.main_image}`}
                                                alt={pkg.title}
                                                className="h-full w-full object-cover transition-transform hover:scale-105"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-gray-700">
                                                {pkg.title}
                                            </h3>
                                        </CardContent>
                                    </Card>
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
