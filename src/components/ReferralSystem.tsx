
import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getTotalReferrals, getWaitlistPosition, getCredits } from "@/lib/referral";

export function ReferralSystem({ referralCode }: { referralCode: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const referralCount = getTotalReferrals();
  const position = getWaitlistPosition();
  const credits = getCredits();
  
  const referralUrl = `${window.location.origin}/?ref=${referralCode}`;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setIsCopied(true);
      toast.success("Referral link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy link. Try again.");
    }
  };
  
  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Dr House AI by Prestige Health Waitlist",
          text: "I just joined the waitlist for Dr House AI, a physician copilot at the point of care. Join me!",
          url: referralUrl,
        });
        toast.success("Thanks for sharing!");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <Card className="glass-card border-opacity-40 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Your Waitlist Status</CardTitle>
          <CardDescription>
            Share your link to move up the waitlist
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Current Position</span>
              <span className="text-2xl font-bold">{position ? `#${position}` : "Processing..."}</span>
            </div>
            <div className="h-10 w-[1px] bg-border"></div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Credits Earned</span>
              <span className="text-2xl font-bold">${credits}</span>
            </div>
            <div className="h-10 w-[1px] bg-border"></div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Referrals</span>
              <span className="text-2xl font-bold">{referralCount}</span>
            </div>
          </div>
          
          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-2">Your personal referral link:</p>
            <div className="flex space-x-2">
              <Input 
                value={referralUrl} 
                readOnly 
                className="bg-muted/50 h-11 text-sm"
              />
              <Button
                size="icon"
                variant="outline"
                className="h-11 w-11 flex-shrink-0"
                onClick={copyToClipboard}
              >
                {isCopied ? <Check size={18} /> : <Copy size={18} />}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button 
            onClick={shareReferral} 
            className="w-full bg-gradient-to-r from-prestige-blue to-prestige-lightBlue hover:opacity-90 transition-all hover:shadow-lg"
          >
            <Share2 size={18} className="mr-2" />
            Share and Move Up
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-6 text-center px-4">
        <p className="text-sm text-muted-foreground">
          For each referral, you'll move 1 position up the waitlist and earn $1 in credits when Dr House AI launches.
        </p>
      </div>
    </div>
  );
}
