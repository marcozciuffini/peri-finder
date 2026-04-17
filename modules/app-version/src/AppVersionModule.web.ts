import { NativeModule, registerWebModule } from 'expo';

type AppVersionModuleEvents = {}

class AppVersionModule extends NativeModule<AppVersionModuleEvents> {
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(AppVersionModule, 'AppVersionModule');
