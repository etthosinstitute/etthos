import React from "react";

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon = ({ name, className = "", size = 24 }: IconProps) => {
  return (
    <span className={`inline-block ${className}`} style={{ fontSize: size }}>
      {name}
    </span>
  );
};
