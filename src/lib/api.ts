
import { toast } from "sonner";

// Types for our API
export interface WaitlistSignup {
  email: string;
  name: string;
  specialty: string;
  referredBy?: string;
  referralCode: string;
}

export interface WaitlistResponse {
  success: boolean;
  position: number;
  credits: number;
  referralCode: string;
  message: string;
}

// Mock API function (in a real app, this would call your backend)
export const submitToWaitlist = async (data: WaitlistSignup): Promise<WaitlistResponse> => {
  // This is a mock implementation - in a real application,
  // you would replace this with an actual API call
  
  console.log("Submitting to waitlist:", data);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock success response
  try {
    // In a real app, this would come from your API
    return {
      success: true,
      position: Math.floor(Math.random() * 100) + 1, // Random position between 1-100
      credits: 0, // Start with 0 credits
      referralCode: data.referralCode,
      message: "Successfully joined the waitlist!"
    };
  } catch (error) {
    console.error("Error submitting to waitlist:", error);
    toast.error("Failed to join waitlist. Please try again.");
    throw error;
  }
};

// Track when someone uses a referral link
export const trackReferralClick = async (referralCode: string): Promise<boolean> => {
  // This is a mock implementation - in a real application,
  // you would replace this with an actual API call
  
  console.log("Tracking referral click for code:", referralCode);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock successful tracking
  return true;
};
