/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import type { Node } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from "react-native";

import {
  Colors,
  Header,
  LearnMoreLinks,
} from "react-native/Libraries/NewAppScreen";
import { createClient } from "@segment/analytics-react-native";
import { SprigPlugin } from "@sprig-technologies/analytics-react-native-plugin-sprig";

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === "dark";
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === "dark";

  const segmentClient = createClient({
    writeKey: 'hN2Qw26IJPLouXrHDIy3BoaGwFSV6kUr',
    trackAppLifecycleEvents: true,
    defaultSettings: true,
  });
  const plugin = new SprigPlugin();
  segmentClient.add({ plugin: plugin });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Track</Text>
              <View style={styles.sectionDescription}>
                <TouchableOpacity
                  onPress={() => {
                    segmentClient.track("mobiletext");
                  }}
                >
                  <Text>Send event</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Track</Text>
              <View style={styles.sectionDescription}>
                <TouchableOpacity
                  onPress={() => {
                    segmentClient.track("YOUR_SPRIG_SURVEY_EVENT", {
                      isFreePlan: false,
                      age: 45,
                      planName: "Premium",
                    });
                  }}
                >
                  <Text>Send track event with properties</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Screen</Text>
              <View style={styles.sectionDescription}>
                <TouchableOpacity
                  onPress={() => {
                    segmentClient.screen("React Native Segment Screen", {
                      segmentActionsReactNative: true,
                      deviceType: "reactNative"
                    });
                  }}
                >
                  <Text>Send screen event with properties</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Identify</Text>
              <View style={styles.sectionDescription}>
                <TouchableOpacity
                  onPress={() => {
                    segmentClient.identify("YOUR_USER_ID", {
                      test_attribute: "1",
                      email: "abc@test.com",
                    });
                  }}
                >
                  <Text>Send event</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
