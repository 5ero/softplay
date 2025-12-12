import InputError from '@/components/input-error';
import WysiwygEditor from '@/components/wysiwyg-editor';
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
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'About Content',
        href: '/dashboard/about',
    },
];

interface AboutContent {
    id: number;
    title: string;
    content: string;
}

export default function EditAboutContent({ content }: { content: AboutContent }) {
    const { data, setData, put, processing, errors } = useForm({
        title: content.title,
        content: content.content,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/dashboard/about');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit About Content" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Edit About Content</h1>
                    <p className="text-sm text-muted-foreground">
                        Update the content displayed on the About page
                    </p>
                </div>

                <Card className="max-w-4xl">
                    <CardHeader>
                        <CardTitle>About Page Content</CardTitle>
                        <CardDescription>
                            Edit the title and content that appears on the public About page
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    required
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="content">Content</Label>
                                <WysiwygEditor
                                    content={data.content}
                                    onChange={(value) => setData('content', value)}
                                    name="content"
                                />
                                <p className="text-xs text-muted-foreground">
                                    This content will appear on the About page after the title
                                </p>
                                <InputError message={errors.content} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button type="submit" disabled={processing}>
                                    Update Content
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
