/**
 * SaaS layout — wraps billing, org management, and upgrade flows.
 * Add Stripe session guards / org context providers here later.
 */
export default function SaasLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
