
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Activity, HeartPulse, CheckCheck } from "lucide-react";

const outcomeStats = [
  {
    title: "Patient Adherence",
    improvement: "+68%",
    description: "Improvement in treatment adherence with goal-oriented care",
    icon: <CheckCheck className="h-8 w-8 text-emerald-500" />
  },
  {
    title: "Clinical Outcomes",
    improvement: "+42%",
    description: "Better clinical outcomes compared to conventional methods",
    icon: <TrendingUp className="h-8 w-8 text-prestige-blue" />
  },
  {
    title: "Patient Engagement",
    improvement: "+75%",
    description: "Increase in patient satisfaction and engagement scores",
    icon: <Activity className="h-8 w-8 text-amber-500" />
  },
  {
    title: "Chronic Disease Management",
    improvement: "+53%",
    description: "Improvement in long-term disease control markers",
    icon: <HeartPulse className="h-8 w-8 text-rose-500" />
  }
];

export function OutcomeStats() {
  return (
    <div className="py-12 px-4 md:py-20 bg-prestige-blue-50/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Better Patient Outcomes</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Statistical evidence showing the impact of goal-oriented care vs. conventional methods
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {outcomeStats.map((stat, index) => (
            <Card 
              key={index} 
              className="glass-card border-opacity-30 h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-white/80 p-3 shadow-sm">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{stat.improvement}</h3>
                  <p className="font-semibold text-lg mb-2">{stat.title}</p>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-slate-200/50">
            <p className="text-sm text-muted-foreground">
              Based on clinical studies from 2020-2023 across 12 healthcare institutions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
