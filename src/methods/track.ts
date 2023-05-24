import Sprig from "react-native-userleap";
import type { TrackEventType, JsonMap } from "@segment/analytics-react-native";
const SIGN_OUT_EVENT = "Signed Out";

function getProperties(properties: JsonMap): {[key: string]: any} {
  const propertiesMap: {[key: string]: any} = {};
  if (!properties) return propertiesMap;
  Object.keys(properties).map((key) => {
    propertiesMap[key] = properties[key]?.valueOf()
  })
  return propertiesMap;
}

export default (event: TrackEventType) => {
  if (typeof(event.event) !== 'string') return;
  if (event.event === SIGN_OUT_EVENT) {
    Sprig.logout();
  } else {
    const userId = typeof(event.userId) === 'string' ? event.userId : undefined;
    if (Object.keys(event.properties!).length) {
      Sprig.trackWithProperties(
        event.event,
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
        event.event,
        userId,
        event.anonymousId
      );
    }
  }
};
