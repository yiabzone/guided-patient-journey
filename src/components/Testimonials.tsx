
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Dr House AI has transformed my practice. I'm spending less time on documentation and more time building relationships with my patients.",
    name: "Dr. Sarah Johnson",
    role: "Family Medicine",
    initials: "SJ"
  },
  {
    quote: "The goal-oriented care approach has significantly improved patient adherence to treatment plans in my cardiology practice.",
    name: "Dr. Michael Chen",
    role: "Cardiology",
    initials: "MC"
  },
  {
    quote: "Having evidence-based recommendations at my fingertips helps me make better decisions faster. My patients are getting better outcomes.",
    name: "Dr. Aisha Patel",
    role: "Internal Medicine",
    initials: "AP"
  }
];

export function Testimonials() {
  return (
    <div className="py-12 px-4 md:py-20 bg-prestige-blue-50/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Physicians Are Saying</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Early adopters are experiencing tremendous benefits in their practice
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card border-opacity-30 h-full flex flex-col">
              <CardContent className="pt-6 flex-grow">
                <p className="italic text-lg mb-4">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="border-t border-border/50 pt-4 pb-6">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-prestige-blue text-white">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
