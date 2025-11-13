import Icon from '@/components/app/icon';

interface IconData {
    src: string;
    label: string;
}

interface SetItem {
    id: number;
    title: string;
    description: string;
    coverage?: string;
    price: string;
    images: string[];
    icons: IconData[];
    sort_order: number;
}

interface SetsProps {
    sets: SetItem[];
}

const bgColors = ['bg-white', 'bg-slate-100', 'bg-orange-100', 'bg-blue-100'];

const Sets = ({ sets }: SetsProps) => {
    if (!sets || sets.length === 0) {
        return null;
    }

    return (
        <div>
            {sets.map((set, index) => (
                <div
                    key={set.id}
                    className={`min-h-screen ${bgColors[index % bgColors.length]}`}
                >
                    <div className="max-w-7xl mx-auto md:p-8">
                        <div className="flex flex-col items-center py-12 md:pt-20">
                            <h1 className="text-5xl text-slate-600 md:py-2 font-semibold mb-6 text-center">
                                {set.title}
                            </h1>
                            <p className="p-8 prose py-2 text-slate-700 text-lg whitespace-pre-line">
                                {set.description}
                            </p>
                            <div
                                className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div
                                    className={`${index % 2 === 1 ? 'order-2 md:order-1' : ''} border border-slate-200 rounded m-4 bg-white`}
                                >
                                    {set.images && set.images.length > 0 && (
                                        <img
                                            src={`/storage/${set.images[0]}`}
                                            className="p-2 md:p-4"
                                            alt={set.title}
                                        />
                                    )}
                                </div>
                                <div
                                    className={`${index % 2 === 1 ? 'order-1 md:order-2' : ''} flex flex-wrap items-center justify-center w-full mx-auto m-4`}
                                >
                                    {set.icons &&
                                        set.icons.map((icon, iconIndex) => (
                                            <Icon
                                                key={iconIndex}
                                                src={icon.src}
                                                label={icon.label}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-slate-700 text-lg m-6">
                            Complete with a variety of soft play equipment, this
                            package is perfect for children aged 0-5 years old.
                            It's a great choice for birthday parties, weddings,
                            christenings, and other special occasions.
                        </p>
                        {set.coverage && (
                            <p className="text-slate-700 text-lg m-6">
                                coverage: {set.coverage}
                            </p>
                        )}
                        <div className="py-6 text-slate-700 text-2xl m-6">
                            £{set.price} <br />
                            <span className="text-sm text-gray-400">
                                Note Delivery/Collection not included
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Sets;