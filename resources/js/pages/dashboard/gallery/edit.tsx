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
    icons: { src: string; label: string }[];
    is_active: boolean;
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

                                    {item.images && item.images.length > 0 && (
                                        <div className="grid gap-2">
                                            <Label>Current Images</Label>
                                            <div className="grid grid-cols-3 gap-2">
                                                {item.images.map(
                                                    (image, index) => (
                                                        <img
                                                            key={index}
                                                            src={`/storage/${image}`}
                                                            alt={`${item.title} ${index + 1}`}
                                                            className="aspect-square rounded-md border object-cover"
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid gap-2">
                                        <Label htmlFor="images">
                                            Add More Images
                                        </Label>
                                        <Input
                                            id="images"
                                            name="images[]"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Upload additional images (max 5MB
                                            each)
                                        </p>
                                        <InputError message={errors.images} />
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
