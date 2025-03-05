
import { ClipboardCheck, Brain, Users, AreaChart, Clock, Heart } from "lucide-react";

const features = [
  {
    icon: <ClipboardCheck className="h-6 w-6 text-prestige-lightBlue" />,
    title: "Smart Documentation",
    description: "Automate clinical notes and reduce documentation time by up to 70%."
  },
  {
    icon: <Brain className="h-6 w-6 text-prestige-lightBlue" />,
    title: "Clinical Decision Support",
    description: "Evidence-based recommendations and treatment guidelines at your fingertips."
  },
  {
    icon: <Users className="h-6 w-6 text-prestige-lightBlue" />,
    title: "Patient Engagement",
    description: "Goal-oriented care plans that improve patient adherence and outcomes."
  },
  {
    icon: <AreaChart className="h-6 w-6 text-prestige-lightBlue" />,
    title: "Outcome Tracking",
    description: "Monitor patient progress and adjust treatment plans for better results."
  },
  {
    icon: <Clock className="h-6 w-6 text-prestige-lightBlue" />,
    title: "Time Efficiency",
    description: "Reduce administrative burden and spend more time with patients."
  },
  {
    icon: <Heart className="h-6 w-6 text-prestige-lightBlue" />,
    title: "Better Outcomes",
    description: "Improve clinical outcomes through goal-oriented patient care."
  }
];

export function Features() {
  return (
    <div className="py-12 px-4 md:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforming Patient Care</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience a revolutionary approach to healthcare with goal-oriented care and AI-powered support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-border/50 hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className="rounded-full bg-accent/80 w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
