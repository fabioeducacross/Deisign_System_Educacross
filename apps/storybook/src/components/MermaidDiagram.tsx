import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
}

mermaid.initialize({ 
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true
  }
});

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, caption }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = chart;
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        margin: '2rem 0',
        padding: '1rem',
        backgroundColor: 'var(--color-neutral-50)',
        border: '1px solid var(--color-neutral-200)',
        borderRadius: '8px',
        overflowX: 'auto'
      }}
    >
      <div
        ref={mermaidRef}
        className="mermaid"
        style={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '300px'
        }}
      />
      {caption && (
        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--color-neutral-600)',
            marginTop: '0.5rem',
            fontStyle: 'italic',
            textAlign: 'center'
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
};
