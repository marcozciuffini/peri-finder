import { requireNativeView } from 'expo';
import * as React from 'react';

import { AppVersionViewProps } from './AppVersion.types';

const NativeView: React.ComponentType<AppVersionViewProps> =
  requireNativeView('AppVersion');

export default function AppVersionView(props: AppVersionViewProps) {
  return <NativeView {...props} />;
}
