
import { nanoid } from 'nanoid';

// Generate a unique referral code
export const generateReferralCode = () => {
  return nanoid(10);
};

// Save referral code to localStorage
export const saveReferralCode = (code: string) => {
  localStorage.setItem('referralCode', code);
};

// Get referral code from localStorage
export const getReferralCode = (): string | null => {
  return localStorage.getItem('referralCode');
};

// Save user's position in the waitlist
export const saveWaitlistPosition = (position: number) => {
  localStorage.setItem('waitlistPosition', position.toString());
};

// Get user's current position in the waitlist
export const getWaitlistPosition = (): number => {
  const position = localStorage.getItem('waitlistPosition');
  return position ? parseInt(position, 10) : 0;
};

// Save credits amount
export const saveCredits = (credits: number) => {
  localStorage.setItem('credits', credits.toString());
};

// Get credits amount
export const getCredits = (): number => {
  const credits = localStorage.getItem('credits');
  return credits ? parseInt(credits, 10) : 0;
};

// Get referral code from URL if present
export const getReferrerFromUrl = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('ref');
};

// Track a new referral
export const trackReferral = (referrerCode: string) => {
  const currentReferrals = getReferrals();
  
  // Only add if this referrer isn't already tracked
  if (!currentReferrals.includes(referrerCode)) {
    currentReferrals.push(referrerCode);
    localStorage.setItem('referrals', JSON.stringify(currentReferrals));
    return true;
  }
  
  return false;
};

// Get all referrals tracked
export const getReferrals = (): string[] => {
  const referrals = localStorage.getItem('referrals');
  return referrals ? JSON.parse(referrals) : [];
};

// Get total number of referrals made by the current user
export const getTotalReferrals = (): number => {
  const referralsMade = localStorage.getItem('referralsMade');
  return referralsMade ? parseInt(referralsMade, 10) : 0;
};

// Increment number of referrals made
export const incrementReferralsMade = () => {
  const current = getTotalReferrals();
  localStorage.setItem('referralsMade', (current + 1).toString());
  return current + 1;
};
