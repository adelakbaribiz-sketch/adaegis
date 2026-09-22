// Demo/mock data for the AdAegis prototype.
// Nothing in this file represents a real customer, campaign, or financial figure.
// See docs/DEMO.md for how this data is used and docs/LIMITATIONS.md for what is not real.

export type Role =
  | "Owner"
  | "Admin"
  | "Marketing Manager"
  | "PPC Specialist"
  | "Analyst"
  | "Viewer";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  initials: string;
  accent: "amber" | "cyan" | "success" | "danger";
  lastActive: string;
}

export interface Competitor {
  id: string;
  name: string;
  domain: string;
  initials: string;
  threatLevel: "high" | "medium" | "low";
  shareOfVoice: number;
  shareOfVoiceDelta: number;
  overlapKeywords: number;
  trend: number[];
  lastMove: string;
  lastMoveAt: string;
  sampleOverlapKeywords: string[];
  moveHistory: { date: string; description: string }[];
}

export interface Campaign {
  id: string;
  name: string;
  mode: "Defense" | "Attack" | "Standard";
  status: "active" | "paused" | "draft";
  dailyBudget: number;
  spend30d: number;
  clicks30d: number;
  impressions30d: number;
  ctr: number;
  avgCpc: number;
  conversions30d: number;
  competitor?: string;
  keywords: { id: string; text: string; matchType: "Exact" | "Phrase" | "Broad"; bid: number; qualityScore: number; status: "active" | "paused" }[];
}

export interface AlertItem {
  id: string;
  severity: "critical" | "warning" | "info";
  category: "Defense" | "Attack" | "Performance" | "Billing";
  title: string;
  description: string;
  relatedCampaign?: string;
  relatedCompetitor?: string;
  createdAt: string;
  read: boolean;
}

export interface WorkflowStep {
  id: string;
  kind: "trigger" | "condition" | "action";
  label: string;
  detail: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: "Defense" | "Attack" | "Optimization" | "Retargeting";
  status: "active" | "paused" | "draft";
  runsLast30d: number;
  lastRun: string;
  successRate: number;
  steps: WorkflowStep[];
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "due";
  plan: string;
}

export interface ReportPoint {
  date: string;
  shareOfVoice: number;
  spend: number;
  conversions: number;
  defenseActions: number;
  attackActions: number;
}

export const tenant = {
  name: "Northwind Digital",
  plan: "Growth",
  seatsUsed: 6,
  seatsIncluded: 10,
  region: "US-East",
  connectedAccounts: ["Google Ads", "Google Analytics 4"],
};

export const currentUser: TeamMember = {
  id: "u1",
  name: "Sam Rivera",
  email: "sam@northwind.example",
  role: "Marketing Manager",
  initials: "SR",
  accent: "amber",
  lastActive: new Date().toISOString(),
};

export const team: TeamMember[] = [
  currentUser,
  { id: "u2", name: "Priya Nair", email: "priya@northwind.example", role: "Owner", initials: "PN", accent: "cyan", lastActive: "2026-09-21T14:12:00Z" },
  { id: "u3", name: "Diego Ferreira", email: "diego@northwind.example", role: "PPC Specialist", initials: "DF", accent: "success", lastActive: "2026-09-22T02:40:00Z" },
  { id: "u4", name: "Lena Kowalski", email: "lena@northwind.example", role: "PPC Specialist", initials: "LK", accent: "amber", lastActive: "2026-09-21T19:05:00Z" },
  { id: "u5", name: "Marcus Webb", email: "marcus@northwind.example", role: "Analyst", initials: "MW", accent: "cyan", lastActive: "2026-09-20T11:30:00Z" },
  { id: "u6", name: "Aiko Tanaka", email: "aiko@northwind.example", role: "Viewer", initials: "AT", accent: "danger", lastActive: "2026-09-18T09:00:00Z" },
];

export const competitors: Competitor[] = [
  {
    id: "c1",
    name: "Bramwell PPC Suite",
    domain: "bramwellppc.com",
    initials: "BW",
    threatLevel: "high",
    shareOfVoice: 34,
    shareOfVoiceDelta: 6.2,
    overlapKeywords: 214,
    trend: [18, 21, 19, 24, 27, 30, 34],
    lastMove: "Increased bids on 'northwind alternative' by an est. 40%",
    lastMoveAt: "2026-09-21T08:12:00Z",
    sampleOverlapKeywords: ["ppc automation software", "google ads automation tool", "northwind alternative"],
    moveHistory: [
      { date: "2026-09-21T08:12:00Z", description: "Increased bids on 'northwind alternative' by an est. 40%" },
      { date: "2026-09-15T10:00:00Z", description: "Launched new ad copy emphasizing '24/7 support'" },
      { date: "2026-09-05T09:30:00Z", description: "Expanded into 3 new geo-targets in EU" },
    ],
  },
  {
    id: "c2",
    name: "Adalytics Pro",
    domain: "adalyticspro.com",
    initials: "AP",
    threatLevel: "medium",
    shareOfVoice: 21,
    shareOfVoiceDelta: -1.4,
    overlapKeywords: 132,
    trend: [25, 24, 23, 22, 22, 21, 21],
    lastMove: "New ad copy testing '50% cheaper than Northwind'",
    lastMoveAt: "2026-09-20T15:40:00Z",
    sampleOverlapKeywords: ["ppc reporting tool", "google ads dashboard", "adalytics vs northwind"],
    moveHistory: [
      { date: "2026-09-20T15:40:00Z", description: "New ad copy testing '50% cheaper than Northwind'" },
      { date: "2026-09-12T11:00:00Z", description: "Reduced bids on 5 shared keywords, possibly reallocating budget" },
    ],
  },
  {
    id: "c3",
    name: "BidForge",
    domain: "bidforge.io",
    initials: "BF",
    threatLevel: "high",
    shareOfVoice: 28,
    shareOfVoiceDelta: 3.1,
    overlapKeywords: 178,
    trend: [20, 22, 23, 25, 26, 27, 28],
    lastMove: "Bidding on brand term 'northwind digital' (possible hijack)",
    lastMoveAt: "2026-09-22T01:05:00Z",
    sampleOverlapKeywords: ["northwind digital", "bidforge vs northwind", "ppc automation software"],
    moveHistory: [
      { date: "2026-09-22T01:05:00Z", description: "Bidding on brand term 'northwind digital' (possible hijack)" },
      { date: "2026-09-16T08:00:00Z", description: "Raised bids across 6 shared keywords by an est. 40%" },
      { date: "2026-09-08T14:20:00Z", description: "Added sitelink extensions mirroring our feature list" },
    ],
  },
  {
    id: "c4",
    name: "ClickGuard",
    domain: "clickguard.app",
    initials: "CG",
    threatLevel: "low",
    shareOfVoice: 9,
    shareOfVoiceDelta: 0.3,
    overlapKeywords: 54,
    trend: [8, 8, 9, 9, 8, 9, 9],
    lastMove: "Paused campaigns overlapping with our keyword set",
    lastMoveAt: "2026-09-17T10:00:00Z",
    sampleOverlapKeywords: ["click fraud protection", "ppc automation software"],
    moveHistory: [
      { date: "2026-09-17T10:00:00Z", description: "Paused campaigns overlapping with our keyword set" },
    ],
  },
  {
    id: "c5",
    name: "Rivet Marketing",
    domain: "rivetmarketing.co",
    initials: "RM",
    threatLevel: "medium",
    shareOfVoice: 15,
    shareOfVoiceDelta: 2.0,
    overlapKeywords: 97,
    trend: [11, 12, 12, 13, 14, 14, 15],
    lastMove: "Launched retargeting campaign on our site visitors",
    lastMoveAt: "2026-09-19T13:22:00Z",
    sampleOverlapKeywords: ["rivet marketing reviews", "ppc agency automation"],
    moveHistory: [
      { date: "2026-09-19T13:22:00Z", description: "Launched retargeting campaign on our site visitors" },
      { date: "2026-09-11T09:45:00Z", description: "Published comparison page 'Rivet vs Northwind'" },
    ],
  },
];

export const campaigns: Campaign[] = [
  {
    id: "cmp1",
    name: "Brand Defense — Northwind Core",
    mode: "Defense",
    status: "active",
    dailyBudget: 180,
    spend30d: 4820,
    clicks30d: 6210,
    impressions30d: 98400,
    ctr: 6.31,
    avgCpc: 0.78,
    conversions30d: 312,
    keywords: [
      { id: "k1", text: "[northwind digital]", matchType: "Exact", bid: 2.4, qualityScore: 9, status: "active" },
      { id: "k2", text: "\"northwind digital agency\"", matchType: "Phrase", bid: 1.9, qualityScore: 8, status: "active" },
      { id: "k3", text: "[northwind login]", matchType: "Exact", bid: 1.1, qualityScore: 10, status: "active" },
    ],
  },
  {
    id: "cmp2",
    name: "Attack — Bramwell Conquest",
    mode: "Attack",
    status: "active",
    dailyBudget: 140,
    spend30d: 3910,
    clicks30d: 4102,
    impressions30d: 71200,
    ctr: 5.76,
    avgCpc: 0.95,
    conversions30d: 168,
    competitor: "Bramwell PPC Suite",
    keywords: [
      { id: "k4", text: "[bramwell ppc suite alternative]", matchType: "Exact", bid: 3.1, qualityScore: 6, status: "active" },
      { id: "k5", text: "\"bramwell pricing\"", matchType: "Phrase", bid: 2.2, qualityScore: 7, status: "active" },
    ],
  },
  {
    id: "cmp3",
    name: "Attack — BidForge Displacement",
    mode: "Attack",
    status: "active",
    dailyBudget: 110,
    spend30d: 2870,
    clicks30d: 2990,
    impressions30d: 52100,
    ctr: 5.74,
    avgCpc: 0.96,
    conversions30d: 121,
    competitor: "BidForge",
    keywords: [
      { id: "k6", text: "[bidforge vs northwind]", matchType: "Exact", bid: 2.8, qualityScore: 6, status: "active" },
    ],
  },
  {
    id: "cmp4",
    name: "Generic — PPC Automation",
    mode: "Standard",
    status: "active",
    dailyBudget: 220,
    spend30d: 6140,
    clicks30d: 8890,
    impressions30d: 154200,
    ctr: 5.77,
    avgCpc: 0.69,
    conversions30d: 402,
    keywords: [
      { id: "k7", text: "ppc automation software", matchType: "Broad", bid: 1.4, qualityScore: 7, status: "active" },
      { id: "k8", text: "\"google ads automation tool\"", matchType: "Phrase", bid: 1.6, qualityScore: 8, status: "active" },
    ],
  },
  {
    id: "cmp5",
    name: "Defense — SERP Extensions",
    mode: "Defense",
    status: "paused",
    dailyBudget: 60,
    spend30d: 980,
    clicks30d: 1440,
    impressions30d: 30200,
    ctr: 4.77,
    avgCpc: 0.68,
    conversions30d: 44,
    keywords: [
      { id: "k9", text: "[northwind pricing]", matchType: "Exact", bid: 1.3, qualityScore: 9, status: "paused" },
    ],
  },
  {
    id: "cmp6",
    name: "Attack — Rivet Retarget Block",
    mode: "Attack",
    status: "draft",
    dailyBudget: 75,
    spend30d: 0,
    clicks30d: 0,
    impressions30d: 0,
    ctr: 0,
    avgCpc: 0,
    conversions30d: 0,
    competitor: "Rivet Marketing",
    keywords: [
      { id: "k10", text: "[rivet marketing reviews]", matchType: "Exact", bid: 1.8, qualityScore: 5, status: "paused" },
    ],
  },
];

export const alerts: AlertItem[] = [
  {
    id: "a1",
    severity: "critical",
    category: "Defense",
    title: "Possible brand hijack detected",
    description: "BidForge is now bidding on the exact-match term \"northwind digital\" and appearing above your ad in 3 of the last 10 auctions.",
    relatedCompetitor: "BidForge",
    relatedCampaign: "Brand Defense — Northwind Core",
    createdAt: "2026-09-22T01:10:00Z",
    read: false,
  },
  {
    id: "a2",
    severity: "warning",
    category: "Performance",
    title: "CTR dropped below threshold",
    description: "\"Generic — PPC Automation\" CTR fell to 3.9% (threshold 4.5%) over the last 48 hours. Ad copy refresh suggested.",
    relatedCampaign: "Generic — PPC Automation",
    createdAt: "2026-09-21T22:45:00Z",
    read: false,
  },
  {
    id: "a3",
    severity: "warning",
    category: "Attack",
    title: "Bramwell raised bids on shared keywords",
    description: "Estimated bid increase of 40% on 6 keywords you are also targeting in \"Attack — Bramwell Conquest\".",
    relatedCompetitor: "Bramwell PPC Suite",
    relatedCampaign: "Attack — Bramwell Conquest",
    createdAt: "2026-09-21T08:20:00Z",
    read: true,
  },
  {
    id: "a4",
    severity: "info",
    category: "Attack",
    title: "Rivet Marketing launched a retargeting campaign",
    description: "New GDN placements detected targeting visitors who previously viewed northwind.example pricing pages.",
    relatedCompetitor: "Rivet Marketing",
    createdAt: "2026-09-19T13:30:00Z",
    read: true,
  },
  {
    id: "a5",
    severity: "critical",
    category: "Billing",
    title: "Monthly spend approaching plan limit",
    description: "Combined ad spend automation is projected to exceed your Growth plan's managed-spend cap by 8% this month.",
    createdAt: "2026-09-18T16:00:00Z",
    read: true,
  },
  {
    id: "a6",
    severity: "info",
    category: "Performance",
    title: "Quality Score improved",
    description: "\"[northwind login]\" quality score increased from 8 to 10 after landing page update.",
    relatedCampaign: "Brand Defense — Northwind Core",
    createdAt: "2026-09-17T09:15:00Z",
    read: true,
  },
];

export const workflows: Workflow[] = [
  {
    id: "w1",
    name: "Brand Hijack Auto-Response",
    description: "Detects competitor bidding on brand terms and raises defensive bids automatically, then notifies the team.",
    category: "Defense",
    status: "active",
    runsLast30d: 42,
    lastRun: "2026-09-22T01:11:00Z",
    successRate: 97,
    steps: [
      { id: "s1", kind: "trigger", label: "Auction Insights changed", detail: "Poll Google Ads Auction Insights every 4 hours for brand campaigns" },
      { id: "s2", kind: "condition", label: "New competitor on brand term?", detail: "Compare impression share list against yesterday's snapshot" },
      { id: "s3", kind: "action", label: "Raise defensive bid", detail: "Increase bid by 15%, capped at $3.50" },
      { id: "s4", kind: "action", label: "Notify #ppc-alerts", detail: "Send Slack message with competitor name and affected keyword" },
    ],
  },
  {
    id: "w2",
    name: "Competitor Price Reaction",
    description: "Watches competitor pricing pages and adjusts attack-campaign bids when they undercut by a set margin.",
    category: "Attack",
    status: "active",
    runsLast30d: 18,
    lastRun: "2026-09-21T09:00:00Z",
    successRate: 89,
    steps: [
      { id: "s5", kind: "trigger", label: "Scheduled scrape (daily, 08:00)", detail: "Fetch competitor pricing pages via scraping service" },
      { id: "s6", kind: "condition", label: "Price undercut ≥ 10%?", detail: "Compare scraped price to internal price sheet" },
      { id: "s7", kind: "action", label: "Adjust bid ±", detail: "Lower target CPA on affected ad group by 10%" },
      { id: "s8", kind: "action", label: "Log to reporting", detail: "Append event to Competitor Price history" },
    ],
  },
  {
    id: "w3",
    name: "Ad Copy CTR Guard",
    description: "Rotates in a backup ad variant when CTR on a campaign drops below threshold for 48 hours.",
    category: "Optimization",
    status: "active",
    runsLast30d: 9,
    lastRun: "2026-09-21T22:46:00Z",
    successRate: 100,
    steps: [
      { id: "s9", kind: "trigger", label: "Daily performance check", detail: "Pull CTR for all active campaigns" },
      { id: "s10", kind: "condition", label: "CTR < 4.5% for 2 days?", detail: "Rolling 48h average below threshold" },
      { id: "s11", kind: "action", label: "Promote backup ad variant", detail: "Pause underperforming ad, activate variant B" },
    ],
  },
  {
    id: "w4",
    name: "Competitor Visitor Retargeting Sync",
    description: "Pushes visitors who came from competitor comparison pages into a Google Ads audience list.",
    category: "Retargeting",
    status: "paused",
    runsLast30d: 0,
    lastRun: "2026-09-10T12:00:00Z",
    successRate: 92,
    steps: [
      { id: "s12", kind: "trigger", label: "New GA4 audience match", detail: "Segment: viewed /compare/* pages in last 7 days" },
      { id: "s13", kind: "action", label: "Sync to Google Ads audience", detail: "Add to \"Competitor Researchers\" remarketing list" },
    ],
  },
  {
    id: "w5",
    name: "Auction Insights Weekly Digest",
    description: "Summarizes share-of-voice movement across all tracked competitors and emails the team every Monday.",
    category: "Defense",
    status: "draft",
    runsLast30d: 0,
    lastRun: "—",
    successRate: 0,
    steps: [
      { id: "s14", kind: "trigger", label: "Every Monday, 07:00", detail: "Cron schedule" },
      { id: "s15", kind: "action", label: "Compile digest", detail: "Aggregate share-of-voice deltas for all tracked competitors" },
      { id: "s16", kind: "action", label: "Email team", detail: "Send to Marketing Manager and Owner roles" },
    ],
  },
];

export const invoices: Invoice[] = [
  { id: "INV-1042", date: "2026-09-01", amount: 349, status: "paid", plan: "Growth" },
  { id: "INV-1009", date: "2026-08-01", amount: 349, status: "paid", plan: "Growth" },
  { id: "INV-0978", date: "2026-07-01", amount: 249, status: "paid", plan: "Starter" },
  { id: "INV-0951", date: "2026-06-01", amount: 249, status: "paid", plan: "Starter" },
];

export const reportSeries: ReportPoint[] = [
  { date: "2026-08-26", shareOfVoice: 41, spend: 610, conversions: 28, defenseActions: 3, attackActions: 1 },
  { date: "2026-08-29", shareOfVoice: 40, spend: 590, conversions: 25, defenseActions: 2, attackActions: 2 },
  { date: "2026-09-01", shareOfVoice: 43, spend: 640, conversions: 31, defenseActions: 4, attackActions: 1 },
  { date: "2026-09-04", shareOfVoice: 42, spend: 615, conversions: 29, defenseActions: 1, attackActions: 3 },
  { date: "2026-09-07", shareOfVoice: 45, spend: 670, conversions: 34, defenseActions: 5, attackActions: 2 },
  { date: "2026-09-10", shareOfVoice: 44, spend: 655, conversions: 33, defenseActions: 2, attackActions: 2 },
  { date: "2026-09-13", shareOfVoice: 47, spend: 700, conversions: 38, defenseActions: 6, attackActions: 3 },
  { date: "2026-09-16", shareOfVoice: 46, spend: 690, conversions: 36, defenseActions: 3, attackActions: 4 },
  { date: "2026-09-19", shareOfVoice: 48, spend: 720, conversions: 41, defenseActions: 4, attackActions: 2 },
  { date: "2026-09-22", shareOfVoice: 49, spend: 735, conversions: 43, defenseActions: 7, attackActions: 3 },
];

export const plans = [
  {
    name: "Starter",
    price: 249,
    seats: 3,
    managedSpendCap: 15000,
    features: ["Brand defense automation", "Up to 3 tracked competitors", "Email alerts", "Standard reporting"],
  },
  {
    name: "Growth",
    price: 349,
    seats: 10,
    managedSpendCap: 50000,
    features: ["Everything in Starter", "Attack campaigns", "Up to 10 tracked competitors", "Workflow builder", "Slack + Telegram alerts"],
    current: true,
  },
  {
    name: "Agency",
    price: 899,
    seats: 25,
    managedSpendCap: 250000,
    features: ["Everything in Growth", "Multi-client workspaces", "Unlimited tracked competitors", "API access", "Priority support"],
  },
];
