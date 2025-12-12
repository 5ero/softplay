import IconManager from '@/components/icon-manager';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import * as React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Gallery',
        href: '/dashboard/gallery',
    },
    {
        title: 'Create',
        href: '/dashboard/gallery/create',
    },
];

interface Category {
    id: number;
    name: string;
    slug: string;
}

export default function CreateGalleryItem({
    categories,
}: {
    categories: Category[];
}) {
    const [selectedCategory, setSelectedCategory] = React.useState<string>('');
    const [icons, setIcons] = React.useState<{ src: string; label: string }[]>(
        []
    );
    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
    const [selectedVideos, setSelectedVideos] = React.useState<File[]>([]);
    const [mainImageIndex, setMainImageIndex] = React.useState<number>(0);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const videoInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedVideos(Array.from(e.target.files));
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
        // Reset main image index if it was the removed image or higher
        if (mainImageIndex >= index && mainImageIndex > 0) {
            setMainImageIndex(mainImageIndex - 1);
        } else if (mainImageIndex === index) {
            setMainImageIndex(0);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeVideo = (index: number) => {
        setSelectedVideos((prev) => prev.filter((_, i) => i !== index));
        if (videoInputRef.current) {
            videoInputRef.current.value = '';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Gallery Item" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Create Gallery Item
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Add a new item to your gallery
                    </p>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Item Details</CardTitle>
                        <CardDescription>
                            Enter the information for the new gallery item
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action="/dashboard/gallery"
                            method="post"
                            encType="multipart/form-data"
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="category_id">
                                            Category
                                        </Label>
                                        <Select
                                            name="category_id"
                                            value={selectedCategory}
                                            onValueChange={setSelectedCategory}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={String(
                                                            category.id
                                                        )}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={errors.category_id}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            required
                                            placeholder="Bouncy Castle"
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            rows={4}
                                            placeholder="Enter a detailed description..."
                                        />
                                        <InputError
                                            message={errors.description}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="coverage">
                                            Coverage Area
                                        </Label>
                                        <Input
                                            id="coverage"
                                            name="coverage"
                                            placeholder="4.8m x 3.6m"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            e.g., 4.8m x 3.6m
                                        </p>
                                        <InputError message={errors.coverage} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Price (£)</Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            required
                                            placeholder="99.99"
                                        />
                                        <InputError message={errors.price} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="images">Images</Label>
                                        <Input
                                            ref={fileInputRef}
                                            id="images"
                                            name="images[]"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Upload multiple images (max 5MB
                                            each)
                                        </p>
                                        <InputError message={errors.images} />

                                        {/* Preview Selected Files */}
                                        {selectedFiles.length > 0 && (
                                            <div className="mt-4 grid grid-cols-3 gap-2">
                                                {selectedFiles.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative aspect-square overflow-hidden rounded-md border"
                                                    >
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt={file.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                        {mainImageIndex === index && (
                                                            <div className="absolute left-1 top-1 rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                                                                Main
                                                            </div>
                                                        )}
                                                        <div className="absolute right-1 top-1 flex gap-1">
                                                            <Button
                                                                type="button"
                                                                variant="secondary"
                                                                size="sm"
                                                                className="h-6 px-2 text-xs"
                                                                onClick={() => setMainImageIndex(index)}
                                                                disabled={mainImageIndex === index}
                                                            >
                                                                {mainImageIndex === index ? '★' : '☆'}
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="sm"
                                                                className="h-6 w-6 p-0"
                                                                onClick={() => removeFile(index)}
                                                            >
                                                                ×
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <input
                                            type="hidden"
                                            name="main_image_index"
                                            value={mainImageIndex}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="videos">Videos</Label>
                                        <Input
                                            ref={videoInputRef}
                                            id="videos"
                                            name="videos[]"
                                            type="file"
                                            multiple
                                            accept="video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv"
                                            onChange={handleVideoChange}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Upload multiple videos (max 50MB each, formats: MP4, MOV, AVI, WMV)
                                        </p>
                                        <InputError message={errors.videos} />

                                        {/* Preview Selected Videos */}
                                        {selectedVideos.length > 0 && (
                                            <div className="mt-4 space-y-2">
                                                {selectedVideos.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between rounded-md border p-3"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <svg
                                                                className="h-8 w-8 text-muted-foreground"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                            <div>
                                                                <p className="text-sm font-medium">{file.name}</p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => removeVideo(index)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <IconManager
                                        initialIcons={icons}
                                        onChange={setIcons}
                                    />
                                    <input
                                        type="hidden"
                                        name="icons"
                                        value={JSON.stringify(icons)}
                                    />

                                    <div className="grid gap-2">
                                        <Label htmlFor="sort_order">
                                            Sort Order
                                        </Label>
                                        <Input
                                            id="sort_order"
                                            name="sort_order"
                                            type="number"
                                            defaultValue="0"
                                            placeholder="0"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Lower numbers appear first
                                        </p>
                                        <InputError message={errors.sort_order} />
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id="is_package"
                                            name="is_package"
                                            value="1"
                                        />
                                        <Label htmlFor="is_package" className="font-normal cursor-pointer">
                                            This is a package
                                        </Label>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Create Item
                                        </Button>
                                        <Link href="/dashboard/gallery">
                                            <Button
                                                type="button"
                                                variant="outline"
                                            >
                                                Cancel
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
