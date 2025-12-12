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
        title: 'Edit',
        href: '#',
    },
];

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface GalleryItem {
    id: number;
    category_id: number;
    title: string;
    description: string;
    coverage?: string;
    price: string;
    images: string[];
    main_image?: string;
    videos?: string[];
    icons: { src: string; label: string }[];
    is_active: boolean;
    is_package: boolean;
    sort_order: number;
}

export default function EditGalleryItem({
    item,
    categories,
}: {
    item: GalleryItem;
    categories: Category[];
}) {
    const [selectedCategory, setSelectedCategory] = React.useState<string>(
        String(item.category_id)
    );
    const [icons, setIcons] = React.useState<
        { src: string; label: string }[]
    >(item.icons || []);
    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
    const [selectedVideos, setSelectedVideos] = React.useState<File[]>([]);
    const [existingImages, setExistingImages] = React.useState<string[]>(
        item.images || []
    );
    const [existingVideos, setExistingVideos] = React.useState<string[]>(
        item.videos || []
    );
    const [mainImage, setMainImage] = React.useState<string>(
        item.main_image || ''
    );
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

    const removeNewFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeNewVideo = (index: number) => {
        setSelectedVideos((prev) => prev.filter((_, i) => i !== index));
        if (videoInputRef.current) {
            videoInputRef.current.value = '';
        }
    };

    const removeExistingImage = (index: number) => {
        const imageToRemove = existingImages[index];
        if (imageToRemove === mainImage) {
            setMainImage('');
        }
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    const setAsMainImage = (image: string) => {
        setMainImage(image);
    };

    const removeExistingVideo = (index: number) => {
        setExistingVideos((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${item.title}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Edit Gallery Item
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Update the item information
                    </p>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Item Details</CardTitle>
                        <CardDescription>
                            Modify the gallery item information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={`/dashboard/gallery/${item.id}`}
                            method="post"
                            encType="multipart/form-data"
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="PUT"
                                    />

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
                                                <SelectValue />
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
                                            defaultValue={item.title}
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
                                            defaultValue={item.description}
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
                                            defaultValue={item.coverage || ''}
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
                                            defaultValue={item.price}
                                        />
                                        <InputError message={errors.price} />
                                    </div>

                                    {existingImages.length > 0 && (
                                        <div className="grid gap-2">
                                            <Label>Current Images</Label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {existingImages.map(
                                                    (image, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative aspect-square overflow-hidden rounded-md border"
                                                        >
                                                            <img
                                                                src={`/storage/${image}`}
                                                                alt={`${item.title} ${index + 1}`}
                                                                className="h-full w-full object-cover"
                                                            />
                                                            {mainImage === image && (
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
                                                                    onClick={() =>
                                                                        setAsMainImage(image)
                                                                    }
                                                                    disabled={mainImage === image}
                                                                >
                                                                    {mainImage === image ? '★' : '☆'}
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    className="h-6 w-6 p-0"
                                                                    onClick={() =>
                                                                        removeExistingImage(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    ×
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <input
                                        type="hidden"
                                        name="existing_images"
                                        value={JSON.stringify(existingImages)}
                                    />
                                    <input
                                        type="hidden"
                                        name="main_image"
                                        value={mainImage}
                                    />

                                    <div className="grid gap-2">
                                        <Label htmlFor="images">
                                            Add More Images
                                        </Label>
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
                                            Upload additional images (max 5MB
                                            each)
                                        </p>
                                        <InputError message={errors.images} />

                                        {/* Preview New Files */}
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
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            className="absolute right-1 top-1 h-6 w-6 p-0"
                                                            onClick={() => removeNewFile(index)}
                                                        >
                                                            ×
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {existingVideos.length > 0 && (
                                        <div className="grid gap-2">
                                            <Label>Current Videos</Label>
                                            <div className="space-y-2">
                                                {existingVideos.map((video, index) => (
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
                                                            <p className="text-sm font-medium">
                                                                {video.split('/').pop()}
                                                            </p>
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => removeExistingVideo(index)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <input
                                        type="hidden"
                                        name="existing_videos"
                                        value={JSON.stringify(existingVideos)}
                                    />

                                    <div className="grid gap-2">
                                        <Label htmlFor="videos">
                                            Add More Videos
                                        </Label>
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
                                            Upload additional videos (max 50MB each, formats: MP4, MOV, AVI, WMV)
                                        </p>
                                        <InputError message={errors.videos} />

                                        {/* Preview New Videos */}
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
                                                            onClick={() => removeNewVideo(index)}
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
                                        <Label htmlFor="is_active">
                                            Status
                                        </Label>
                                        <Select
                                            name="is_active"
                                            defaultValue={
                                                item.is_active ? '1' : '0'
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="0">
                                                    Inactive
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.is_active} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="sort_order">
                                            Sort Order
                                        </Label>
                                        <Input
                                            id="sort_order"
                                            name="sort_order"
                                            type="number"
                                            defaultValue={item.sort_order}
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
                                            defaultChecked={item.is_package}
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
                                            Update Item
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
