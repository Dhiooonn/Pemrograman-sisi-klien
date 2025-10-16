const baseSize = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-medium",
    h5: "text-lg font-mdium",
};

const Heading = ({
    as = "h1",
    children,
    className = "",
    align = "center",
    color = "text-blue-600",
    spacing = "mb-6",
    ...props
}) => {
    const Tag = as;
    const baseClass = baseSize[as] || baseSize.h1;

    return (
        <Tag className={`${baseClass} text-${align} ${color} ${spacing} ${className}`} {...props}>
            {children}
        </Tag>
    );
};

export default Heading;