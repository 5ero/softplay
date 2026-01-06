import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Landing Pages', href: '/dashboard/landing-pages' },
];

interface Location {
    id: number;
    name: string;
}

interface LandingPage {
    id: number;
    title: string;
    slug: string;
    is_active: boolean;
    location?: Location;
}

interface LandingPagesIndexProps {
    pages: LandingPage[];
}

export default function LandingPagesIndex({ pages }: LandingPagesIndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this landing page?')) {
            router.delete(`/dashboard/landing-pages/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Landing Pages" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Landing Pages</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage SEO landing pages
                        </p>
                    </div>
                    <Link href="/dashboard/landing-pages/create">
                        <Button>Add Landing Page</Button>
                    </Link>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {pages.map((page) => (
                        <Card key={page.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between gap-2">
                                    <CardTitle>{page.title}</CardTitle>
                                    {page.is_active ? (
                                        <Badge variant="default">Active</Badge>
                                    ) : (
                                        <Badge variant="secondary">Inactive</Badge>
                                    )}
                                </div>
                                <CardDescription>
                                    /{page.slug}
                                    {page.location && ` • ${page.location.name}`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2">
                                    <Link href={`/dashboard/landing-pages/${page.id}/edit`}>
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(page.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {pages.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-muted-foreground">No landing pages yet</p>
                            <Link href="/dashboard/landing-pages/create" className="mt-4">
                                <Button>Create your first landing page</Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
