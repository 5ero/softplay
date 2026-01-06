import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Tag, Images, ExternalLink, FileText, PoundSterling, PartyPopper, MapPin, FileType } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'View Website',
        href: '/',
        icon: ExternalLink,
    },
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Categories',
        href: '/dashboard/categories',
        icon: Tag,
    },
    {
        title: 'Gallery',
        href: '/dashboard/gallery',
        icon: Images,
    },
    {
        title: 'Event Decor',
        href: '/dashboard/party-themes',
        icon: PartyPopper,
    },
    {
        title: 'Locations',
        href: '/dashboard/locations',
        icon: MapPin,
    },
    {
        title: 'Landing Pages',
        href: '/dashboard/landing-pages',
        icon: FileType,
    },
    {
        title: 'Prices',
        href: '/dashboard/prices',
        icon: PoundSterling,
    },
];

const footerNavItems: NavItem[] = [
   
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
