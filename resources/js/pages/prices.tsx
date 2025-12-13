import { Head } from '@inertiajs/react';
import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface GalleryItem {
    id: number;
    title: string;
    price: string;
    images: string[];
    main_image?: string;
    category: Category;
}

interface Props {
    items: GalleryItem[];
}

export default function Prices({ items }: Props) {
    return (
        <>
            <Head title="Prices">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-amber-50">
                <Header />
                <div className="container mx-auto px-4 py-12 mt-20 md:mt-28">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900">Our Prices</h1>
                        <p className="mt-2 text-gray-600">
                            View our complete price list for all items and packages
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Price List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {items.map((item) => {
                                    const displayImage = item.main_image || item.images[0];
                                    
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-accent"
                                        >
                                            {displayImage ? (
                                                <img
                                                    src={`/storage/${displayImage}`}
                                                    alt={item.title}
                                                    className="h-16 w-16 rounded object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100 text-gray-400">
                                                    No image
                                                </div>
                                            )}
                                            
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {item.category.name}
                                                </p>
                                            </div>
                                            
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-primary">
                                                    £{parseFloat(item.price).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}

                                {items.length === 0 && (
                                    <p className="py-8 text-center text-muted-foreground">
                                        No items available at the moment
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Footer />
            </div>
        </>
    );
}
