import React from 'react';
import { ComponentType, SVGProps } from 'react';
import SvgRenderer from './SvgRenderer';

type CardProps = {
  svg: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  className?: string;
};

const Card: React.FC<CardProps> = ({ svg, title, description, className = '' }) => {
  return (
    <div
      className={className}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={{ marginBottom: '16px' }}>
        <SvgRenderer component={svg} className="svg-icon" />
      </div>
      <h3 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>{title}</h3>
      <p style={{ color: '#555', fontSize: '0.95rem' }}>{description}</p>
    </div>
  );
};

export default Card;
