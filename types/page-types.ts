// @/aifa-v2/types/page-types.ts
import { Metadata } from "next";

import { UserType } from "./user-type";
import { BadgeName } from "@/config/pages-config/badges /badge-config";


export interface LinksData {
  linkBuilderType: "outgoing" | "incoming" | "external";
  path: string[];
}

export interface SectionInfo {
  id: string;
  summary?: SummaryData;
  linksData?: LinksData[];
  tempMDXContent: string;
}

export interface SummaryData {
  id: string;
  path: string;
  tags?: string[];
  childSummary: string;
  parentSummary: string;
  selfSummary: string;
}

export type LinkItemState = "pending" | "active";

export interface LinkConfiguration {
  outgoing: LinkItemState;
  incoming: LinkItemState;
  external: LinkItemState;
}

export interface Activities {
  likesCount: number;
  bookmarksCount: number;
}

export interface PageImages {
  id: string;
  alt?: string;
  href?: string;
}
export interface PageAuthors {
  id: string;
  name: string;
  image?: PageImages[];
}

export type TechnicalTag =
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "ul"
  | "ol"
  | "li"
  | "blockquote"
  | "code"
  | "table"
  | "thead"
  | "tbody"
  | "tr"
  | "td"
  | "th"
  | "img";

export type SemanticBlockType =
  | "hero"
  | "hero.cta"
  | "hero.banner"
  | "features"
  | "features.grid"
  | "features.list"
  | "features.comparison"
  | "pricing"
  | "pricing.table"
  | "pricing.cards"
  | "pricing.tiers"
  | "faq"
  | "faq.accordion"
  | "faq.list"
  | "testimonials"
  | "testimonials.carousel"
  | "testimonials.grid"
  | "testimonials.single"
  | "about"
  | "about.team"
  | "about.story"
  | "about.mission"
  | "contact"
  | "contact.form"
  | "contact.info"
  | "portfolio"
  | "portfolio.gallery"
  | "portfolio.showcase"
  | "blog.preview"
  | "blog.featured"
  | "blog.list"
  | "newsletter"
  | "newsletter.signup"
  | "social.proof"
  | "social.media"
  | "process"
  | "process.steps"
  | "process.timeline"
  | "stats"
  | "stats.counter"
  | "stats.metrics"
  | "cta"
  | "cta.banner"
  | "cta.modal"
  | "breadcrumbs"
  | "navigation"
  | "navigation.menu"
  | "navigation.sidebar"
  | "search"
  | "search.filters"
  | "footer.links"
  | "footer.legal"
  | "custom";

export type AIGeneratedBlockType = `ai.${string}`;

export type ContentTag = TechnicalTag;

export interface ContentElementAnalysis {
  qualityScore?: number;
  effectivenessRating?: "poor" | "average" | "good" | "excellent";
  intentAlignment?: number;
  keywordAnalysis?: {
    density?: number;
    relevance?: number;
    competition?: "low" | "medium" | "high";
  };
  seoMetrics?: {
    headingStructure?: "poor" | "good" | "excellent";
    readability?: number;
    wordCount?: number;
  };
  uxAnalysis?: {
    visualHierarchy?: "poor" | "good" | "excellent";
    scanability?: number;
    engagement?: "low" | "medium" | "high";
  };
  semanticAnalysis?: {
    blockPurposeClarity?: number;
    userValueProposition?: number;
    conversionOptimization?: number;
  };
}

export type ContentClassification = "semantic" | "technical" | "hybrid";

// Валидационные утилиты для проверки структуры
export interface StructureValidationResult {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
  invalidElements?: {
    index: number;
    tag: string;
    expectedTag: string;
  }[];
}

export interface CompetitorContentResult {
  id: string;
  contentStructure: ContentStructure;
  researchResult: {
    analysisText: string;
    elementAnalysis?: ContentElementAnalysis;
    recommendations?: string[];
    strengths?: string[];
    weaknesses?: string[];
    opportunities?: string[];
    competitiveAdvantage?: string;
    semanticInsights?: {
      blockTypeEffectiveness?: string;
      industryStandardCompliance?: number;
      innovativeApproach?: string[];
    };
  };
  analysisMetadata?: {
    analyzedAt?: string;
    analysisDepth?: "surface" | "detailed" | "comprehensive";
    status?: "pending" | "analyzing" | "completed" | "error";
    confidence?: number;
    dataSource?: "manual" | "automated" | "hybrid";
  };
  children?: CompetitorContentResult[];
}

export interface CompetitorAnalysis {
  href: string;
  competitorName: string;
  isSuitable: boolean;
  isAnalyzed: boolean;
  recommendationReason: string;
  competitorStructure: CompetitorContentResult[];
  overallAnalysis?: {
    overallScore?: number;
    summary?: string;
    keyFindings?: string[];
    actionableInsights?: string[];
    ourAdvantages?: string[];
    semanticPatterns?: {
      commonBlocks?: SemanticBlockType[];
      unusualImplementations?: string[];
      missingOpportunities?: string[];
    };
  };
}

export interface KnowledgeSettings {
  knowledgeBase: string;
  mixingRatio: number;
}

export interface RootContentStructure extends Omit<ContentStructure, "tag"> {
  tag: "h2";
  writingStyle?: string;
  contentFormat?: string;
  customRequirements?: string;
}
export interface ContentStructure {
  id?: string;
  order?: number;
  classification?: ContentClassification;
  tag: ContentTag;
  description?: string;
  keywords?: string[];
  intent?: string;
  taxonomy?: string;
  attention?: string;
  audiences?: string;
  selfPrompt?: string;
  designDescription?: string;
  connectedDesignSectionId?: string;
  linksToSource?: string[];
  additionalData: {
    minWords: number;
    maxWords: number;
    actualContent: string;
  };
  status?: "draft" | "checked";
  realContentStructure?: ContentStructure[];
}

export interface DraftContentResult {
  id: string;
  contentStructure: RootContentStructure;
  analysisResult?: {
    analysisText?: string;
    elementAnalysis?: ContentElementAnalysis;
    aiRecommendations?: string[];
    acceptRecommendation?: boolean;
    strengths?: string[];
    weaknesses?: string[];
    improvementAreas?: string[];
    semanticOptimization?: {
      suggestedBlockType?: SemanticBlockType;
      purposeClarity?: string;
      conversionTips?: string[];
    };
  };
  analysisMetadata?: {
    analyzedAt?: string;
    analysisDepth?: "surface" | "detailed" | "comprehensive";
    status?: "pending" | "analyzing" | "completed" | "error";
    confidence?: number;
    dataSource?: "manual" | "automated" | "hybrid";
  };
  children?: DraftContentResult[];
}

export interface FinalContentResult {
  id: string;
  contentStructure: RootContentStructure;
  finalAnalysis: {
    analysisText: string;
    elementAnalysis?: ContentElementAnalysis;
    achievements?: string[];
    finalScore?: number;
    contentQuality?: "poor" | "average" | "good" | "excellent";
    semanticSuccess?: {
      blockTypeAppropriate?: boolean;
      userGoalAlignment?: number;
      industryBestPractices?: boolean;
    };
  };
  analysisMetadata?: {
    analyzedAt?: string;
    analysisDepth?: "surface" | "detailed" | "comprehensive";
    status?: "pending" | "analyzing" | "completed" | "error";
    confidence?: number;
    dataSource?: "manual" | "automated" | "hybrid";
  };
  children?: FinalContentResult[];
}

export interface DraftReport {
  reportId: string;
  pageId: string;
  draftStructure: DraftContentResult[];
  overallDraftAnalysis?: {
    overallScore?: number;
    summary?: string;
    keyIssues?: string[];
    priorityRecommendations?: string[];
    readyForRegeneration?: boolean;
    semanticOverview?: {
      detectedBlocks?: SemanticBlockType[];
      missingCriticalBlocks?: SemanticBlockType[];
      blockHierarchyHealth?: number;
    };
  };
  generatedAt: string;
}



export interface AISemanticCapabilities {
  canGenerateCustomBlocks: boolean;
  supportedSemanticTypes: SemanticBlockType[];
  aiGeneratedTypes: AIGeneratedBlockType[];
  classificationAccuracy: number;
  lastModelUpdate: string;
}

export interface SemanticContentLibrary {
  blockTemplates: {
    [key in SemanticBlockType]?: {
      description: string;
      commonPatterns: string[];
      bestPractices: string[];
      conversionOptimization: string[];
    };
  };
  industrySpecificBlocks: {
    industry: string;
    customBlocks: SemanticBlockType[];
  }[];
}

export interface PageData {
  metadata?: Metadata;
  id: string;
  href?: string;
  type: "blog" | "docs" | "news" | "feature"; 
  title?: string;
  description?: string;
  internalKnowledgeBase?: string;
  externallKnowledgeBase?: string;
  images?: PageImages[];
  tags?: string[];
  authors?: PageAuthors[];
  summary?: string;
  keywords?: string[];
  intent?: string;
  taxonomy?: string;
  attention?: string;
  audiences?: string;
  roles: UserType[];

  semanticCapabilities?: AISemanticCapabilities;
  semanticLibrary?: SemanticContentLibrary;

  competitorAnalysis?: CompetitorAnalysis[];
  aiRecommendContentStructure?: RootContentStructure[];
  knowledgeSettings?: KnowledgeSettings;
  isReadyPromptForPerplexity?: boolean;
  draftContentStructure?: RootContentStructure[];
  isReadyDraftForPerplexity?: boolean;
  draftContentResult?: DraftContentResult[];
  draftReport?: DraftReport;
  finalContentStructure?: RootContentStructure[];
  finalContentResult?: FinalContentResult;
  isPreviewComplited?: boolean;
  finalReport?: string[];
  hasBadge?: boolean;
  badgeName?: BadgeName;
  badgeLink?: string;
  order?: number;
  isPublished: boolean;
  isVectorConnected: boolean;
  isAddedToPrompt: boolean;
  isChatSynchronized: boolean;
  design?: string;
  linkConfiguration?: LinkConfiguration;
  createdAt?: string;
  updatedAt?: string;
  sections?: SectionInfo[];
}



