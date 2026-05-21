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
        title: 'Soft Play',
        href: '/dashboard/soft-play',
    },
];

interface SoftPlayItem {
    id: number;
    title: string;
    description: string;
    price: string;
    images: string[];
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface SoftPlayIndexProps {
    items: SoftPlayItem[];
    filters: Record<string, string>;
}

export default function SoftPlayIndex({ items }: SoftPlayIndexProps) {
    const handleDelete = (id: number) => {
        if (
            confirm(
                'Are you sure you want to delete this soft play item? All images will be removed.'
            )
        ) {
            router.delete(`/dashboard/soft-play/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Soft Play Items" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Soft Play</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage your soft play items
                        </p>
                    </div>
                    <Link href="/dashboard/soft-play/create">
                        <Button>Add Item</Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <Card key={item.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between gap-2">
                                    <CardTitle>{item.title}</CardTitle>
                                    {item.is_active ? (
                                        <Badge variant="default">Active</Badge>
                                    ) : (
                                        <Badge variant="secondary">Inactive</Badge>
                                    )}
                                </div>
                                <CardDescription>
                                    Sort order: {item.sort_order}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div
                                        className="line-clamp-2 text-sm text-muted-foreground"
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />
                                    <p className="text-lg font-semibold">
                                        £{item.price}
                                    </p>
                                    {item.images && item.images.length > 0 && (
                                        <p className="text-xs text-muted-foreground">
                                            {item.images.length} image(s)
                                        </p>
                                    )}
                                    <div className="flex gap-2">
                                        <Link href={`/dashboard/soft-play/${item.id}/edit`}>
                                            <Button variant="outline" size="sm">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {items.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-muted-foreground">
                                No soft play items yet
                            </p>
                            <Link href="/dashboard/soft-play/create" className="mt-4">
                                <Button>Create your first item</Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
