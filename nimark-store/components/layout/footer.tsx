import Container from '@/components/ui/container';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-10">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Nimark Store. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
