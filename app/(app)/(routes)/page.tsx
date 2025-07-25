import Carousel from "@/components/ui/carousel";
import { prisma } from "@/prisma";

const Home = async () => {

    const banners = await prisma.banner.findMany();
    return (
        <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
            <Carousel images={banners.map((obj) => obj.image)} />
        </div>
    );
};

export default Home;