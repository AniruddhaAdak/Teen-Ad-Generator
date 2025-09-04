
export interface Ad {
  id: number;
  copy: string;
}

export interface CampaignData {
  campaignName: string;
  ads: Ad[];
}
