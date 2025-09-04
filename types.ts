export interface Ad {
  id: number;
  copy: string;
  imageUrl?: string | null;
  isGeneratingImage?: boolean;
}

export interface CampaignData {
  campaignName: string;
  ads: Ad[];
}