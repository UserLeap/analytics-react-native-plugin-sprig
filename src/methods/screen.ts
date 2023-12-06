import Sprig from "react-native-userleap";
import type { ScreenEventType, JsonMap } from "@segment/analytics-react-native";

function getProperties(properties: JsonMap): {[key: string]: any} {
  const propertiesMap: {[key: string]: any} = {};
  if (!properties) return propertiesMap;
  Object.keys(properties).map((key) => {
    propertiesMap[key] = properties[key]?.valueOf()
  })
  return propertiesMap;
}

export default (event: ScreenEventType) => {
  if (typeof(event.name) !== 'string') return;
  const userId = typeof(event.userId) === 'string' ? event.userId : undefined;
  if (Object.keys(event.properties!).length) {
    Sprig.trackWithProperties(
      event.name,
      userId,
      event.anonymousId,
      getProperties(event.properties!),
      (state: string) => {
        if (state === "READY") {
          Sprig.presentSurvey();
        }
      }
    );
  } else {
    Sprig.trackIdentifyAndPresent(
      event.name,
      userId,
      event.anonymousId
    );
  }
};
