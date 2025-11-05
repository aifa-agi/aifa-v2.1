// aifa-v2/config/content/content-data.ts

import { MenuCategory } from "@/types/menu-types";

export const contentData = {
  categories: [
  {
    "title": "home",
    "pages": [
      {
        "id": "ks7eqcf6z1fhes1lwiwz75zn",
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
        "title": "USAUTO!5555",
        "description": "AI generator",
        "images": [
         ],
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
    "order": 2
  },
  {
    "title": "admin",
    "pages": [
      {
        "id": "r70rhidyb8w0o8ikzuuu8nil",
        "title": "Vercel deploy",
        "href": "/admin/vercel-deploy",
        "roles": [
          "admin"
        ],
        "hasBadge": false,
        "type": "blog",
        "isPublished": false,
        "isAddedToPrompt": false,
        "isVectorConnected": false,
        "isChatSynchronized": false,
        "order": 1
      }
    ],
    "order": 3
  }
]
} as { categories: MenuCategory[] };

export type contentData = typeof contentData;

export const lastUpdated = "2025-10-28T16:19:10.614Z";
export const generatedBy = "menu-persist-api";
