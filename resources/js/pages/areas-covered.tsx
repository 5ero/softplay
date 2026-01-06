import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface Location {
    id: number;
    name: string;
    slug: string;
}

interface LandingPage {
    id: number;
    title: string;
    slug: string;
    location_id: number;
}

interface AreasCoveredProps {
    locations: Location[];
    landingPages: LandingPage[];
}

export default function AreasCovered({ locations, landingPages }: AreasCoveredProps) {
    const getLocationPages = (locationId: number) => {
        return landingPages.filter(page => page.location_id === locationId);
    };

    return (
        <>
            <Head title="Areas Covered">
                <meta name="description" content="We provide softplay hire services across Bedfordshire and surrounding areas" />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-blue-50">
                <Header />
                <div className="container mx-auto px-4 py-12 md:mt-28">
                    <div className="mb-8">
                        <h1 className="text-5xl font-bold text-gray-600 mb-4">Areas Covered</h1>
                        <p className="text-xl text-gray-500">
                            We provide softplay hire services across the following locations
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {locations.map((location) => {
                            const pages = getLocationPages(location.id);
                            return (
                                <Card key={location.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-blue-600" />
                                            {location.name}
                                        </CardTitle>
                                        {pages.length > 0 && (
                                            <CardDescription>
                                                {pages.length} service {pages.length === 1 ? 'page' : 'pages'}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    {pages.length > 0 && (
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {pages.map((page) => (
                                                    <li key={page.id}>
                                                        <Link
                                                            href={`/${page.slug}`}
                                                            className="text-blue-600 hover:text-blue-800 hover:underline"
                                                        >
                                                            {page.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    )}
                                </Card>
                            );
                        })}
                    </div>

                    {locations.length === 0 && (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-500">No locations added yet</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}
