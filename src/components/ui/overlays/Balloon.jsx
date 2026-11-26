const Balloon = ({ visible, reload, placement = 'bottom', color = 'default', children, ...props }) => {
    if (!visible) return null;

    // Mapeamento de cores para classes Tailwind
    const colorClasses = {
        primary: {
            bg: 'bg-blue-500',
            text: 'text-white',
            border: 'blue-500',
            shadow: 'shadow-blue-500',
            dropShadow: 'drop-shadow-[0_2px_2px_rgb(59_130_246)]'
        },
        warning: {
            bg: 'bg-yellow-500',
            text: 'text-warning-content',
            border: 'yellow-500',
            shadow: 'shadow-yellow-500',
            dropShadow: 'drop-shadow-[0_2px_2px_rgb(234_179_8)]'
        },
        danger: {
            bg: 'bg-red-500',
            text: 'text-white',
            border: 'red-500',
            shadow: 'shadow-red-500',
            dropShadow: 'drop-shadow-[0_2px_2px_rgb(239_68_68)]'
        },
        success: {
            bg: 'bg-green-500',
            text: 'text-white',
            border: 'green-500',
            shadow: 'shadow-green-500',
            dropShadow: 'drop-shadow-[0_2px_2px_rgb(34_197_94)]'
        },
        dark: {
            bg: 'bg-gray-800',
            text: 'text-white',
            border: 'gray-800',
            shadow: 'shadow-gray-800',
            dropShadow: 'drop-shadow-[0_2px_2px_rgb(31_41_55)]'
        },
        default: {
            bg: 'bg-surface-elevated',
            text: 'text-content',
            border: 'border',
            shadow: 'shadow-blue-500',
            dropShadow: 'drop-shadow-[0_2px_2px_rgb(59_130_246)]'
        }
    };

    const currentColor = colorClasses[color] || colorClasses.default;

    // Classes para placement
    const placementClasses = {
        bottom: {
            balloon: 'top-full left-1/2 -translate-x-1/2 mt-3',
            caret: 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 border-t border-l'
        },
        top: {
            balloon: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
            caret: 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-b border-r'
        },
        left: {
            balloon: 'right-full top-1/2 -translate-y-1/2 mr-3',
            caret: 'left-full top-1/2 -translate-y-1/2 -translate-x-1/2 border-t border-r'
        },
        right: {
            balloon: 'left-full top-1/2 -translate-y-1/2 ml-3',
            caret: 'right-full top-1/2 -translate-y-1/2 translate-x-1/2 border-b border-l'
        }
    };

    const currentPlacement = placementClasses[placement] || placementClasses.bottom;

    return (
        <div role="status" className={`absolute z-40 ${currentPlacement.balloon} items-center justify-center flex flex-col rounded-lg border border-border ${currentColor.bg} ${currentColor.text} shadow-md ${currentColor.shadow} p-2`}>
            <span aria-hidden="true" className={`absolute h-2 w-2 rotate-45 bg-inherit border-border ${currentPlacement.caret}`} />
            <div className="rounded-lg text-nowrap text-sm text-white-shadow">
                {children}
            </div>
        </div>
    );
};
export default Balloon;
