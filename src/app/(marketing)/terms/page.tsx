import LandingNavbar from "@/components/marketing/LandingNavbar";
import LandingFooter from "@/components/marketing/LandingFooter";

export const metadata = {
    title: "Terms of Service | GameLog",
    description: "Read the GameLog terms and conditions for using our service.",
};

const EFFECTIVE_DATE = "February 25, 2026";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <LandingNavbar />

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24">
                {/* Header */}
                <div className="mb-12">
                    <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">
                        Legal
                    </p>
                    <h1 className="font-orbitron font-bold text-4xl sm:text-5xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Effective date: {EFFECTIVE_DATE}
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-border/40 mb-10" />

                {/* Content */}
                <div className="prose prose-invert prose-sm sm:prose-base max-w-none space-y-8">
                    <Section title="1. Acceptance of Terms">
                        <p>
                            By accessing or using GameLog (the
                            &ldquo;Service&rdquo;), you agree to be bound by
                            these Terms of Service (&ldquo;Terms&rdquo;). If you
                            do not agree to all of these Terms, do not use the
                            Service. These Terms apply to all visitors, users,
                            and others who access or use the Service.
                        </p>
                    </Section>

                    <Section title="2. Description of Service">
                        <p>
                            GameLog is a personal video game library tracking
                            application. It allows registered users to log,
                            organize, rate, and manage their gaming backlogs.
                            The Service is powered by the RAWG Video Games
                            Database for game metadata.
                        </p>
                        <p>
                            GameLog is provided as open-source software under
                            the MIT License. You may also opt to self-host your
                            own instance, in which case these Terms apply only
                            to your use of the hosted version.
                        </p>
                    </Section>

                    <Section title="3. User Accounts">
                        <p>
                            You must create an account to use the core features
                            of the Service. You agree to:
                        </p>
                        <ul>
                            <li>
                                Provide accurate and truthful information when
                                registering.
                            </li>
                            <li>
                                Keep your password confidential and notify us
                                immediately of any unauthorized access.
                            </li>
                            <li>
                                Be solely responsible for all activity that
                                occurs under your account.
                            </li>
                        </ul>
                        <p>
                            We reserve the right to suspend or terminate
                            accounts that violate these Terms.
                        </p>
                    </Section>

                    <Section title="4. Acceptable Use">
                        <p>You agree not to use the Service to:</p>
                        <ul>
                            <li>
                                Violate any applicable local, national, or
                                international law or regulation.
                            </li>
                            <li>
                                Transmit any unsolicited or unauthorized
                                advertising or promotional material.
                            </li>
                            <li>
                                Attempt to gain unauthorized access to any part
                                of the Service or its related systems.
                            </li>
                            <li>
                                Interfere with or disrupt the integrity or
                                performance of the Service.
                            </li>
                            <li>
                                Collect or scrape user data without our prior
                                written consent.
                            </li>
                            <li>
                                Impersonate any person or entity, or falsely
                                state your affiliation with any person or
                                entity.
                            </li>
                        </ul>
                    </Section>

                    <Section title="5. Intellectual Property">
                        <p>
                            The GameLog source code is open-source and available
                            under the <strong>MIT License</strong>. You are free
                            to use, copy, modify, and distribute the code in
                            accordance with that license.
                        </p>
                        <p>
                            Game metadata, cover art, and other game data
                            displayed within the Service is sourced from the
                            RAWG API and remains the intellectual property of
                            its respective owners. GameLog does not claim
                            ownership of any third-party game content.
                        </p>
                        <p>
                            The GameLog name, logo, and brand assets are the
                            property of GameLog and may not be used without our
                            prior written permission.
                        </p>
                    </Section>

                    <Section title="6. User Content">
                        <p>
                            You retain ownership of all content you submit to
                            the Service (e.g., game notes, ratings, custom
                            lists). By submitting content, you grant us a
                            limited, non-exclusive, royalty-free license to
                            store and display it solely for the purpose of
                            providing the Service to you.
                        </p>
                        <p>
                            You are solely responsible for the accuracy and
                            legality of any content you post. We reserve the
                            right to remove content that violates these Terms.
                        </p>
                    </Section>

                    <Section title="7. Disclaimer of Warranties">
                        <p>
                            The Service is provided on an &ldquo;AS IS&rdquo;
                            and &ldquo;AS AVAILABLE&rdquo; basis without any
                            warranties of any kind, either express or implied,
                            including but not limited to warranties of
                            merchantability, fitness for a particular purpose,
                            or non-infringement.
                        </p>
                        <p>
                            We do not warrant that the Service will be
                            uninterrupted, secure, or free from errors, viruses,
                            or other harmful components.
                        </p>
                    </Section>

                    <Section title="8. Limitation of Liability">
                        <p>
                            To the fullest extent permitted by applicable law,
                            GameLog and its contributors shall not be liable for
                            any indirect, incidental, special, consequential, or
                            punitive damages, including but not limited to loss
                            of data, loss of profits, or loss of goodwill,
                            arising out of or in connection with your use of the
                            Service.
                        </p>
                    </Section>

                    <Section title="9. Termination">
                        <p>
                            You may terminate your account at any time by
                            deleting it from the settings dashboard. We reserve
                            the right to suspend or terminate your access to the
                            Service at our sole discretion, without notice, for
                            conduct that we believe violates these Terms or is
                            harmful to other users, us, or third parties.
                        </p>
                        <p>
                            Upon termination, your data will be deleted in
                            accordance with our{" "}
                            <a
                                href="/privacy"
                                className="text-accent hover:underline"
                            >
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </Section>

                    <Section title="10. Governing Law">
                        <p>
                            These Terms shall be governed by and construed in
                            accordance with applicable laws. Any disputes
                            arising under or in connection with these Terms
                            shall be resolved through good-faith negotiation
                            before any formal legal proceedings.
                        </p>
                    </Section>

                    <Section title="11. Changes to Terms">
                        <p>
                            We reserve the right to modify these Terms at any
                            time. We will notify users of significant changes by
                            updating the effective date at the top of this page.
                            Continued use of the Service after changes are
                            posted constitutes your acceptance of the new Terms.
                        </p>
                    </Section>

                    <Section title="12. Contact">
                        <p>
                            If you have any questions about these Terms, please
                            open an issue at{" "}
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
