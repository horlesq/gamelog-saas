import LandingNavbar from "@/components/marketing/LandingNavbar";
import LandingFooter from "@/components/marketing/LandingFooter";

export const metadata = {
    title: "Privacy Policy | GameLog",
    description: "Learn how GameLog handles and protects your personal data.",
};

const EFFECTIVE_DATE = "February 25, 2026";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <LandingNavbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pt-36">
                {/* Header */}
                <div className="mb-12">
                    <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
                        Legal
                    </p>
                    <h1 className="font-orbitron font-bold text-4xl sm:text-5xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Effective date: {EFFECTIVE_DATE}
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-border/40 mb-10" />

                {/* Content */}
                <div className="prose prose-invert prose-sm sm:prose-base max-w-none space-y-8">
                    <Section title="1. Introduction">
                        <p>
                            Welcome to GameLog (&ldquo;we&rdquo;,
                            &ldquo;our&rdquo;, &ldquo;us&rdquo;). We respect
                            your privacy and are committed to protecting your
                            personal data. This Privacy Policy explains how we
                            collect, use, and safeguard information about you
                            when you use our service at{" "}
                            <a
                                href="https://gamelog.app"
                                className="text-accent hover:underline"
                            >
                                gamelog.app
                            </a>{" "}
                            (the &ldquo;Service&rdquo;).
                        </p>
                        <p>
                            Please read this policy carefully. By using the
                            Service, you agree to the terms of this Privacy
                            Policy. If you do not agree, please discontinue use
                            of the Service.
                        </p>
                    </Section>

                    <Section title="2. Information We Collect">
                        <p>
                            We collect the following categories of information:
                        </p>
                        <ul>
                            <li>
                                <strong>Account data:</strong> Your email
                                address and password (stored as a secure hash)
                                when you register an account.
                            </li>
                            <li>
                                <strong>Usage data:</strong> Information about
                                the games you log, their statuses, ratings, and
                                notes that you voluntarily provide within the
                                Service.
                            </li>
                            <li>
                                <strong>Technical data:</strong> IP address,
                                browser type, and operating system may be
                                captured automatically in server logs for
                                security and diagnostic purposes.
                            </li>
                        </ul>
                        <p>
                            We do <strong>not</strong> collect payment
                            information directly. Any future billing will be
                            handled by a third-party payment processor subject
                            to their own privacy policies.
                        </p>
                    </Section>

                    <Section title="3. How We Use Your Information">
                        <p>
                            We use your personal data for the following
                            purposes:
                        </p>
                        <ul>
                            <li>
                                To provide, maintain, and improve the Service.
                            </li>
                            <li>
                                To authenticate your account and keep it secure.
                            </li>
                            <li>
                                To send transactional emails (e.g., password
                                reset links).
                            </li>
                            <li>
                                To respond to your support requests and
                                communications.
                            </li>
                            <li>To comply with legal obligations.</li>
                        </ul>
                        <p>
                            We do <strong>not</strong> sell, rent, or share your
                            personal data with third parties for marketing
                            purposes.
                        </p>
                    </Section>

                    <Section title="4. Data Storage & Security">
                        <p>
                            Your data is stored in a SQLite database. If you are
                            using the hosted version of GameLog, your data is
                            stored on our servers with industry-standard
                            security measures. If you self-host GameLog, you are
                            responsible for the security of your own
                            infrastructure.
                        </p>
                        <p>
                            We use secure, hashed storage for all passwords and
                            issue JSON Web Tokens (JWTs) for session management.
                            JWT secrets are auto-generated and are unique to
                            each instance.
                        </p>
                        <p>
                            Despite our efforts, no data transmission over the
                            internet or method of electronic storage is 100%
                            secure. We cannot guarantee absolute security.
                        </p>
                    </Section>

                    <Section title="5. Data Retention">
                        <p>
                            We retain your personal data for as long as your
                            account is active. If you delete your account, we
                            will permanently delete all associated data within
                            30 days, except where we are legally required to
                            retain it for longer.
                        </p>
                    </Section>

                    <Section title="6. Third-Party Services">
                        <p>
                            GameLog uses the{" "}
                            <strong>RAWG Video Games Database API</strong> to
                            power its game search functionality. When you search
                            for a game, your query may be sent to RAWG&apos;s
                            servers. We encourage you to review{" "}
                            <a
                                href="https://rawg.io/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline"
                            >
                                RAWG&apos;s Privacy Policy
                            </a>
                            .
                        </p>
                    </Section>

                    <Section title="7. Your Rights">
                        <p>
                            Depending on your location, you may have the
                            following rights regarding your personal data:
                        </p>
                        <ul>
                            <li>
                                <strong>Right to access:</strong> Request a copy
                                of the data we hold about you.
                            </li>
                            <li>
                                <strong>Right to rectification:</strong> Request
                                that we correct inaccurate data.
                            </li>
                            <li>
                                <strong>Right to erasure:</strong> Request that
                                we delete your data (exercisable by deleting
                                your account).
                            </li>
                            <li>
                                <strong>Right to data portability:</strong>{" "}
                                Request your data in a portable format (e.g.,
                                CSV export if available).
                            </li>
                        </ul>
                        <p>
                            To exercise any of these rights, please contact us
                            at the email below.
                        </p>
                    </Section>

                    <Section title="8. Cookies">
                        <p>
                            GameLog uses essential cookies and session tokens
                            strictly to authenticate your session. We do not use
                            tracking, analytics, or advertising cookies.
                        </p>
                    </Section>

                    <Section title="9. Children's Privacy">
                        <p>
                            The Service is not directed at children under the
                            age of 13. We do not knowingly collect personal data
                            from children. If you believe we have collected data
                            from a child, please contact us immediately and we
                            will delete it.
                        </p>
                    </Section>

                    <Section title="10. Changes to This Policy">
                        <p>
                            We may update this Privacy Policy from time to time.
                            We will notify you of any significant changes by
                            posting the new policy on this page with an updated
                            effective date. Your continued use of the Service
                            after the change constitutes your acceptance of the
                            new policy.
                        </p>
                    </Section>

                    <Section title="11. Contact Us">
                        <p>
                            If you have any questions, concerns, or requests
                            regarding this Privacy Policy, please contact us via
                            GitHub Issues at{" "}
                            <a
                                href="https://github.com/horlesq/gamelog/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline"
                            >
                                github.com/horlesq/gamelog/issues
                            </a>
                            .
                        </p>
                    </Section>
                </div>
            </main>

            <LandingFooter />
        </div>
    );
}

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="rounded-xl border border-border/30 bg-card/20 p-6 sm:p-8">
            <h2 className="font-orbitron font-bold text-lg sm:text-xl text-foreground mb-4">
                {title}
            </h2>
            <div className="text-muted-foreground leading-relaxed space-y-3 text-sm sm:text-base">
                {children}
            </div>
        </section>
    );
}
