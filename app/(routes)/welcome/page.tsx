import { FC } from "react";
import { Container } from "@/components/Container";
import DocumentDropzone from "@/components/welcome/DocumentDropzone";

interface WelcomePageProps {}

const WelcomePage: FC<WelcomePageProps> = ({}) => {
  return (
    <Container className='max-w-5xl'>
      <h1 className='mx-auto mt-16 mb-6 bg-gradient-to-r bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-center font-display text-4xl font-bold !leading-tight text-transparent md:max-w-2xl md:max-w-3xl md:text-5xl lg:max-w-4xl lg:text-6xl'>
        Upload your documents
      </h1>
      <p className='text-2xl font-medium max-w-3xl leading-relaxed text-center mx-auto text-foreground/60'>
        Upload your notes, textbooks, and other study materials. Chat with your
        documents and find friends to study with.
      </p>
      <DocumentDropzone />
    </Container>
  );
};

export default WelcomePage;
