import { type NetworkConfig, signals, type Signer, signers } from '@apophis-sdk/core';
import cx from 'classnames';
import React, { useLayoutEffect } from 'preact/compat';

export interface WalletSelectorProps {
  networks: NetworkConfig[];
  class?: string;
  style?: React.CSSProperties;
  onSelect?(signer: Signer): void;
}

export interface WalletChoiceProps {
  children?: React.ReactNode;
  disabled?: boolean;
  class?: string;
  style?: React.CSSProperties;
  onClick?(): void;
}

export function WalletSelector({ networks, onSelect, ...props }: Readonly<WalletSelectorProps>) {
  useLayoutEffect(() => {
    signers.forEach(signer => signer.probe());
  }, []);

  return (
    <div
      {...props}
      class={cx('apophis-wallet-selector', props.class)}
    >
      {signers.map(signer => (
        <WalletSelector.Choice
          key={signer.type}
          disabled={!signer.available.value}
          class='apophis-wallet-choice'
          onClick={async () => {
            await signer.connect(networks);
            signals.signer.value = signer;
            signals.account.value = signer.account();
            signals.account.value!.bind(networks[0]); // intentionally don't await
            onSelect?.(signer);
          }}
        >
          {signer.logoURL ? <img src={signer.logoURL.toString()} alt={signer.displayName} /> : signer.displayName}
        </WalletSelector.Choice>
      ))}
    </div>
  )
}

WalletSelector.Choice = function WalletChoice({ children, disabled, onClick, ...props }: Readonly<WalletChoiceProps>) {
  return (
    <div
      {...props}
      onClick={() => {
        if (!disabled) onClick?.();
      }}
      class={cx('apophis-wallet-choice', {disabled}, props.class)}
    >
      {children}
    </div>
  );
}
