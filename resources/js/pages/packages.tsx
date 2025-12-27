import { useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import Footer from '@/components/app/footer';
import Header from '@/components/app/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, X, ChevronDown } from 'lucide-react';

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

interface Filters {
    search?: string;
    category?: number;
    min_price?: string;
    max_price?: string;
}

interface Props {
    items: GalleryItem[];
    categories: Category[];
    filters: Filters;
}

export default function Packages({ items, categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category?.toString() || 'all');
    const [minPrice, setMinPrice] = useState(filters.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || '');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const applyFilters = () => {
        const params: Record<string, string> = {};

        if (search) {
            params.search = search;
        }
        if (category && category !== 'all') {
            params.category = category;
        }
        if (minPrice) {
            params.min_price = minPrice;
        }
        if (maxPrice) {
            params.max_price = maxPrice;
        }

        router.get('/gallery', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setCategory('all');
        setMinPrice('');
        setMaxPrice('');
        router.get('/gallery');
    };

    const hasActiveFilters =
        filters.search || filters.category || filters.min_price || filters.max_price;

    return (
        <>
            <Head title="Packages">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col bg-amber-50">
                <Header />
                <div className="container mx-auto px-4 py-12 md:mt-28">
                    <div className="mb-8">
                        <h1 className="text-5xl font-bold text-orange-600">Packages available</h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Browse our collection of packages.
                        </p>
                    </div>

                {/* Filter Section */}
                <Card className="mb-8">
                    <CardContent className="pt-6">
                        {/* Search - Always Visible */}
                        <div className="space-y-2 mb-4">
                            <Label htmlFor="search">Search</Label>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="search"
                                    placeholder="Search items..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            applyFilters();
                                        }
                                    }}
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        {/* Accordion Header for Additional Filters */}
                        <div 
                            className="flex items-center justify-between cursor-pointer py-2 border-t pt-4"
                            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        >
                            <h3 className="text-sm font-semibold">Additional Filters</h3>
                            <div className="flex items-center gap-2">
                                {hasActiveFilters && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            clearFilters();
                                        }}
                                        className="text-muted-foreground"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Clear filters
                                    </Button>
                                )}
                                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isFiltersOpen ? 'rotate-180' : ''}`} />
                            </div>
                        </div>

                        {/* Collapsible Filters */}
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFiltersOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="grid gap-4 md:grid-cols-3 pt-4">
                            {/* Category Filter */}
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="All categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All categories</SelectItem>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Min Price */}
                            <div className="space-y-2">
                                <Label htmlFor="min_price">Min Price</Label>
                                <Input
                                    id="min_price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                />
                            </div>

                            {/* Max Price */}
                            <div className="space-y-2">
                                <Label htmlFor="max_price">Max Price</Label>
                                <Input
                                    id="max_price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="5000.00"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        </div>

                        {/* Apply Filters Button */}
                        <div className="mt-4">
                            <Button onClick={applyFilters} className="w-full md:w-auto">
                                Apply Filters
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        Showing {items.length} {items.length === 1 ? 'item' : 'items'}
                    </p>
                </div>

                {/* Gallery Grid */}
                {items.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => {
                            // Display main image first if set, otherwise first image
                            const displayImage = item.main_image || item.images[0];
                            
                            return (
                            <Link key={item.id} href={`/gallery/${item.id}`}>
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
                                            <Badge variant="secondary">{item.category.name}</Badge>
                                        </div>
                                        {item.coverage && (
                                            <p className="text-sm text-muted-foreground">
                                                Coverage: {item.coverage}
                                            </p>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <p className="line-clamp-3 text-sm text-gray-600">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex items-center justify-between">
                                        <div className="text-2xl font-bold text-primary">
                                            £{parseFloat(item.price).toFixed(2)}
                                        </div>
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
                            No items found matching your filters. Try adjusting your search
                            criteria.
                        </p>
                    </Card>
                )}
                </div>
                <Footer />
            </div>
        </>
    );
}
