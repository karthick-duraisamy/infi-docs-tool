import { ComponentType, SVGProps } from 'react';

type SvgRendererProps = {
  component: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
};

const SvgRenderer = ({ component: Component, className = '' }: SvgRendererProps) => {
  return <Component className={className} />;
};

export default SvgRenderer;
