import * as React from 'react';

import { AppVersionViewProps } from './AppVersion.types';

export default function AppVersionView(props: AppVersionViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
