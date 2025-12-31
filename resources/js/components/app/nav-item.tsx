import { Link, usePage } from '@inertiajs/react';

const NavItem = ({ title, href, method = 'get', activeOverride }: { title: string; href: string; method?: 'get' | 'post' | 'put' | 'patch' | 'delete'; activeOverride?: string }) => {
    const { url } = usePage();
    const checkUrl = activeOverride || url;
    const isActive = checkUrl === href || checkUrl.startsWith(href + '/');

    return (
        <div className="md:mx-4">
            <Link
                href={href}
                method={method}
                className={`font-semibold text-slate-800 rounded py-2 px-3 hover:bg-gray-400 md:hover:text-white ${isActive ? 'md:bg-gray-600 md:text-white' : ''}`}
            >
                {title}
            </Link>
        </div>
    );
};

export default NavItem;