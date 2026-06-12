import React from "react";

export function FormatJournalName({ text }: { text: string }) {
  if (!text) return null;
  const parts = text.split(
    /Etthos Journal [Oo]f Health, Behavior and Applied Psychology/,
  );
  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <>
              Etthos Journal <span className="lowercase text-[0.85em]">of</span>{" "}
              Health, Behavior and Applied Psychology
            </>
          )}
        </React.Fragment>
      ))}
    </>
  );
}
