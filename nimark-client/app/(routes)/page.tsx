import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboard";
// import getProducts from "@/actions/get-products";
// import ProductList from "@/components/product-list";

export const revalidate = 0;

const HomePage = async () => {
    const billboard = await getBillboard('fc5bcfa7-9a90-4e8a-b7d5-406890354b9a');
    // const products = await getProducts({ isFeatured: true })
    return (
        <Container>
            <div className="pb-10 space-y-10">
                <Billboard data={billboard} />
                <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
                    {/* <ProductList title="Featured Products" items={products} /> */}
                    Product List
                </div>
            </div>
        </Container>
    )
}

export default HomePage;