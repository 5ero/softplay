import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Eye, Package, FolderOpen, TrendingUp } from 'lucide-react';

interface Category {
    id: number;
    name: string;
}

interface GalleryItem {
    id: number;
    title: string;
    view_count: number;
    is_active: boolean;
    category: Category;
    created_at: string;
}

interface Stats {
    total_items: number;
    active_items: number;
    total_categories: number;
    total_views: number;
}

interface Props {
    stats: Stats;
    mostViewed: GalleryItem[];
    recentlyAdded: GalleryItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ stats, mostViewed, recentlyAdded }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Stats Grid */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_items}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.active_items} active
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Categories</CardTitle>
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_categories}</div>
                            <p className="text-xs text-muted-foreground">
                                Active categories
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_views}</div>
                            <p className="text-xs text-muted-foreground">
                                All time views
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Views/Item</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_items > 0
                                    ? Math.round(stats.total_views / stats.total_items)
                                    : 0}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Per gallery item
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Most Viewed & Recently Added Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Most Viewed Items */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Most Viewed Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mostViewed.length > 0 ? (
                                    mostViewed.map((item, index) => (
                                        <Link
                                            key={item.id}
                                            href={`/dashboard/gallery/${item.id}/edit`}
                                            className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                                    #{index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{item.title}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.category.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {item.is_active ? (
                                                    <Badge variant="default">Active</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Inactive</Badge>
                                                )}
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <Eye className="h-4 w-4" />
                                                    {item.view_count}
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-center text-muted-foreground">
                                        No items yet
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recently Added Items */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recently Added Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentlyAdded.length > 0 ? (
                                    recentlyAdded.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/dashboard/gallery/${item.id}/edit`}
                                            className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent"
                                        >
                                            <div>
                                                <p className="font-medium">{item.title}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {item.category.name} •{' '}
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {item.is_active ? (
                                                    <Badge variant="default">Active</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Inactive</Badge>
                                                )}
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <Eye className="h-4 w-4" />
                                                    {item.view_count}
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-center text-muted-foreground">
                                        No items yet
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
