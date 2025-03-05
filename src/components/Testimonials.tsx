
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
        
        <div className="max-w-xl mx-auto">
          <Card className="glass-card border-opacity-30 h-full flex flex-col">
            <CardContent className="pt-6 flex-grow">
              <p className="italic text-lg mb-4">
                "Dr House AI has transformed my practice. Now I can offer goal-oriented care that keeps 
                my patients engaged and improves clinical outcomes. The AI suggestions are incredibly 
                helpful during consultations, giving me more time to focus on patient relationships."
              </p>
            </CardContent>
            <CardFooter className="border-t border-border/50 pt-4 pb-6">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback className="bg-prestige-blue text-white">
                    OA
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Dr. Oluwaseun Adeyemi</p>
                  <p className="text-sm text-muted-foreground">Cardiology, Lagos University Teaching Hospital</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
