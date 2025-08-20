import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-6">
              We at Jiffy Limited and our affiliates (hereinafter referred to as "Jiffy", "we", "us" or "our") 
              treat customer trust as our highest priority and are committed to protecting your personal information. 
              We want you to feel confident and secure while using our products, services, and solutions ("Services").
            </p>
            
            <p className="mb-6">
              This Privacy Policy explains how we collect, use, transfer, and store your personal data when you 
              use our Services, and also describes your rights regarding such data.
            </p>
            
            <p className="mb-6">
              Please read this Privacy Policy carefully before accessing or availing our Services.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;