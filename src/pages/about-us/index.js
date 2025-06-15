import Layout from "@/components/Layout.js";
import HeroSectionAbout from "@/components/HeroSectionAbout/index.jsx";
import VideoSection from "@/components/VideoSection/index.jsx";
import ImageGalleryAboutUs from "@/components/ImageGalleryAboutUs/index.jsx";
import CollaborationSection from "@/components/CollabrationSection/index.jsx";
import {
    features,
} from "../../../public/lib/aboutUsDatas.js";

const AboutUsPage = ({
                         features,
                         descriptionHero,
                         keywordsHero,
                         imageGallerySubTitle,
                         imageGalleryTitle,

                     }) => {
    return (
        <Layout title={"درباره میهن یدک"} content={"درباره ما"}>
            <HeroSectionAbout
                features={features}
                keywords={keywordsHero}
                description={descriptionHero}
            />
            <VideoSection/>
            <ImageGalleryAboutUs
                imageGalleryTitle={imageGalleryTitle}
                imageGallerySubTitle={imageGallerySubTitle}
            />
            <CollaborationSection

            />
        </Layout>
    );
};

export default AboutUsPage;

export async function getStaticProps() {
    return {
        props: {
            features,
            keywordsHero:
                "میهن یدک, قطعات موتورسیکلت, قطعات برقی موتور, اختراع, آموزش تعمیرکار موتور, برق موتور, انژکتور",
            descriptionHero:
                "شرکت میهن یدک گرمسار با بیش از ۲۵ سال سابقه در تولید قطعات برقی موتورسیکلت، دارای ۹ اختراع ثبت‌شده و پیشگام در آموزش تخصصی تعمیرکاران سراسر کشور.",
            imageGalleryTitle: "گالری همایش و فعالیت‌ها",
            imageGallerySubTitle:
                "تصاویری از نمایشگاه میهن یدک گرمسار در نمایشگاه های معتبر ایران ",
        },
    };
}
