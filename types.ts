export interface Ad {
  id: number;
  copy: string;
  imageUrl?: string | null;
  isGeneratingImage?: boolean;
  imageError?: string | null;
}

export interface CampaignData {
  campaignName: string;
  ads: Ad[];
}