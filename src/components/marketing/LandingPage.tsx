import LandingNavbar from "@/components/marketing/LandingNavbar";
import Hero from "@/components/marketing/Hero";
import WhyChooseUs from "@/components/marketing/WhyChooseUs";
import Features from "@/components/marketing/Features";
import Pricing from "@/components/marketing/Pricing";
import FAQ from "@/components/marketing/FAQ";
import CTA from "@/components/marketing/CTA";
import LandingFooter from "@/components/marketing/LandingFooter";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <LandingNavbar />
            <Hero />
            <WhyChooseUs />
            <Features />
            <Pricing />
            <FAQ />
            <CTA />
            <LandingFooter />
        </div>
    );
}
