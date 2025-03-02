import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
  useEffect(() => {
    // Scroll to top immediately when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-transition-container"
    >
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-8">Terms and Conditions for Matchabel</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700">
            Welcome to Matchabel, your go-to platform for discovering and exploring a wide range of content. 
            By accessing or using this platform, you agree to comply with these Terms and Conditions. 
            If you do not agree, please do not use this platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. No User Profiles & Login</h2>
          <p className="text-gray-700">
            Matchabel does not require users to create profiles or log in, ensuring your privacy and 
            allowing for a seamless browsing experience without the need for personal information. 
            Your interaction with the platform remains anonymous.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Content Availability & Updates</h2>
          <p className="text-gray-700">
            The content on Matchabel, including but not limited to articles, images, and videos, 
            is subject to change and updates without prior notice. We strive to provide accurate 
            and up-to-date information but do not guarantee the availability or accuracy of any content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Content Ranking</h2>
          <p className="text-gray-700">
            Content on Matchabel is ranked using automated algorithms designed to show the most relevant 
            content first. However, we do not guarantee specific ranking positions for any content, 
            as rankings may change based on various factors.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. No Liability</h2>
          <p className="text-gray-700">
            While we aim to provide useful and accurate content, Matchabel is not responsible for any 
            consequences resulting from the use of this platform. We encourage users to verify information 
            independently before making decisions based on it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Third-Party Links</h2>
          <p className="text-gray-700">
            Matchabel may contain links to third-party websites. We are not responsible for the content, 
            privacy policies, or practices of any third-party sites. Please exercise caution when clicking 
            on external links, as we do not endorse or control the content on these websites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
          <p className="text-gray-700">
            All content and materials on Matchabel, including text, images, and videos, are the property 
            of their respective owners. Unauthorized reproduction, distribution, or use of this content 
            without permission is prohibited.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="text-gray-700">
            These Terms and Conditions may be updated from time to time. We will notify users of significant 
            changes to these terms through a notice on the platform. Continued use of the platform after 
            such changes indicates acceptance of the updated terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
          <p className="text-gray-700">
            For any questions regarding these Terms and Conditions, please contact us through the 
            provided channels on the platform.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default Terms;