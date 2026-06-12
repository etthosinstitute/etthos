import React from "react";

interface AvatarProps {
  imageUrl?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Avatar = ({
  imageUrl,
  alt = "Avatar",
  size = "md",
  className = "",
}: AvatarProps) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`${sizes[size]} rounded-full border-2 border-white bg-gray-200 bg-cover bg-center ${className}`}
      style={imageUrl ? { backgroundImage: `url('${imageUrl}')` } : {}}
      role="img"
      aria-label={alt}
    />
  );
};

interface AvatarGroupProps {
  avatars: Array<{ imageUrl?: string; alt?: string }>;
  max?: number;
  size?: "sm" | "md" | "lg";
}

export const AvatarGroup = ({
  avatars,
  max = 4,
  size = "md",
}: AvatarGroupProps) => {
  const displayAvatars = avatars.slice(0, max - 1);
  const remaining = avatars.length - displayAvatars.length;

  return (
    <div className="flex -space-x-3">
      {displayAvatars.map((avatar, index) => (
        <Avatar key={index} {...avatar} size={size} />
      ))}
      {remaining > 0 && (
        <div
          className={`${size === "sm" ? "w-8 h-8" : size === "md" ? "w-10 h-10" : "w-12 h-12"} rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600`}
        >
          +{remaining > 999 ? "999+" : `${remaining}k`}
        </div>
      )}
    </div>
  );
};
