import { clx } from "@medusajs/ui";

type DisplayTypographyProps = React.HTMLAttributes<HTMLDivElement> & {
    size?: "base"
    weight?: "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
}

const DisplayTypography = ({
    size,
    weight,
    className,
    children,
    ...props
}: DisplayTypographyProps) => {
    return (
        <div
            className={clx(
                "text-[32px] text-ui-fg-base",

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

export default DisplayTypography;