import { STATUS_CONFIG } from '@/lib/constants';

const Badge = ({ status }) => {
  const config = STATUS_CONFIG[status];
  
  if (!config) return null;

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${config.color}
    `}>
      <div className={`w-2 h-2 rounded-full mr-1.5 ${config.dotColor}`} />
      {status}
    </span>
  );
};

export default Badge;