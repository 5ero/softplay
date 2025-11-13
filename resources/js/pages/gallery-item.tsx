import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import Icon from '@/components/app/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface IconData {
    src: string;
    label: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface GalleryItem {
    id: number;
    title: string;
    description: string;
    coverage?: string;
    price: string;
    images: string[];
    icons?: IconData[];
    category: Category;
}

interface Props {
    item: GalleryItem;
}

export default function GalleryItemView({ item }: Props) {
    const [selectedImage, setSelectedImage] = useState(0);
    const isSoftPlaySet = item.category.slug === 'soft-play-sets';

    return (
        <>
            <Head title={item.title}>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-amber-50">
                <Header />
                <div className="container mx-auto px-4 py-12 mt-20 md:mt-28">
                    {/* Back Button */}
                    <Link href="/gallery">
                        <Button variant="ghost" className="mb-6">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Gallery
                        </Button>
                    </Link>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Images Section */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            {item.images && item.images.length > 0 ? (
                                <>
                                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                            src={`/storage/${item.images[selectedImage]}`}
                                            alt={`${item.title} - Image ${selectedImage + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Thumbnail Gallery */}
                                    {item.images.length > 1 && (
                                        <div className="grid grid-cols-4 gap-2">
                                            {item.images.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedImage(index)}
                                                    className={`aspect-square overflow-hidden rounded-md border-2 transition-all ${
                                                        selectedImage === index
                                                            ? 'border-primary'
                                                            : 'border-transparent hover:border-gray-300'
                                                    }`}
                                                >
                                                    <img
                                                        src={`/storage/${image}`}
                                                        alt={`${item.title} - Thumbnail ${index + 1}`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="aspect-square flex items-center justify-center rounded-lg bg-gray-100">
                                    <p className="text-gray-400">No images available</p>
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="space-y-6">
                            <div>
                                <Badge variant="secondary" className="mb-2">
                                    {item.category.name}
                                </Badge>
                                <h1 className="text-4xl font-bold text-gray-900">
                                    {item.title}
                                </h1>
                            </div>

                            <div className="text-3xl font-bold text-primary">
                                £{parseFloat(item.price).toFixed(2)}
                            </div>

                            {item.coverage && (
                                <Card>
                                    <CardContent className="p-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            Coverage Area
                                        </p>
                                        <p className="text-lg font-semibold">{item.coverage}</p>
                                    </CardContent>
                                </Card>
                            )}

                            <div>
                                <h2 className="mb-2 text-xl font-semibold">Description</h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                    {item.description}
                                </p>
                            </div>

                            {/* Icons Section - Only for Soft Play Sets */}
                            {isSoftPlaySet && item.icons && item.icons.length > 0 && (
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold">
                                        What's Included
                                    </h2>
                                    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                                        {item.icons.map((icon, index) => (
                                            <Icon
                                                key={index}
                                                src={icon.src}
                                                label={icon.label}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Contact CTA */}
                            <Card className="bg-orange-50 border-orange-200">
                                <CardContent className="p-6">
                                    <h3 className="mb-2 text-lg font-semibold">
                                        Interested in this item?
                                    </h3>
                                    <p className="mb-4 text-sm text-gray-600">
                                        Get in touch to check availability and book for your event
                                    </p>
                                    <Link href="/contact">
                                        <Button className="w-full">Contact Us</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
