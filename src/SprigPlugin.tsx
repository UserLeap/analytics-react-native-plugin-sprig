import {
  DestinationPlugin,
  IdentifyEventType,
  PluginType,
  TrackEventType,
  UpdateType,
  SegmentAPISettings,
  ScreenEventType,
} from '@segment/analytics-react-native';
import type { SegmentSprigSettings } from './types';
import Sprig from 'react-native-userleap';
import identify from './methods/identify';
import track from './methods/track';
import screen from './methods/screen';

export class SprigPlugin extends DestinationPlugin {
  type = PluginType.destination;
  key = 'Sprig (Actions)';

  private hasInitialized: boolean = false;

  update(settings: SegmentAPISettings, _: UpdateType) {
    const sprigSettings = settings.integrations[
      this.key
    ] as SegmentSprigSettings;

    if (sprigSettings === undefined) {
      return;
    }

    if (!this.hasInitialized && sprigSettings.envId) {
      Sprig.configure(sprigSettings.envId, { source: 'react-native-segment' });
      this.hasInitialized = true;
    }
  }

  identify(event: IdentifyEventType) {
    identify(event);
    return event;
  }

  track(event: TrackEventType) {
    track(event);
    return event;
  }

  screen(event: ScreenEventType) {
    screen(event);
    return event
  }
  
  reset() {
    Sprig.logout()
  }
}
