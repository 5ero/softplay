import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

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
    main_image?: string;
    category: Category;
}

interface Props {
    items: GalleryItem[];
}

export default function Prices({ items }: Props) {
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

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
                                            onClick={() => setSelectedItem(item)}
                                            className="flex cursor-pointer items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-accent"
                                        >
                                            <div className="overflow-hidden rounded">
                                                {displayImage ? (
                                                    <img
                                                        src={`/storage/${displayImage}`}
                                                        alt={item.title}
                                                        className="h-16 w-16 rounded object-cover transition-transform hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100 text-gray-400">
                                                        No image
                                                    </div>
                                                )}
                                            </div>
                                            
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

            <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
                <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                    {selectedItem && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl">{selectedItem.title}</DialogTitle>
                                <DialogDescription>
                                    <Badge variant="secondary" className="mt-2">
                                        {selectedItem.category.name}
                                    </Badge>
                                </DialogDescription>
                            </DialogHeader>
                            
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    {selectedItem.images.length > 0 ? (
                                        <div className="grid gap-2">
                                            {selectedItem.images.map((image, index) => (
                                                <div key={index} className="overflow-hidden rounded-lg">
                                                    <img
                                                        src={`/storage/${image}`}
                                                        alt={`${selectedItem.title} - Image ${index + 1}`}
                                                        className="h-auto w-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                                            No images available
                                        </div>
                                    )}
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">Price</h3>
                                        <p className="text-3xl font-bold text-primary">
                                            £{parseFloat(selectedItem.price).toFixed(2)}
                                        </p>
                                    </div>
                                    
                                    {selectedItem.description && (
                                        <div>
                                            <h3 className="text-lg font-semibold">Description</h3>
                                            <p className="text-gray-700">{selectedItem.description}</p>
                                        </div>
                                    )}
                                    
                                    {selectedItem.coverage && (
                                        <div>
                                            <h3 className="text-lg font-semibold">Coverage</h3>
                                            <p className="text-gray-700">{selectedItem.coverage}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
