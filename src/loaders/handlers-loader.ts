import {
    ProductService,
    ConfigModule,
    MedusaContainer,
} from "@medusajs/medusa"

export default async (
    container: MedusaContainer,
    config: ConfigModule
): Promise<void> => {
    console.info("Starting loader...")

    console.info("Ending loader...")
}