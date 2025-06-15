import Layout from "@/components/Layout.js";
import HeroSectionContact from "@/components/HeroSectionContact/index.jsx";
import ContactForm from "@/components/ContactForm/index.jsx";
const ContactUsPage = () => {
  return (
    <>
      <Layout title={"تماس با  میهن یدک"} content={"تماس با  ما"}>
        <HeroSectionContact  />
        <ContactForm />
      </Layout>
    </>
  );
};

export default ContactUsPage;