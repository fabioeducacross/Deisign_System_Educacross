import React, { useState } from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning';
}

const variantConfig = {
  primary: {
    bg: 'rgba(115, 103, 240, 0.08)',
    border: '#7367F0',
    iconBg: '#7367F0',
  },
  secondary: {
    bg: 'rgba(128, 131, 144, 0.08)',
    border: '#808390',
    iconBg: '#808390',
  },
  success: {
    bg: 'rgba(40, 199, 111, 0.08)',
    border: '#28C76F',
    iconBg: '#28C76F',
  },
  info: {
    bg: 'rgba(0, 186, 209, 0.08)',
    border: '#00BAD1',
    iconBg: '#00BAD1',
  },
  warning: {
    bg: 'rgba(255, 159, 67, 0.08)',
    border: '#FF9F43',
    iconBg: '#FF9F43',
  },
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  link,
  variant = 'primary',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = variantConfig[variant];

  const cardStyle: React.CSSProperties = {
    background: config.bg,
    border: `2px solid ${isHovered ? config.border : 'transparent'}`,
    borderRadius: '12px',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
    cursor: link ? 'pointer' : 'default',
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: isHovered
      ? '0 8px 24px rgba(0, 0, 0, 0.12)'
      : '0 2px 8px rgba(0, 0, 0, 0.04)',
  };

  const iconContainerStyle: React.CSSProperties = {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: config.iconBg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
    color: 'white',
    fontSize: '1.5rem',
  };

  const content = (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={iconContainerStyle}>{icon}</div>
      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          margin: '0 0 0.5rem 0',
          color: 'var(--color-gray-900, #1F2937)',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '0.95rem',
          fontWeight: '400',
          margin: 0,
          color: 'var(--color-gray-600, #6B7280)',
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
      {link && (
        <div
          style={{
            marginTop: '1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: config.iconBg,
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          Saiba mais →
        </div>
      )}
    </div>
  );

  return link ? (
    <a href={link} style={{ textDecoration: 'none' }}>
      {content}
    </a>
  ) : (
    content
  );
};
