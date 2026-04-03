import React, { ReactElement } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return rtlRender(ui, { wrapper: AllTheProviders, ...options });
}

export * from '@testing-library/react';
export { render, userEvent };