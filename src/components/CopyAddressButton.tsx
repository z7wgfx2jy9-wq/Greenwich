import React, { useState } from 'react';

interface CopyAddressButtonProps {
  address: string;
  size?: 'sm' | 'md';
  className?: string;
}

const CopyAddressButton: React.FC<CopyAddressButtonProps> = ({
  address,
  size = 'md',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const baseClasses =
    'inline-flex items-center justify-center rounded-full border border-solanaTeal/40 bg-slate-900/60 text-solanaTeal font-mono shadow-glow-teal/40 hover:bg-slate-900/80 hover:border-solanaTeal/80 transition-all duration-300';
  const sizeClasses =
    size === 'sm'
      ? 'px-3 py-1 text-[0.62rem]'
      : 'px-4 py-1.5 text-xs';

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`${baseClasses} ${sizeClasses} ${className}`}
    >
      {copied ? 'Copied' : 'Copy CA'}
    </button>
  );
};

export default CopyAddressButton;
