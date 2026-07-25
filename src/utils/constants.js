export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  PROPOSAL_SENT: 'proposal_sent',
  WON: 'won',
  LOST: 'lost',
};

export const LEAD_STATUS_LABELS = {
  [LEAD_STATUS.NEW]: 'New',
  [LEAD_STATUS.CONTACTED]: 'Contacted',
  [LEAD_STATUS.QUALIFIED]: 'Qualified',
  [LEAD_STATUS.PROPOSAL_SENT]: 'Proposal Sent',
  [LEAD_STATUS.WON]: 'Won',
  [LEAD_STATUS.LOST]: 'Lost',
};

export const LEAD_STATUS_COLORS = {
  [LEAD_STATUS.NEW]: 'bg-blue-100 text-blue-700',
  [LEAD_STATUS.CONTACTED]: 'bg-yellow-100 text-yellow-700',
  [LEAD_STATUS.QUALIFIED]: 'bg-green-100 text-green-700',
  [LEAD_STATUS.PROPOSAL_SENT]: 'bg-purple-100 text-purple-700',
  [LEAD_STATUS.WON]: 'bg-emerald-100 text-emerald-700',
  [LEAD_STATUS.LOST]: 'bg-red-100 text-red-700',
};

export const LEAD_SOURCE = {
  WEBSITE: 'website',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
  GOOGLE: 'google',
  REFERRAL: 'referral',
  OTHER: 'other',
};

export const LEAD_SOURCE_LABELS = {
  [LEAD_SOURCE.WEBSITE]: 'Website',
  [LEAD_SOURCE.FACEBOOK]: 'Facebook',
  [LEAD_SOURCE.INSTAGRAM]: 'Instagram',
  [LEAD_SOURCE.LINKEDIN]: 'LinkedIn',
  [LEAD_SOURCE.GOOGLE]: 'Google',
  [LEAD_SOURCE.REFERRAL]: 'Referral',
  [LEAD_SOURCE.OTHER]: 'Other',
};

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';