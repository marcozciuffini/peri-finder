package expo.modules.appversion

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class AppVersionModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("AppVersion")

    Function("getVersion") {
      appContext.reactContext?.packageManager
        ?.getPackageInfo(appContext.reactContext!!.packageName, 0)
        ?.versionName ?: "unknown"
    }
  }
}
