echo "Cleaning pods, node modules, etc......."
rm package-lock.json
rm example/yarn.lock
rm example/ios/Podfile.lock
rm -r -f example/ios/Pods
rm -r -f example/node_modules

echo "Cleaning root node modules"
rm -rf node_modules yarn.lock package-lock.json

echo "Cleaning example node modules"
cd example
rm -rf node_modules yarn.lock package-lock.json

echo "Cleaning example ios Podfile.lock"
cd ios
rm -rf Podfile.lock

echo "Installing Node modules at root........"
cd ..
cd ..
yarn install

echo "Installing Node modules in example"
cd example
yarn install

echo "pod deintegrate........"
cd ios
pod deintegrate

echo "pod repo update........"

pod repo update

echo "pod install........"
RCT_NEW_ARCH_ENABLED=1 pod install 

echo "Launching Metro........"
cd ..
#npm run start
npx react-native start --reset-cache