echo "Cleaning pods, node modules, etc......."
bash cleanForRebuild.sh

echo "Cleaning root node modules"
rm -rf node_modules yarn.lock package-lock.json

echo "Cleaning example node modules"
cd example
rm -rf node_modules yarn.lock package-lock.json

echo "Cleaning example ios Podfile.lock, Pods and Xcode DerivedData"
cd ios
rm -rf Pods Podfile.lock build ~/Library/Developer/Xcode/DerivedData/*

echo "Installing Node modules at root........"
cd ..
cd ..
yarn install

echo "Installing Node modules in example"
cd example
yarn install

echo "pod cache clean........"
cd ios
pod cache clean --all

echo "pod deintegrate........"
pod deintegrate

echo "pod repo update........"
pod repo update

echo "pod install........"
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install --repo-update 

echo "Launching Metro........"
cd ..
#npm run start
npx react-native start --reset-cache
#npx react-native run-ios