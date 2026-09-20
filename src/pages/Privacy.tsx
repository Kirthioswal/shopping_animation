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
          <h1 className="text-4xl font-bold text-foreground mb-8">Data Privacy & Security</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <div>
              <p className="mb-6">
                At Jiffy World (operated by Reset Supply Chain Private Limited), we value your trust and are committed to safeguarding your privacy. This Privacy Policy explains how we collect, use, store, and protect your information when you use our services, including our Shopify app and related platforms.
              </p>
              
              <p className="mb-6">
                We are committed to protecting your Personally Identifiable Information (PII) and sensitive business data. All information is collected, stored, and used as described in our Privacy Policy. By using our services, you consent to such processing.
              </p>
            </div>

            <section>
              <button
                onClick={() => toggleSection('information-collect')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">Information We Collect</h2>
                {expandedSections['information-collect'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['information-collect'] && (
                <div className="pl-4 pb-4">
                  <p className="mb-4">When you use our services, we may collect the following types of information:</p>
                  
                  <h3 className="text-xl font-medium text-foreground mb-3">Account Information</h3>
                  <p className="mb-4">Name, email address, phone number, company details, and login credentials.</p>
                  
                  <h3 className="text-xl font-medium text-foreground mb-3">Shopify Store Data</h3>
                  <p className="mb-4">Order details, product information, customer shipping addresses, and related transaction data necessary to process and fulfill orders.</p>
                  
                  <h3 className="text-xl font-medium text-foreground mb-3">Courier & Logistics Data</h3>
                  <p className="mb-4">Courier partner details, AWB numbers, tracking status, and delivery information.</p>
                  
                  <h3 className="text-xl font-medium text-foreground mb-3">Billing Information (if applicable in the future)</h3>
                  <p className="mb-4">Payment method details processed through secure third-party providers.</p>
                  
                  <h3 className="text-xl font-medium text-foreground mb-3">Technical Information</h3>
                  <p className="mb-4">IP address, device details, browser type, operating system, and app usage analytics.</p>
                  
                  <h3 className="text-xl font-medium text-foreground mb-3">PII and Sensitive Information</h3>
                  <p>We recognize the sensitivity of personally identifiable information (PII) and company data shared with us. We collect only what is necessary to provide our services and are committed to protecting it at all times.</p>
                </div>
              )}
            </section>

            <section>
              <button
                onClick={() => toggleSection('how-we-use')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">How We Use Your Information</h2>
                {expandedSections['how-we-use'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['how-we-use'] && (
                <div className="pl-4 pb-4">
                  <p className="mb-4">We use the collected information to:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Sync orders and process shipments from your Shopify store.</li>
                    <li>Assign couriers, generate AWB numbers, and update tracking details.</li>
                    <li>Provide customer support and resolve issues.</li>
                    <li>Improve our services, features, and user experience.</li>
                    <li>Comply with legal, regulatory, or contractual obligations.</li>
                  </ul>
                  <p className="mt-4 font-medium">We do not sell, rent, or trade your personal or business information to third parties.</p>
                </div>
              )}
            </section>

            <section>
              <button
                onClick={() => toggleSection('sharing-information')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">Sharing of Information</h2>
                {expandedSections['sharing-information'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['sharing-information'] && (
                <div className="pl-4 pb-4">
                  <p className="mb-4">We may share your information only in the following cases:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>With Courier Partners:</strong> To process shipments, assign orders, and update tracking information.</li>
                    <li><strong>With Service Providers:</strong> Trusted third-party vendors who assist in hosting, analytics, or customer support, bound by confidentiality agreements.</li>
                    <li><strong>For Legal Reasons:</strong> To comply with applicable laws, regulations, or government requests.</li>
                  </ul>
                </div>
              )}
            </section>

            <section>
              <button
                onClick={() => toggleSection('data-security')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">Data Security</h2>
                {expandedSections['data-security'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['data-security'] && (
                <div className="pl-4 pb-4">
                  <p className="mb-4">We implement industry-standard security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Encrypted communication (HTTPS/SSL).</li>
                    <li>Secure access controls and authentication.</li>
                    <li>Regular monitoring and auditing of systems.</li>
                  </ul>
                  <p className="mt-4">Your PII and sensitive company data are handled with the highest level of confidentiality and care.</p>
                </div>
              )}
            </section>

            <section>
              <button
                onClick={() => toggleSection('data-retention')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">Data Retention</h2>
                {expandedSections['data-retention'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['data-retention'] && (
                <div className="pl-4 pb-4">
                  <p>
                    We retain your information only as long as necessary to provide our services and fulfill legal obligations. You may request deletion of your data by contacting us at support@jiffy.world.
                  </p>
                </div>
              )}
            </section>

            <section>
              <button
                onClick={() => toggleSection('your-rights')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">Your Rights</h2>
                {expandedSections['your-rights'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['your-rights'] && (
                <div className="pl-4 pb-4">
                  <p className="mb-4">As a user, you have the right to:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Access and review your personal data.</li>
                    <li>Request correction or deletion of information.</li>
                    <li>Restrict or object to certain processing activities.</li>
                    <li>Withdraw consent at any time, subject to legal obligations.</li>
                  </ul>
                </div>
              )}
            </section>

            <section>
              <button
                onClick={() => toggleSection('children-privacy')}
                className="flex items-center justify-between w-full text-left p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors mb-4"
              >
                <h2 className="text-2xl font-semibold text-foreground">Children's Privacy</h2>
                {expandedSections['children-privacy'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              {expandedSections['children-privacy'] && (
                <div className="pl-4 pb-4">
                  <p>
                    Our services are intended for businesses and not directed toward children under 18. We do not knowingly collect information from minors.
                  </p>
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to this Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any significant changes will be notified via our website or email before they take effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:
              </p>
              <p className="mb-2">
                <strong>Jiffy World</strong> (operated by Reset Supply Chain Private Limited)
              </p>
              <p className="mb-2">
                📧 <a href="mailto:support@jiffy.world" className="text-primary hover:underline">support@jiffy.world</a>
              </p>
              <p>
                🌐 <a href="https://jiffy.world" className="text-primary hover:underline">https://jiffy.world</a>
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