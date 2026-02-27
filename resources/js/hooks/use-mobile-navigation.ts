import { useCallback } from 'react';

export function useMobileNavigation() {
    return useCallback(() => {
        if (typeof document === 'undefined') {
            return;
        }

        // Remove pointer-events style from body...
        document.body.style.removeProperty('pointer-events');
    }, []);
}
