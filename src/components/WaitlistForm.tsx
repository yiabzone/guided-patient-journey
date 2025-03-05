
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { generateReferralCode, saveReferralCode, saveWaitlistPosition, getReferrerFromUrl } from "@/lib/referral";
import { submitToWaitlist, WaitlistSignup } from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  whatsappNumber: z.string()
    .min(10, { message: "WhatsApp number must be at least 10 digits" })
    .refine((val) => /^\+?[0-9]+$/.test(val), { message: "Please enter a valid phone number" }),
  specialty: z.string().min(1, { message: "Please select your specialty" }),
});

export function WaitlistForm({ onSuccess }: { onSuccess: (position: number, referralCode: string) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      whatsappNumber: "",
      specialty: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    try {
      // Generate a unique referral code for this user
      const referralCode = generateReferralCode();
      
      // Check if user was referred by someone
      const referredBy = getReferrerFromUrl();
      
      // Prepare data for API
      const waitlistData: WaitlistSignup = {
        ...values,
        referralCode,
        ...(referredBy ? { referredBy } : {}),
      };
      
      // Submit to waitlist API
      const response = await submitToWaitlist(waitlistData);
      
      if (response.success) {
        // Save the user's generated referral code
        saveReferralCode(referralCode);
        
        // Save the waitlist position
        saveWaitlistPosition(response.position);
        
        // Show success message
        toast.success("You've joined the waitlist successfully!");
        
        // Call the success callback with position and referral code
        onSuccess(response.position, referralCode);
      }
    } catch (error) {
      console.error("Error joining waitlist:", error);
      toast.error("Failed to join the waitlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. Jane Smith" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="whatsappNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" className="h-12" {...field} />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground">Include country code (e.g., +1 for US)</p>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="specialty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medical Specialty</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your specialty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="general-practitioner">General Practitioner</SelectItem>
                    <SelectItem value="family-medicine">Family Medicine</SelectItem>
                    <SelectItem value="internal-medicine">Internal Medicine</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="obgyn">Obstetrician & Gynecologist</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="psychiatry">Psychiatry</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                    <SelectItem value="emergency">Emergency Medicine</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="other">Other Specialty</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium transition-all bg-prestige-blue hover:bg-prestige-blue-700 hover:shadow-lg hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? "Joining Waitlist..." : "Join the Waitlist"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
