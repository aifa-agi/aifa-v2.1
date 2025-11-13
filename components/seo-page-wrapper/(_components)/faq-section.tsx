//components/seo-page-wrapper/(_components)/faq-section.tsx
import React from 'react';
import { Card } from '@/components/ui/card';

/**
 * Type definition for FAQ item
 */
export type FAQItem = {
  question: string;
  answer: string;
};

/**
 * Props for FAQSection component
 */
interface FAQSectionProps {
  faqs: FAQItem[];
  show?: boolean;
  title?: string;
}

/**
 * FAQSection Component
 * 
 * Displays frequently asked questions in an accessible card layout.
 * Each FAQ item is rendered as a shadcn Card with question and answer.
 * Includes hover effects and proper semantic HTML structure.
 * 
 * @param faqs - Array of FAQ items with question and answer
 * @param show - Optional visibility flag, defaults to true if FAQs exist
 * @param title - Optional custom title, defaults to "Frequently Asked Questions"
 */
export function FAQSection({ 
  faqs, 
  show = true,
  title = "Frequently Asked Questions"
}: FAQSectionProps) {
  // Don't render if show is false or no FAQs
  if (!show || faqs.length === 0) {
    return null;
  }

  return (
    <section className="mb-12" aria-labelledby="faq-section">
      <h2 id="faq-section" className="text-2xl font-bold tracking-tight mb-6">
        {title}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold mb-3">
              {faq.question}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}