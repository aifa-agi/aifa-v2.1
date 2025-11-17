// config/pages-config/aifa-roadmap-data.ts

export type RoadmapStatus = 'completed' | 'inProgress';

export type RoadmapItem = {
  id: string;
  version: string;
  title: string;
  description: string;
  url: string;
  status: RoadmapStatus;
};

export const AIFA_ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: 'aifa-base',
    version: 'AIFA',
    title: 'Base Template',
    description:
      'The primary project that integrates all implemented features and represents the full-featured version',
    url: 'https://aifa.dev',
    status: 'completed',
  },
  {
    id: 'aifa-v2',
    version: 'AIFA v2',
    title: 'SEO & PWA Starter',
    description:
      'Starter template focused on SEO and PWA, with optimized structure and Lighthouse best practices',
    url: 'https://aifa-v2.vercel.app',
    status: 'completed',
  },
  {
    id: 'aifa-v2-1',
    version: 'AIFA v2.1',
    title: 'AI-SEO Parallel Interception Next Starter',
    description:
      'Starter template for projects with advanced routing featuring parallel and intercepting routes',
    url: 'https://aifa-v2-1.vercel.app',
    status: 'completed',
  },
   {
    id: 'aifa-v2-2',
    version: 'AIFA v2.2',
    title: 'Dual translation Static-Dynamic Multilang Next Starter',
    description:
      'A starter featuring sophisticated multi-language architecture that supports static page generation, internal tooling, and dynamic application development',
    url: 'https://dual-translation-static-dynamic-mul.vercel.app',
    status: 'inProgress',
  },

  // NEW: Advanced auth starter (guest + roles)
  {
    id: 'aifa-v2-3',
    version: 'AIFA v2.3',
    title: 'Advanced Auth & Roles Starter',
    description:
      'Starter implementing advanced authentication with guest access and a dual-role system separating privileged and regular users, ready for secure dashboards and admin panels',
    url: 'https://aifa-v2-3.vercel.app',
    status: 'inProgress',
  },

  // NEW: AI SDK chat starter
  {
    id: 'aifa-v2-4',
    version: 'AIFA v2.4',
    title: 'AI SDK Chat & Artifacts Starter',
    description:
      'Starter including the latest AI SDK version to build an advanced chat experience that leverages artifacts for assisted programming and AI-driven development workflows',
    url: 'https://aifa-v2-4.vercel.app',
    status: 'inProgress',
  },

  // NEW: Expert content & blog starter
  {
    id: 'aifa-v2-5',
    version: 'AIFA v2.5',
    title: 'Expert Content & Blog Starter',
    description:
      'Starter focused on generating professional, expert-level content and providing a full-featured blog system with SEO-friendly structure, editorial workflows, and publishing tools',
    url: 'https://aifa-v2-5.vercel.app',
    status: 'inProgress',
  },

  // NEW: External apps integration starter
  {
    id: 'aifa-v2-6',
    version: 'AIFA v2.6',
    title: 'External Apps Integration Starter',
    description:
      'Starter designed for integrating external mobile applications and websites through a robust internal API, enabling secure data exchange and cross-platform experiences',
    url: 'https://aifa-v2-6.vercel.app',
    status: 'inProgress',
  },

  // NEW: Real-estate tokenization Web3 starter
  {
    id: 'aifa-v2-7',
    version: 'AIFA v2.7',
    title: 'Real Estate Tokenization Web3 Starter',
    description:
      'Starter for building real estate asset tokenization platforms and Web3 projects, providing the foundation for smart contract integration, wallet connectivity, and on-chain asset management',
    url: 'https://aifa-v2-7.vercel.app',
    status: 'inProgress',
  },
];
