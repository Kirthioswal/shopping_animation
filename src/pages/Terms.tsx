import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-foreground mb-8">Terms & Conditions of Use – Jiffy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms & Conditions of Use govern your use of Jiffy's platforms, including jiffy.com, 
              direct.jiffy.com, the Jiffy Direct Mobile App, and the Jiffy Partner Mobile App (together, 
              the "Applications"). The Applications are owned and operated by Jiffy Limited ("Jiffy," "we," or "us").
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;