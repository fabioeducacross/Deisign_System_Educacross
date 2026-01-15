import React, { useState } from 'react';

interface ColorToken {
  name: string;
  value: string;
  token: string;
}

interface ColorPaletteProps {
  title: string;
  colors: ColorToken[];
  columns?: number;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({
  title,
  colors,
  columns = 5,
}) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, token: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: 'var(--color-gray-900, #1F2937)',
        }}
      >
        {title}
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: '1rem',
        }}
      >
        {colors.map((color) => (
          <div
            key={color.token}
            style={{
              borderRadius: '8px',
              border: '1px solid var(--color-gray-300, #E1E1E8)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: 'white',
            }}
            onClick={() => copyToClipboard(color.token, color.token)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Color Swatch */}
            <div
              style={{
                height: '80px',
                backgroundColor: color.value,
                position: 'relative',
              }}
            >
              {copiedToken === color.token && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  ✓ Copiado!
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ padding: '0.75rem' }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--color-gray-900, #1F2937)',
                  marginBottom: '0.25rem',
                }}
              >
                {color.name}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  color: 'var(--color-gray-600, #6B7280)',
                  fontFamily: 'JetBrains Mono, monospace',
                  marginBottom: '0.25rem',
                }}
              >
                {color.value}
              </div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-primary-600, #675DD8)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {color.token}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
