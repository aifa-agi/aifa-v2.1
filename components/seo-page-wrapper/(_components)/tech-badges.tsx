//components/seo-page-wrapper/(_components)/tech-badges.tsx


import React from 'react';

/**
 * Type definition for badge item
 */
export type BadgeItemType = {
  text: string;
};

/**
 * Props for single Badge component
 */
interface BadgeProps {
  text: string;
}

/**
 * Badge Component
 * 
 * Renders a single technology badge with primary color scheme.
 * Used for displaying tech stack, features, or category tags.
 * 
 * @param text - Text content to display in the badge
 */
function Badge({ text }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {text}
    </span>
  );
}

/**
 * Props for TechBadges component
 */
interface TechBadgesProps {
  badges: BadgeItemType[];
  show?: boolean;
}

/**
 * TechBadges Component
 * 
 * Displays a collection of technology badges in a centered, wrapped layout.
 * Features overflow protection with max height constraint.
 * 
 * @param badges - Array of badge items to display
 * @param show - Optional visibility flag, defaults to true if badges exist
 */
export function TechBadges({ badges, show = true }: TechBadgesProps) {
  // Don't render if show is false or no badges
  if (!show || badges.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center flex-wrap gap-2 px-4 mb-8 max-h-[4rem] overflow-hidden">
      {badges.map((badge, index) => (
        <Badge key={index} text={badge.text} />
      ))}
    </div>
  );
}