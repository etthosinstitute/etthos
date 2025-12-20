import React from "react";
import { logo } from "@etthos/assets";

type LogoAsset = string | { src?: string };

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo = ({ className = "", width = 140, height = 36 }: LogoProps) => {
  const asset = logo as LogoAsset;
  const logoSrc = typeof asset === "string" ? asset : asset?.src ?? "";

  return (
    <img
      src={logoSrc}
      alt="Etthos logo"
      width={width}
      height={height}
      style={{ width, height }}
      className={`object-contain ${className}`}
      loading="lazy"
    />
  );
};
