import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Party Themes',
        href: '/dashboard/party-themes',
    },
];

interface PartyTheme {
    id: number;
    title: string;
    description: string;
    images: string[];
    main_image?: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface PartyThemesIndexProps {
    themes: PartyTheme[];
}

export default function PartyThemesIndex({ themes }: PartyThemesIndexProps) {
    const handleDelete = (id: number) => {
        if (
            confirm(
                'Are you sure you want to delete this party theme? All images will be removed.'
            )
        ) {
            router.delete(`/dashboard/party-themes/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Party Themes" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Party Themes</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage party theme images and descriptions
                        </p>
                    </div>
                    <Link href="/dashboard/party-themes/create">
                        <Button>Add Theme</Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {themes.map((theme) => {
                        const displayImage = theme.main_image || theme.images?.[0];
                        
                        return (
                            <Card key={theme.id}>
                                {displayImage && (
                                    <div className="aspect-video overflow-hidden bg-gray-100">
                                        <img
                                            src={`/storage/${displayImage}`}
                                            alt={theme.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-2">
                                        <CardTitle>{theme.title}</CardTitle>
                                        {theme.is_active ? (
                                            <Badge variant="default">Active</Badge>
                                        ) : (
                                            <Badge variant="secondary">
                                                Inactive
                                            </Badge>
                                        )}
                                    </div>
                                    <CardDescription>
                                        Sort Order: {theme.sort_order}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div 
                                            className="line-clamp-2 text-sm text-muted-foreground"
                                            dangerouslySetInnerHTML={{ __html: theme.description }}
                                        />
                                        {theme.images && theme.images.length > 0 && (
                                            <p className="text-xs text-muted-foreground">
                                                {theme.images.length} image(s)
                                            </p>
                                        )}
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/dashboard/party-themes/${theme.id}/edit`}
                                            >
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(theme.id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {themes.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-muted-foreground">
                                No party themes yet
                            </p>
                            <Link
                                href="/dashboard/party-themes/create"
                                className="mt-4"
                            >
                                <Button>Create your first theme</Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
