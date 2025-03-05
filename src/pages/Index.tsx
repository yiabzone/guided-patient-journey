
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ReferralSystem } from "@/components/ReferralSystem";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { 
  getReferralCode, 
  getReferrerFromUrl, 
  trackReferral,
  getWaitlistPosition
} from "@/lib/referral";
import { trackReferralClick } from "@/lib/api";

const Index = () => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [hasJoined, setHasJoined] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Check if user has already joined the waitlist
    const savedReferralCode = getReferralCode();
    const position = getWaitlistPosition();
    
    if (savedReferralCode) {
      setReferralCode(savedReferralCode);
      setHasJoined(true);
    }
    
    // Check if user came from a referral link
    const referrer = getReferrerFromUrl();
    if (referrer) {
      // Track the referral click
      trackReferralClick(referrer)
        .then(success => {
          if (success) {
            // Add this referrer to the list of tracked referrals
            trackReferral(referrer);
          }
        })
        .catch(err => console.error("Error tracking referral:", err));
    }
  }, []);

  const handleFormSuccess = (position: number, code: string) => {
    setReferralCode(code);
    setHasJoined(true);
  };

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-16 md:pt-24 pb-12 md:pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 -z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(51,130,255,0.1),transparent)] -z-10"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-prestige-blue/10 text-prestige-blue animate-fade-in">
                Now accepting early access
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{animationDelay: "100ms"}}>
                <span className="text-gradient">Dr House AI</span>
                <span> by Prestige Health</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{animationDelay: "200ms"}}>
                Your AI physician copilot delivering goal-oriented care for better patient outcomes.
              </p>
              
              {!hasJoined && !showForm && (
                <Button 
                  onClick={toggleForm} 
                  size="lg" 
                  className="rounded-full h-14 px-8 text-lg font-medium transition-all bg-gradient-to-r from-prestige-blue to-prestige-blue-700 hover:shadow-lg hover:scale-[1.02] animate-fade-in"
                  style={{animationDelay: "300ms"}}
                >
                  Join the Waitlist
                </Button>
              )}
            </div>
            
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end animate-fade-in" style={{animationDelay: "400ms"}}>
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200/50 p-6 max-w-md w-full">
                <div className="flex justify-center mb-6">
                  <img 
                    src="/lovable-uploads/bb683ec7-f889-4d19-9c22-b9382bba5d7c.png" 
                    alt="Dr House AI by Prestige Health Logo" 
                    className="h-16 md:h-20"
                  />
                </div>
                
                {hasJoined && referralCode ? (
                  <ReferralSystem referralCode={referralCode} />
                ) : showForm ? (
                  <WaitlistForm onSuccess={handleFormSuccess} />
                ) : (
                  <div className="text-center p-4">
                    <h2 className="text-xl font-bold mb-4">Join the Waitlist</h2>
                    <p className="text-muted-foreground mb-6">Get early access to Dr House AI and start improving patient outcomes.</p>
                    <Button 
                      onClick={toggleForm}
                      className="w-full h-12 text-base bg-prestige-blue hover:bg-prestige-blue-700"
                    >
                      Sign Up Now
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <Features />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Final CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Practice?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our waitlist today and be among the first to experience the future of goal-oriented patient care.
          </p>
          
          {!hasJoined ? (
            <Button 
              onClick={toggleForm}
              size="lg" 
              className="rounded-full h-14 px-8 text-lg font-medium transition-all bg-gradient-to-r from-prestige-blue to-prestige-blue-700 hover:shadow-lg hover:scale-[1.02]"
            >
              Join the Waitlist Now
            </Button>
          ) : (
            <p className="text-lg font-medium text-prestige-blue">
              Thanks for joining! Share your referral link to move up the waitlist.
            </p>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/bb683ec7-f889-4d19-9c22-b9382bba5d7c.png" 
                alt="Dr House AI by Prestige Health Logo" 
                className="h-10"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Prestige Health. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
