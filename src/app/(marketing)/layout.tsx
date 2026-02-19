/**
 * Marketing layout — no sidebar, no auth shell.
 * Wraps: landing page, pricing, blog, changelog.
 */
export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
