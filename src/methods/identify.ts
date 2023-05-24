import Sprig from 'react-native-userleap';
import type { IdentifyEventType, UserTraits } from '@segment/analytics-react-native';
const EMAIL_KEY = '!email';
function getAttributes(traits: UserTraits | undefined): {[key: string]: string} {
  const attributes: {[key: string]: string} = {};
  if (!traits) return attributes;
  Object.keys(traits).map((key) => {
    let modifiedKey = key;
    if (key === 'email') modifiedKey = EMAIL_KEY;
    const traitsString = traits[key]?.toString()
    if(traitsString) attributes[modifiedKey] = traitsString;
  })
  return attributes;
}
export default (event: IdentifyEventType) => {
  const userId = typeof(event.userId) === 'string' ? event.userId : undefined;
  Sprig.setVisitorAttributesAndIdentify(getAttributes(event.traits), userId, event.anonymousId);
};
