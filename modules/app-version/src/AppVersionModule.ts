import { NativeModule, requireNativeModule } from 'expo';

import { AppVersionModuleEvents } from './AppVersion.types';

declare class AppVersionModule extends NativeModule<AppVersionModuleEvents> {
  getVersion(): string;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<AppVersionModule>('AppVersion');
