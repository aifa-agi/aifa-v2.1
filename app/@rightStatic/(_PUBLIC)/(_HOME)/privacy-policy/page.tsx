//app/privacy-policy/page.tsx
import type { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

// SEO: use your existing constructMetadata helper
import { constructMetadata } from '@/lib/construct-metadata';
import { appConfig } from '@/config/app-config';

// Generates Metadata for this page using your shared helper
export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy',
  description:
    'Learn how we collect, use, and protect your personal data. This is an example Privacy Policy page for demonstration purposes.',
  // image omitted intentionally -> your constructMetadata uses default OG image fallback
  pathname: '/privacy-policy',
  contentType: 'documentation',
  // Optionally block indexing in example mode, remove when ready:
  // noIndex: true,
});

export default function PrivacyPolicyPage() {
  // Example placeholders you can bind from config or env
  const companyName = appConfig?.short_name ?? 'AIFA';
  const contactEmail = appConfig?.mailSupport ?? 'support@example.com';
  const companyUrl = appConfig?.url ?? 'https://example.com';
  const lastUpdated = '2025-10-01';

  return (
    <main className="container mx-auto px-4 py-10">
        <div className='h-20'/>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Last updated: {lastUpdated}
        </p>
      </header>

      {/* Overview */}
      <section className="mb-8">
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <p className="text-sm text-muted-foreground">
            This page explains how {companyName} (“we”, “us”, or “our”) collects, uses, and
            protects your personal information when you use our website and services.
            This is an example Privacy Policy for demonstration purposes only.
          </p>
          <p className="text-sm text-muted-foreground">
            By using our services at{' '}
            <Link href={companyUrl} className="underline underline-offset-4">
              {companyUrl}
            </Link>
            , you agree to this Privacy Policy.
          </p>
        </Card>
      </section>

      {/* Data We Collect */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>
              Account data: name, email address, authentication identifiers (via your chosen
              auth provider).
            </li>
            <li>
              Usage data: pages visited, interactions, performance metrics, device and browser
              metadata.
            </li>
            <li>
              Payment data: collected and processed by our payment processor (e.g., Stripe).
              We do not store full card details on our servers.
            </li>
            <li>
              Cookies and local storage: used for essential functionality, security,
              preferences, and analytics where applicable.
            </li>
          </ul>
        </Card>
      </section>

      {/* How We Use Data */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>To provide, maintain, and improve the services and user experience.</li>
            <li>To secure accounts, detect fraud, and enforce policies.</li>
            <li>To process payments and manage subscriptions (handled by third parties).</li>
            <li>To communicate updates, notifications, and support responses.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </Card>
      </section>

      {/* Cookies and Tracking */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Cookies and Tracking</h2>
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <p className="text-sm text-muted-foreground">
            We use cookies and similar technologies for essential app features (e.g., session),
            performance, and user preferences. Where required, optional analytics or marketing
            cookies are disabled until you grant consent.
          </p>
          <p className="text-sm text-muted-foreground">
            You can manage cookie preferences in your browser settings or via in-app controls if
            available.
          </p>
        </Card>
      </section>

      {/* Data Sharing */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Data Sharing</h2>
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <p className="text-sm text-muted-foreground">
            We may share minimal necessary data with trusted processors for hosting, analytics,
            customer support, and payment processing. We do not sell your personal data.
          </p>
        </Card>
      </section>

      {/* Data Retention and Security */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Data Retention & Security</h2>
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <p className="text-sm text-muted-foreground">
            We retain data only as long as necessary for the purposes outlined above or as
            required by law. We apply technical and organizational measures to protect your
            information; no method of transmission or storage is 100% secure.
          </p>
        </Card>
      </section>

      {/* Your Rights */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Access, update, or delete certain personal data.</li>
            <li>Object to or restrict certain processing.</li>
            <li>Data portability and withdrawal of consent where applicable.</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            To exercise your rights, contact us at{' '}
            <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">
              {contactEmail}
            </a>
            .
          </p>
        </Card>
      </section>

      {/* International Transfers */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">International Transfers</h2>
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <p className="text-sm text-muted-foreground">
            If data is transferred across borders, we use appropriate safeguards (e.g.,
            standard contractual clauses) to protect your information.
          </p>
        </Card>
      </section>

      {/* Changes */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Changes to This Policy</h2>
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <p className="text-sm text-muted-foreground">
            We may update this Privacy Policy from time to time. We will post the updated
            version here and adjust the “Last updated” date above.
          </p>
        </Card>
      </section>

      {/* Contact */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
        <Card className="rounded-lg border border-border bg-card px-6 py-5 space-y-3">
          <p className="text-sm text-muted-foreground">
            If you have questions about this Privacy Policy or our practices, contact us at{' '}
            <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">
              {contactEmail}
            </a>
            .
          </p>
        </Card>
      </section>
    </main>
  );
}
