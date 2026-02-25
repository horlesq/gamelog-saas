import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "What is GameLog?",
        answer: "GameLog is your ultimate personal gaming library manager. Keep track of what you're playing, what you've finished, and what's next in your backlog across all platforms in one beautifully designed space.",
    },
    {
        question: "Do I need a credit card to start?",
        answer: "Absolutely not! You can sign up and start logging your games immediately without entering any payment information. Our core features are 100% free.",
    },
    {
        question: "How hard is it to set up GameLog?",
        answer: "It takes less than a minute! Just create an account, click 'Add Game', and use our lightning-fast search to start building your library immediately. No complicated imports or manual syncing required.",
    },
    {
        question: "Can I cancel my account anytime?",
        answer: "Yes, you have full control over your data. You can export your game list or permanently delete your account and all associated data at any time with a single click from your settings dashboard.",
    },
    {
        question: "Where do you get your game data?",
        answer: "We are proudly powered by the RAWG Video Games Database API! This gives you instant access to search and pull rich metadata, cover art, and details for over 500,000+ games across every platform imaginable.",
    },
    {
        question: "Can I self-host GameLog on my own server?",
        answer: "Yes, absolutely! GameLog is designed to be highly self-hostable. We provide a fully containerized Docker image with a lightweight SQLite database out of the box, meaning you can spin up your own private instance in just a few minutes using our provided docker-compose files.",
    },
];

export default function FAQ() {
    return (
        <section
            id="faq"
            className="relative w-full py-24 md:py-32 overflow-hidden bg-background"
        >
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ── Header ── */}
                <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center mb-16">
                    <h2 className="font-orbitron font-bold text-3xl sm:text-5xl md:text-6xl/none bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Got questions?
                    </h2>
                    <p className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
                        Everything you need to know about GameLog.
                    </p>
                </div>

                {/* Accordion Component */}
                <div className="w-full">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>

            {/* Subtle background glow mimicking the other sections */}
            <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30">
                <div className="h-[40rem] w-[40rem] rounded-full bg-accent/10 blur-[120px]" />
            </div>
        </section>
    );
}
