import AppVersionModule from './src/AppVersionModule';
export * from './src/AppVersion.types';

export function getVersion(): string {
  return AppVersionModule.getVersion();
}
