import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';
import * as React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Event Decor', href: '/dashboard/party-themes' },
    { title: 'Edit', href: '#' },
];

interface PartyTheme {
    id: number;
    title: string;
    description: string;
    images: string[];
    main_image?: string;
    sort_order: number;
    is_active: boolean;
}

export default function EditPartyTheme({ theme }: { theme: PartyTheme }) {
    const [description, setDescription] = React.useState<string>(theme.description);
    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
    const [mainImageIndex, setMainImageIndex] = React.useState<number>(0);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
        if (mainImageIndex >= index && mainImageIndex > 0) {
            setMainImageIndex(mainImageIndex - 1);
        } else if (mainImageIndex === index) {
            setMainImageIndex(0);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${theme.title}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Edit Event Decor</h1>
                    <p className="text-sm text-muted-foreground">Update theme information</p>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Theme Details</CardTitle>
                        <CardDescription>Update the event decor information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            action={`/dashboard/party-themes/${theme.id}`}
                            method="post"
                            encType="multipart/form-data"
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
                                            type="text"
                                            required
                                            defaultValue={theme.title}
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <RichTextEditor
                                            content={description}
                                            onChange={setDescription}
                                            name="description"
                                        />
                                        <InputError message={errors.description} />
                                    </div>

                                    {theme.images && theme.images.length > 0 && (
                                        <div className="space-y-2">
                                            <Label>Current Images</Label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {theme.images.map((image, index) => (
                                                    <div key={index} className="relative aspect-video">
                                                        <img
                                                            src={`/storage/${image}`}
                                                            alt={`${theme.title} ${index + 1}`}
                                                            className="h-full w-full rounded object-cover"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid gap-2">
                                        <Label htmlFor="images">Add New Images</Label>
                                        <Input
                                            ref={fileInputRef}
                                            id="images"
                                            name="images[]"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Upload additional images (Max 10MB each)
                                        </p>
                                        <InputError message={errors.images} />
                                    </div>

                                    {selectedFiles.length > 0 && (
                                        <div className="space-y-2">
                                            <Label>New Images to Add</Label>
                                            <div className="grid gap-2">
                                                {selectedFiles.map((file, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between rounded-md border p-2"
                                                    >
                                                        <span className="text-sm">{file.name}</span>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeFile(index)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid gap-2">
                                        <Label htmlFor="sort_order">Sort Order</Label>
                                        <Input
                                            id="sort_order"
                                            name="sort_order"
                                            type="number"
                                            defaultValue={theme.sort_order}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Lower numbers appear first
                                        </p>
                                        <InputError message={errors.sort_order} />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_active"
                                            name="is_active"
                                            value="1"
                                            defaultChecked={theme.is_active}
                                        />
                                        <Label htmlFor="is_active">Active (visible on website)</Label>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <Link href="/dashboard/party-themes">
                                            <Button type="button" variant="outline">
                                                Cancel
                                            </Button>
                                        </Link>
                                        <Button type="submit" disabled={processing}>
                                            {processing ? 'Updating...' : 'Update Theme'}
                                        </Button>
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
