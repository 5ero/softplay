import InputError from '@/components/input-error';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
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
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';

interface Location {
    id: number;
    name: string;
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
    location_id: number | null;
    meta_title: string | null;
    meta_description: string | null;
    sort_order: number;
    is_active: boolean;
    gallery_item_ids: number[];
}

interface EditLandingPageProps {
    page: LandingPage;
    locations: Location[];
    galleryItems: GalleryItem[];
}

const getBreadcrumbs = (page: LandingPage): BreadcrumbItem[] => [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Landing Pages',
        href: '/dashboard/landing-pages',
    },
    {
        title: page.title,
        href: `/dashboard/landing-pages/${page.id}/edit`,
    },
];

export default function EditLandingPage({ page, locations, galleryItems }: EditLandingPageProps) {
    const breadcrumbs = getBreadcrumbs(page);
    const [content, setContent] = useState(page.content || '');
    const [selectedItems, setSelectedItems] = useState<number[]>(page.gallery_item_ids || []);

    const toggleGalleryItem = (id: number) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${page.title}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Edit Landing Page</h1>
                    <p className="text-sm text-muted-foreground">
                        Update the landing page information
                    </p>
                </div>

                <Card className="max-w-4xl">
                    <CardHeader>
                        <CardTitle>Landing Page Details</CardTitle>
                        <CardDescription>
                            Modify the information for this landing page
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={`/dashboard/landing-pages/${page.id}`}
                            method="post"
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <input type="hidden" name="_method" value="PUT" />

                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            required
                                            defaultValue={page.title}
                                            placeholder="Softplay Hire in Bedfordshire"
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input
                                            id="slug"
                                            name="slug"
                                            defaultValue={page.slug}
                                            placeholder="softplay-hire-bedfordshire"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            URL-friendly version. Leave blank to auto-generate.
                                        </p>
                                        <InputError message={errors.slug} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="location_id">Location</Label>
                                        <select
                                            id="location_id"
                                            name="location_id"
                                            defaultValue={page.location_id || ''}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                        >
                                            <option value="">Select a location</option>
                                            {locations.map((location) => (
                                                <option key={location.id} value={location.id}>
                                                    {location.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.location_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="content">Content</Label>
                                        <RichTextEditor
                                            content={content}
                                            onChange={setContent}
                                        />
                                        <input type="hidden" name="content" value={content} />
                                        <InputError message={errors.content} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Gallery Items</Label>
                                        <div className="grid gap-2 rounded-md border p-4 max-h-96 overflow-y-auto">
                                            {galleryItems.length === 0 ? (
                                                <p className="text-sm text-muted-foreground">
                                                    No gallery items available
                                                </p>
                                            ) : (
                                                galleryItems.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`gallery_item_${item.id}`}
                                                            checked={selectedItems.includes(
                                                                item.id
                                                            )}
                                                            onChange={() =>
                                                                toggleGalleryItem(item.id)
                                                            }
                                                            className="h-4 w-4 rounded border-gray-300"
                                                        />
                                                        <Label
                                                            htmlFor={`gallery_item_${item.id}`}
                                                            className="font-normal cursor-pointer flex items-center gap-2"
                                                        >
                                                            {item.main_image && (
                                                                <img
                                                                    src={`/storage/${item.main_image}`}
                                                                    alt={item.title}
                                                                    className="h-10 w-10 rounded object-cover"
                                                                />
                                                            )}
                                                            {item.title}
                                                        </Label>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        {selectedItems.map((id) => (
                                            <input
                                                key={id}
                                                type="hidden"
                                                name="gallery_item_ids[]"
                                                value={id}
                                            />
                                        ))}
                                        <InputError message={errors.gallery_item_ids} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="meta_title">Meta Title</Label>
                                        <Input
                                            id="meta_title"
                                            name="meta_title"
                                            defaultValue={page.meta_title || ''}
                                            placeholder="Best Softplay Hire in Bedfordshire"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            SEO title tag (recommended: 50-60 characters)
                                        </p>
                                        <InputError message={errors.meta_title} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="meta_description">Meta Description</Label>
                                        <Textarea
                                            id="meta_description"
                                            name="meta_description"
                                            rows={3}
                                            defaultValue={page.meta_description || ''}
                                            placeholder="Professional softplay hire services in Bedfordshire..."
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            SEO meta description (recommended: 150-160 characters)
                                        </p>
                                        <InputError message={errors.meta_description} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="sort_order">Sort Order</Label>
                                        <Input
                                            id="sort_order"
                                            name="sort_order"
                                            type="number"
                                            defaultValue={page.sort_order}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Lower numbers appear first
                                        </p>
                                        <InputError message={errors.sort_order} />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            name="is_active"
                                            defaultChecked={page.is_active}
                                            value="1"
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="is_active" className="font-normal">
                                            Active
                                        </Label>
                                        <InputError message={errors.is_active} />
                                    </div>

                                    <div className="flex gap-4">
                                        <Button type="submit" disabled={processing}>
                                            Update Landing Page
                                        </Button>
                                        <Link href="/dashboard/landing-pages">
                                            <Button type="button" variant="outline">
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
