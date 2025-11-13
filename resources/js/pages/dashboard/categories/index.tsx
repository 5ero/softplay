import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Categories',
        href: '/dashboard/categories',
    },
];

interface Category {
    id: number;
    name: string;
    slug: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export default function CategoriesIndex({
    categories,
}: {
    categories: Category[];
}) {
    const handleDelete = (id: number) => {
        if (
            confirm(
                'Are you sure you want to delete this category? All gallery items in this category will also be deleted.'
            )
        ) {
            router.delete(`/dashboard/categories/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Categories</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage your gallery categories
                        </p>
                    </div>
                    <Link href="/dashboard/categories/create">
                        <Button>Add Category</Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Card key={category.id}>
                            <CardHeader>
                                <CardTitle>{category.name}</CardTitle>
                                <CardDescription>
                                    Slug: {category.slug}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/dashboard/categories/${category.id}/edit`}
                                    >
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {categories.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-muted-foreground">
                                No categories yet
                            </p>
                            <Link
                                href="/dashboard/categories/create"
                                className="mt-4"
                            >
                                <Button>Create your first category</Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
