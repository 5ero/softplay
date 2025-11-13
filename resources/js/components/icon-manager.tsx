import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import * as React from 'react';

interface Icon {
    src: string;
    label: string;
}

interface IconManagerProps {
    initialIcons?: Icon[];
    onChange: (icons: Icon[]) => void;
}

const availableIcons = [
    { value: '/storage/img/icons/rocker.png', label: 'Rocker' },
    { value: '/storage/img/icons/castle.png', label: 'Castle' },
    { value: '/storage/img/icons/pyramid.png', label: 'Pyramid' },
    { value: '/storage/img/icons/ballpit.png', label: 'Ball Pit' },
    { value: '/storage/img/icons/doublerocker.png', label: 'Double Rocker' },
    { value: '/storage/img/icons/maxistep.png', label: 'Maxi Step' },
    { value: '/storage/img/icons/slide.png', label: 'Slide' },
    { value: '/storage/img/icons/rideonanimal.png', label: 'Animal Hopper' },
    { value: '/storage/img/icons/bridge.png', label: 'Bridge' },
    { value: '/storage/img/icons/rideoncars.png', label: 'Ride On Car' },
    { value: '/storage/img/icons/picketfence.png', label: 'Picket Fence' },
    { value: '/storage/img/icons/blocks.png', label: 'Blocks' },
];

export default function IconManager({
    initialIcons = [],
    onChange,
}: IconManagerProps) {
    const [icons, setIcons] = React.useState<Icon[]>(initialIcons);

    const addIcon = () => {
        const newIcons = [...icons, { src: '', label: '' }];
        setIcons(newIcons);
        onChange(newIcons);
    };

    const removeIcon = (index: number) => {
        const newIcons = icons.filter((_, i) => i !== index);
        setIcons(newIcons);
        onChange(newIcons);
    };

    const updateIcon = (index: number, src: string) => {
        const selectedIcon = availableIcons.find((icon) => icon.value === src);
        if (selectedIcon) {
            const newIcons = [...icons];
            newIcons[index] = {
                src: selectedIcon.value,
                label: selectedIcon.label,
            };
            setIcons(newIcons);
            onChange(newIcons);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label>Icons (Equipment Items)</Label>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addIcon}
                >
                    Add Icon
                </Button>
            </div>

            {icons.map((icon, index) => (
                <div key={index} className="flex gap-2 items-center">
                    <div className="flex-1">
                        <Select
                            value={icon.src}
                            onValueChange={(value) => updateIcon(index, value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select an icon" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableIcons.map((availableIcon) => (
                                    <SelectItem
                                        key={availableIcon.value}
                                        value={availableIcon.value}
                                    >
                                        {availableIcon.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {icon.src && (
                        <div className="flex items-center gap-2">
                            <img
                                src={icon.src}
                                alt={icon.label}
                                className="h-8 w-8 object-contain"
                            />
                            <span className="text-sm text-muted-foreground">
                                {icon.label}
                            </span>
                        </div>
                    )}
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeIcon(index)}
                    >
                        Remove
                    </Button>
                </div>
            ))}

            {icons.length === 0 && (
                <p className="text-sm text-muted-foreground">
                    No icons added. Click "Add Icon" to add equipment items.
                </p>
            )}
        </div>
    );
}
