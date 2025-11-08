// aifa-v2/config/content/content-data.ts

import { MenuCategory } from "@/types/menu-types";

export const contentData = {
  categories: [
    {
      "title": "Home",
      "pages": [
        {
          "id": "ks7eqcf6z1fhes1lwiwz75zn2",
          "href": "/home",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "homePage",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 1,
          "title": "Home",
          "description": "Welcome to our AI-powered platform. Discover innovative solutions and cutting-edge technology.",
          "images": [],
          "keywords": [
            "Ai"
          ]
        },
        {
          "id": "blog-001-ai-chat",
          "href": "/chat",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "blog",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 1,
          "title": "AI Chat",
          "description": "Try Chat with Ai",
          "images": [],
          "keywords": [
            "AI",
            "trends",
            "technology",
            "machine learning"
          ]
        },
        {
          "id": "ks7eqcf6z1fhes1lwiwz75zn",
          "href": "/about",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "homePage",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 2,
          "title": "About us",
          "description": "Learn about our company mission, vision, and commitment to delivering exceptional AI services worldwide.",
          "images": [],
          "keywords": [
            "Ai"
          ]
        },
        {
          "id": "ks7eqcf6z1fhes1lwiwz75z2",
          "href": "/team",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "homePage",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 3,
          "title": "Our team",
          "description": "Meet our talented team of experts dedicated to building next-generation artificial intelligence solutions.",
          "images": [],
          "keywords": [
            "Ai"
          ]
        }
      ],
      "order": 1
    },
    
    {
      "title": "Blog",
      "href": "/blog",
      "pages": [
        {
          "id": "blog-001-ai-trends",
          "href": "/blog/ai-trends-2025",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "blog",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 1,
          "title": "AI Trends 2025",
          "description": "Explore the latest artificial intelligence trends and breakthroughs shaping the future of technology.",
          "images": [],
          "keywords": [
            "AI",
            "trends",
            "technology",
            "machine learning"
          ]
        },
        {
          "id": "blog-002-neural-networks",
          "href": "/blog/neural-networks-guide",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "blog",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 2,
          "title": "Neural Networks Guide",
          "description": "A comprehensive guide to understanding neural networks and their applications in modern AI systems.",
          "images": [],
          "keywords": [
            "neural networks",
            "deep learning",
            "AI",
            "guide"
          ]
        },
        {
          "id": "blog-003-nlp-advances",
          "href": "/blog/nlp-advances",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "blog",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 3,
          "title": "NLP Advances",
          "description": "Discover recent advances in natural language processing and how they revolutionize human-computer interaction.",
          "images": [],
          "keywords": [
            "NLP",
            "natural language processing",
            "AI",
            "language models"
          ]
        },
        {
          "id": "blog-004-ai-ethics",
          "href": "/blog/ai-ethics",
          "roles": [
            "guest"
          ],
          "hasBadge": false,
          "type": "blog",
          "isPublished": true,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 4,
          "title": "AI Ethics Framework",
          "description": "Understanding ethical considerations and responsible development practices in artificial intelligence systems.",
          "images": [],
          "keywords": [
            "ethics",
            "AI",
            "responsibility",
            "governance"
          ]
        }
      ],
      "order": 2
    },
    {
  "title": "News",
  "href": "/news",
  "pages": [
    {
      "id": "news-001-breakthrough",
      "href": "/news/ai-breakthrough-announcement",
      "roles": ["guest"],
      "hasBadge": true,
      "type": "news",
      "isPublished": true,
      "isAddedToPrompt": false,
      "isVectorConnected": false,
      "isChatSynchronized": false,
      "order": 1,
      "title": "AI Breakthrough Announcement",
      "description": "Major breakthrough in quantum computing accelerates artificial intelligence model training and deployment capabilities."
    },
    {
      "id": "news-002-partnership",
      "href": "/news/strategic-partnership",
      "roles": ["guest"],
      "hasBadge": false,
      "type": "news",
      "isPublished": true,
      "isAddedToPrompt": false,
      "isVectorConnected": false,
      "isChatSynchronized": false,
      "order": 2,
      "title": "Strategic Partnership",
      "description": "Announcing our strategic partnership with leading technology companies to advance AI research and innovation."
    },
    {
      "id": "news-003-funding-round",
      "href": "/news/funding-round-series-b",
      "roles": ["guest"],
      "hasBadge": true,
      "type": "news",
      "isPublished": true,
      "isAddedToPrompt": false,
      "isVectorConnected": false,
      "isChatSynchronized": false,
      "order": 3,
      "title": "Series B Funding Round",
      "description": "Successfully closed Series B funding round raising capital for expanding AI platform development and market reach."
    },
    {
      "id": "news-004-product-launch",
      "href": "/news/new-ai-product-launch",
      "roles": ["guest"],
      "hasBadge": true,
      "type": "news",
      "isPublished": true,
      "isAddedToPrompt": false,
      "isVectorConnected": false,
      "isChatSynchronized": false,
      "order": 4,
      "title": "New AI Product Launch",
      "description": "Introducing our latest AI-powered product designed to revolutionize enterprise workflow automation and productivity."
    },
    {
      "id": "news-005-conference-keynote",
      "href": "/news/keynote-speech-tech-summit",
      "roles": ["guest"],
      "hasBadge": true,
      "type": "news",
      "isPublished": true,
      "isAddedToPrompt": false,
      "isVectorConnected": false,
      "isChatSynchronized": false,
      "order": 5,
      "title": "Keynote Speech at Tech Summit",
      "description": "CEO delivers keynote address on the future of artificial intelligence at annual technology summit addressing industry trends."
    },
    {
      "id": "news-006-ai-ethics",
      "href": "/news/responsible-ai-initiative",
      "roles": ["guest"],
      "hasBadge": false,
      "type": "news",
      "isPublished": true,
      "isAddedToPrompt": false,
      "isVectorConnected": false,
      "isChatSynchronized": false,
      "order": 6,
      "title": "Responsible AI Initiative",
      "description": "Launching comprehensive initiative focused on ethical AI development and responsible deployment practices across all systems."
    },
    {
      "id": "news-007-award-recognition",
      "href": "/news/innovation-award-2025",
      "roles": ["guest"],
      "hasBadge": true,
      "type": "news",
      "isPublished": true,
      "isAddedToPrompt": false,
      "isVectorConnected": false,
      "isChatSynchronized": false,
      "order": 7,
      "title": "Innovation Award Recognition",
      "description": "Received prestigious innovation award recognizing outstanding contributions to artificial intelligence research and development sector."
    },
    {
      "id": "news-008-global-expansion",
      "href": "/news/market-expansion-asia",
      "roles": ["guest"],
      "hasBadge": false,
      "type": "news",
      "isPublished": true,
      "isAddedToPrompt": false,
      "isVectorConnected": false,
      "isChatSynchronized": false,
      "order": 8,
      "title": "Global Market Expansion",
      "description": "Expanding operations to Asian markets with establishment of regional headquarters and local research and development centers."
    },
    {
      "id": "news-009-research-paper",
      "href": "/news/research-paper-publication",
      "roles": ["guest"],
      "hasBadge": true,
      "type": "news",
      "isPublished": true,
      "isAddedToPrompt": false,
      "isVectorConnected": false,
      "isChatSynchronized": false,
      "order": 9,
      "title": "Research Paper Published",
      "description": "Publishing groundbreaking research paper on neural network optimization techniques in leading academic journal."
    },
    {
      "id": "news-010-customer-milestone",
      "href": "/news/one-million-users",
      "roles": ["guest"],
      "hasBadge": true,
      "type": "news",
      "isPublished": true,
      "isAddedToPrompt": false,
      "isVectorConnected": false,
      "isChatSynchronized": false,
      "order": 10,
      "title": "One Million Users Milestone",
      "description": "Celebrating achievement of one million active users on our AI platform demonstrating strong market adoption and growth."
    },
    {
      "id": "news-011-sustainability",
      "href": "/news/carbon-neutral-commitment",
      "roles": ["guest"],
      "hasBadge": false,
      "type": "news",
      "isPublished": true,
      "isAddedToPrompt": false,
      "isVectorConnected": false,
      "isChatSynchronized": false,
      "order": 11,
      "title": "Carbon Neutral Commitment",
      "description": "Committing to carbon neutrality by 2030 with comprehensive sustainability program for all AI infrastructure operations."
    }
  ],
  "order": 3
}
,
    {
      "title": "Dashboard",
      "pages": [
        {
          "id": "r70rhidyb8w0o8ikzuuu8nil",
          "title": "Dashboard",
          "description": "Manage your account, monitor analytics, and access all administrative tools from one centralized hub.",
          "href": "/dashboard",
          "roles": [
            "admin"
          ],
          "hasBadge": false,
          "type": "dashboard",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 1
        },
        {
          "id": "r70rhidyb8w0o8ikzuuu8ni3l",
          "title": "Users",
          "description": "View, manage, and control user accounts with comprehensive administration and role-based access permissions.",
          "href": "/dashboard/users",
          "roles": [
            "admin"
          ],
          "hasBadge": false,
          "type": "dashboard",
          "isPublished": false,
          "isAddedToPrompt": false,
          "isVectorConnected": false,
          "isChatSynchronized": false,
          "order": 2
        }
      ],
      "order": 4
    }
  ]
} as { categories: MenuCategory[] };

export type contentData = typeof contentData;

export const lastUpdated = new Date().toISOString();
export const generatedBy = "menu-persist-api";
