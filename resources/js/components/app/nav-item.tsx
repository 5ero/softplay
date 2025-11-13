import { Link, usePage } from '@inertiajs/react';

const NavItem = ({ title, href, method = 'get' }: { title: string; href: string; method?: 'get' | 'post' | 'put' | 'patch' | 'delete' }) => {
    const { url } = usePage();
    const isActive = url === href || url.startsWith(href + '/');

    return (
        <div className="mx-4">
            <Link
                href={href}
                method={method}
                className={`font-semibold uppercase text-slate-800 rounded p-4 hover:bg-orange-600 hover:text-white ${isActive ? 'bg-orange-600 text-white' : ''}`}
            >
                {title}
            </Link>
        </div>
    );
};

export default NavItem;