import React, { useState } from 'react';

interface TokenItem {
  name: string;
  value: string;
  token: string;
  preview?: React.ReactNode;
}

interface TokenShowcaseProps {
  title: string;
  category: 'spacing' | 'radius' | 'typography';
  tokens: TokenItem[];
}

export const TokenShowcase: React.FC<TokenShowcaseProps> = ({
  title,
  category,
  tokens,
}) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, token: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const renderPreview = (token: TokenItem) => {
    if (token.preview) return token.preview;

    switch (category) {
      case 'spacing':
        return (
          <div
            style={{
              height: token.value,
              width: token.value,
              backgroundColor: '#7367F0',
              borderRadius: '4px',
            }}
          />
        );
      case 'radius':
        return (
          <div
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#7367F0',
              borderRadius: token.value,
            }}
          />
        );
      case 'typography':
        return (
          <span style={{ fontSize: token.value, fontWeight: 500 }}>
            Aa
          </span>
        );
      default:
        return null;
    }
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {tokens.map((token) => (
          <div
            key={token.token}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid var(--color-gray-300, #E1E1E8)',
              background: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
            }}
            onClick={() => copyToClipboard(token.token, token.token)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-gray-100, #F5F5F7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
            }}
          >
            {/* Preview */}
            <div
              style={{
                minWidth: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80px',
              }}
            >
              {renderPreview(token)}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: 'var(--color-gray-900, #1F2937)',
                  marginBottom: '0.25rem',
                }}
              >
                {token.name}
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'var(--color-primary-600, #675DD8)',
                  fontFamily: 'JetBrains Mono, monospace',
                  marginBottom: '0.25rem',
                }}
              >
                {token.token}
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-gray-600, #6B7280)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {token.value}
              </div>
            </div>

            {/* Copy feedback */}
            {copiedToken === token.token && (
              <div
                style={{
                  position: 'absolute',
                  right: '1rem',
                  background: '#28C76F',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}
              >
                ✓ Copiado!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
