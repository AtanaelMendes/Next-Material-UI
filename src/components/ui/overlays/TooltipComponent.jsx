export const TooltipComponent = ({
    children,
    content,
    side = "top",
}) => {
    const sideClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    const arrowClasses = {
        top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-b border-r",
        bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 border-t border-l",
        left: "left-full top-1/2 -translate-y-1/2 -translate-x-1/2 border-t border-r",
        right: "right-full top-1/2 -translate-y-1/2 translate-x-1/2 border-b border-l",
    };

    return (
        <div className="relative inline-block group/tooltip">
            {children}
            <div
                role="tooltip"
                className={`absolute ${sideClasses[side] || sideClasses.top} hidden group-hover/tooltip:block group-focus-within/tooltip:block z-50 bg-surface-elevated text-content text-xs rounded border border-border px-3 py-1.5 whitespace-nowrap shadow-lg pointer-events-none`}
            >
                {content}
                <div aria-hidden="true" className={`absolute w-2 h-2 rotate-45 bg-surface-elevated border-border ${arrowClasses[side] || arrowClasses.top}`} />
            </div>
        </div>
    );
};
