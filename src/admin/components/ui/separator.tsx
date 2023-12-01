import { clx } from "@medusajs/ui";

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {};

const Separator = ({
    className,
    ...props
}: SeparatorProps) => {
    return (
        <div
            className={clx("rounded-md bg-grey-10 h-[1px]", className)}
            {...props}
        />
    );
};

export default Separator;