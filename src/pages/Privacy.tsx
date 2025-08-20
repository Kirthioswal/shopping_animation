import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const Privacy = () => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <div>
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

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Definitions</h2>
              <div className="space-y-3">
                  <p><strong>Consignee:</strong> The individual or entity financially responsible (the buyer) for receiving a shipment from a Consignor.</p>
                  <p><strong>Consignor:</strong> The individual or entity (usually the seller) who uses Jiffy's Services to deliver a shipment to a Consignee.</p>
                  <p><strong>Data Subject:</strong> Any individual who can be identified directly or indirectly by reference to identifiers such as a name, ID number, contact details, or location data.</p>
                  <p><strong>Third Party Vendors:</strong> Individuals or organizations contracted by Jiffy to provide services.</p>
                  <p className="mt-4">
                    We may update Jiffy's Privacy Policy from time to time. The latest version will always be posted on our website. 
                    We recommend reviewing this Policy periodically for updates.
                  </p>
                </div>
            </section>

            <section>
              <button
                onClick={() => toggleSection('data-collect')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">1. What Data Do We Collect?</h2>
                {expandedSections['data-collect'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['data-collect'] && (
                <div className="pl-4 pb-4">
              
              <h3 className="text-xl font-medium text-foreground mb-3">Personal Information</h3>
              <p className="mb-4">
                When you use our Services, we may ask you to provide certain personally identifiable information (PII), 
                which may include (but is not limited to):
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Address (Street, City, State, Postal Code, Country)</li>
                <li>KYC details/documents</li>
                <li>Location data</li>
              </ul>
              <p className="mb-4">
                If you share another person's personal information with us, you must be authorized to do so and ensure 
                they are aware of this Privacy Policy.
              </p>
              <p className="mb-6">
                You may choose not to provide requested information; however, this may limit or prevent access to certain Services.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3">Usage Data</h3>
              <p className="mb-4">We may collect details automatically when you visit our website/app, such as:</p>
              <ul className="list-disc list-inside mb-6 space-y-1">
                <li>IP address, browser type/version, device identifiers</li>
                <li>Pages visited, time and date of visit, time spent on pages</li>
                <li>Mobile device type, OS, and browser details</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3">Cookies Data</h3>
              <p className="mb-4">
                Our website and apps use cookies and similar tracking technologies to enhance your experience. 
                Cookies are small files stored on your device that help us analyze usage patterns and improve our Services.
              </p>
              <p className="mb-4">Types of cookies we use include:</p>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>Session Cookies (for service operations)</li>
                <li>Preference Cookies (to remember settings)</li>
                <li>Security Cookies (to protect your account)</li>
              </ul>
                <p>
                  You may disable cookies in your browser settings, but this could limit certain features.
                </p>
                </div>
              )}
            </section>

            <section>
              <button
                onClick={() => toggleSection('data-when')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">2. When and How We Collect Data</h2>
                {expandedSections['data-when'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['data-when'] && (
                <div className="pl-4 pb-4">
                  <p className="mb-4">We collect data in several ways, including:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Directly from you (website, app, calls, WhatsApp, email, chat)</li>
                    <li>When you create an account</li>
                    <li>When you send or receive shipments</li>
                    <li>When you track packages</li>
                    <li>When you verify your identity (e.g., KYC documents)</li>
                    <li>When you engage with customer support</li>
                    <li>From client businesses that partner with Jiffy</li>
                    <li>Through surveys, feedback forms, and social media</li>
                    <li>During delivery interactions</li>
                  </ul>
                </div>
              )}
            </section>

            <section>
              <button
                onClick={() => toggleSection('data-why')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">3. Why We Collect Your Data</h2>
                {expandedSections['data-why'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['data-why'] && (
                <div className="pl-4 pb-4">
                  <p className="mb-4">We collect and use data to:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Provide and improve our Services (delivery, warehousing, logistics, cross-border solutions, etc.)</li>
                    <li>Send tracking updates and notifications</li>
                    <li>Offer convenient and express delivery options</li>
                    <li>Communicate with you via phone, email, chat, or WhatsApp</li>
                    <li>Provide customer support and resolve issues</li>
                    <li>Verify identity using valid documents (Aadhaar, PAN, Driving License, etc.)</li>
                    <li>Conduct customer satisfaction surveys</li>
                    <li>Personalize your experience and recommend tailored services</li>
                    <li>Develop and improve products, features, and technology</li>
                    <li>Perform market analysis, financial analysis, and service optimization</li>
                    <li>Prevent fraud, secure networks, and manage business risks</li>
                    <li>Comply with legal and regulatory obligations (e.g., GST, customs)</li>
                  </ul>
                </div>
              )}
            </section>

            <section>
              <button
                onClick={() => toggleSection('data-share')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">4. Why and With Whom We Share Data</h2>
                {expandedSections['data-share'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['data-share'] && (
                <div className="pl-4 pb-4">
                  <p className="mb-4">We do not sell your data. However, we may share it in the following situations:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Jiffy Group Companies:</strong> For service delivery and process optimization.</li>
                    <li><strong>Regulatory/Government Authorities:</strong> To comply with legal requirements.</li>
                    <li><strong>Google Analytics:</strong> To monitor website usage and improve user experience (you may opt out via Google's browser add-on).</li>
                    <li><strong>Third Party Vendors/Consultants/Marketers:</strong> For services like delivery, payment processing, hosting, customer support, KYC validation, surveys, and marketing campaigns. These vendors are contractually bound to secure your data.</li>
                  </ul>
                  <p className="mt-4">
                    Your data may be transferred internationally, but only where adequate safeguards are in place.
                  </p>
                </div>
              )}
            </section>

            <section>
              <button
                onClick={() => toggleSection('data-retention')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">5. Data Retention</h2>
                {expandedSections['data-retention'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['data-retention'] && (
                <div className="pl-4 pb-4">
                  <p>
                    We retain personal information only as long as necessary for the purposes outlined above and for legal, 
                    accounting, or audit requirements. Non-personal/aggregated data may be retained indefinitely.
                  </p>
                </div>
              )}
            </section>

            <section>
              <button
                onClick={() => toggleSection('data-security')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">6. Data Security</h2>
                {expandedSections['data-security'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['data-security'] && (
                <div className="pl-4 pb-4">
                  <ul className="list-disc list-inside space-y-2">
                    <li>We employ strict administrative, technical, and physical safeguards to protect your data from unauthorized access, loss, or misuse.</li>
                    <li>We comply with ISO 27001 standards.</li>
                    <li>We regularly monitor application, infrastructure, and network security.</li>
                    <li>You are responsible for keeping your account credentials (password, OTP, etc.) secure.</li>
                    <li>For third-party linked services (e.g., payments, social media), please review their privacy policies separately, as Jiffy is not responsible for their practices.</li>
                  </ul>
                </div>
              )}
            </section>

            <section>
              <button
                onClick={() => toggleSection('children')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">7. Children</h2>
                {expandedSections['children'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['children'] && (
                <div className="pl-4 pb-4">
                  <p>
                    Our Services are not intended for individuals under 18. If you are under 18, you may only use our Services 
                    under parental or guardian supervision.
                  </p>
                </div>
              )}
            </section>

            <section>
              <button
                onClick={() => toggleSection('user-rights')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">8. Your Rights as a Data Subject</h2>
                {expandedSections['user-rights'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['user-rights'] && (
                <div className="pl-4 pb-4">
                  <p className="mb-4">Depending on your location and applicable laws, you may have the right to:</p>
                  <ul className="list-disc list-inside space-y-1 mb-4">
                    <li>Access the personal data we hold about you</li>
                    <li>Request correction or completion of inaccurate data</li>
                    <li>Request deletion of your personal data (subject to legal exceptions)</li>
                    <li>Restrict processing of your data</li>
                    <li>Report data breaches at hello@jiffy.world</li>
                    <li>Opt out of marketing communications anytime</li>
                  </ul>
                  <p>We will verify your identity before fulfilling any requests.</p>
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Privacy Policy</h2>
                  <p>
                    Jiffy may update this Privacy Policy periodically. Any changes will be posted on this page and become 
                    effective immediately upon posting.
                  </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Consent</h2>
                  <p>
                    By using our website, apps, or Services, you consent to this Privacy Policy and our Cookie Policy. 
                    You will also be asked to review and accept these policies when creating an account.
                  </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                  <p className="mb-4">
                    If you have any questions about this Privacy Policy or how your data is used, please contact our Privacy Officer at:
                  </p>
                  <p className="mb-4">
                    📧 <a href="mailto:hello@jiffy.world" className="text-primary hover:underline">Hello@jiffy.world</a>
                  </p>
                  <p className="text-sm">
                    (Please note: This email is strictly for privacy-related concerns. For order-related queries, please raise a 
                    ticket via our Customer Support Desk at Jiffy Support Page).
                  </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;