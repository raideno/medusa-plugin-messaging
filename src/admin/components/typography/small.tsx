import { clx } from "@medusajs/ui";

type SmallTypographyProps = React.HTMLAttributes<HTMLDivElement> & {
    size?: "base"
    weight?: "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
}

const SmallTypography = ({
    size,
    weight,
    className,
    children,
    ...props
}: SmallTypographyProps) => {
    return (
        <div
            className={clx(
                // title qnd displqy. text-ui-fg-base
                "text-[14px] text-grey-40",

                weight === "thin" && "font-thin",
                weight === "extralight" && "font-extralight",
                weight === "light" && "font-light",
                weight === "normal" && "font-normal",
                weight === "medium" && "font-medium",
                weight === "semibold" && "font-semibold",
                weight === "bold" && "font-bold",
                weight === "extrabold" && "font-extrabold",
                weight === "black" && "font-black",

                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export default SmallTypography;