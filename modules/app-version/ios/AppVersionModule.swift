import ExpoModulesCore

public class AppVersionModule: Module {
  public func definition() -> ModuleDefinition {
    Name("AppVersion")

    Function("getVersion") {
      return Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "unknown"
    }
  }
}
