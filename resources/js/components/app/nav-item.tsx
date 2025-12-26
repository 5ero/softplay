import { Link, usePage } from '@inertiajs/react';

const NavItem = ({ title, href, method = 'get' }: { title: string; href: string; method?: 'get' | 'post' | 'put' | 'patch' | 'delete' }) => {
    const { url } = usePage();
    const isActive = url === href || url.startsWith(href + '/');

    return (
        <div className="md:mx-4">
            <Link
                href={href}
                method={method}
                className={`font-semibold text-slate-800 rounded py-2 px-3 hover:bg-orange-600 hover:text-white ${isActive ? 'md:bg-orange-600 text-white' : ''}`}
            >
                {title}
            </Link>
        </div>
    );
};

export default NavItem;