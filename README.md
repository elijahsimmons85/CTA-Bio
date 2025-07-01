    Install Xcode

    Install Xcode from the Mac App Store.

    Open Xcode once to finish setup and accept the license.

    Install Xcode Command Line Tools:
    xcode-select --install

    Accept the license in Terminal:
    sudo xcodebuild -license accept

    Install CocoaPods

Install CocoaPods (required for iOS native dependencies):
sudo gem install cocoapods

Verify installation:
pod --version

    Install Node.js and npm

Install Node.js LTS version (18.x or newer):
Download from https://nodejs.org
Or via Homebrew:
brew install node

Verify installation:
node -v
npm -v

    Install Expo CLI and EAS CLI

Install globally:
npm install -g expo-cli eas-cli

Verify:
expo --version
eas --version

    Clone the Project

Clone this repository:
git clone <your-repo-url>
cd <project-folder>

    Install JavaScript Dependencies

Install Node modules:
npm install

    Install iOS Pods

From the ios directory:
cd ios
pod install

    Open Xcode Workspace

Open the project in Xcode:
open *.xcworkspace

    Configure Signing

In Xcode:

    Select the blue project icon in the sidebar.

    Under Targets, click your app target.

    Go to Signing & Capabilities.

    Choose your Apple ID under Team.

    Ensure the Bundle Identifier is unique, for example: com.yourname.museumapp

    Connect iPad

    Plug in your iPad.

    Unlock it.

    Trust the Mac when prompted.

    Build and Run

In Xcode:

    Select your iPad in the device selector.

    Press Run (the ▶️ button) to build and install the app.