import { useSyncExternalStore } from 'react';

const MOBILE_BREAKPOINT = 768;

const mql =
    typeof window !== 'undefined'
        ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
        : null;

function mediaQueryListener(callback: (event: MediaQueryListEvent) => void) {
    mql?.addEventListener('change', callback);

    return () => {
        mql?.removeEventListener('change', callback);
    };
}

function isSmallerThanBreakpoint() {
    return mql?.matches ?? false;
}

function getServerSnapshot() {
    return false;
}

export function useIsMobile() {
    return useSyncExternalStore(
        mediaQueryListener,
        isSmallerThanBreakpoint,
        getServerSnapshot,
    );
}
