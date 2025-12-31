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
    slug: string;
    description: string;
    coverage?: string;
    price: string;
    images: string[];
    main_image?: string;
    videos?: string[];
    icons?: IconData[];
    category: Category;
    is_package: boolean;
}

interface Props {
    item: GalleryItem;
}

export default function GalleryItemView({ item }: Props) {
    // Sort images so main image is first
    const sortedImages = item.images && item.images.length > 0 
        ? item.main_image 
            ? [item.main_image, ...item.images.filter(img => img !== item.main_image)]
            : item.images
        : [];
    
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
                <meta name="description" content={item.description.replace(/<[^>]+>/g, '').slice(0, 160)} />   
                <link rel="canonical" href={`https://funtimesoftplay.co.uk/gallery/${item.slug}`} />
            </Head>
            <div className="flex min-h-screen flex-col bg-blue-50">
                <Header activeOverride={item.is_package ? '/packages' : '/gallery'} />
                <div className="container mx-auto px-4 py-12 md:mt-28">
                    {/* Back Button */}
                    <Link href={item.is_package ? '/packages' : '/gallery'}>
                        <Button variant="ghost" className="mb-6">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to {item.is_package ? 'Packages' : 'Gallery'}
                        </Button>
                    </Link>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Images Section */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            {sortedImages.length > 0 ? (
                                <>
                                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                            src={`/storage/${sortedImages[selectedImage]}`}
                                            alt={`${item.title} - Image ${selectedImage + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Thumbnail Gallery */}
                                    {sortedImages.length > 1 && (
                                        <div className="grid grid-cols-4 gap-2">
                                            {sortedImages.map((image, index) => (
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
                                            Dimensions
                                        </p>
                                        <p className="text-lg font-semibold">{item.coverage}</p>
                                    </CardContent>
                                </Card>
                            )}

                            <div>
                                <h2 className="mb-2 text-xl font-semibold">Description</h2>
                                <div 
                                    className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                />
                            </div>

                            {/* Videos Section */}
                            {item.videos && item.videos.length > 0 && (
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold">Videos</h2>
                                    <div className="space-y-4">
                                        {item.videos.map((video, index) => (
                                            <div key={index} className="overflow-hidden rounded-lg border">
                                                <video
                                                    controls
                                                    className="w-full"
                                                    preload="metadata"
                                                >
                                                    <source src={`/storage/${video}`} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

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
                            <Card className="bg-blue-100 border-blue-200">
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
