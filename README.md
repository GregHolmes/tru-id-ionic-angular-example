## ionic5-angular-demo Example Project

## Requirements

- A physical Android or iOS mobile phone.
- [Ionic Tooling](https://ionicframework.com/docs/react/your-first-app#install-ionic-tooling)
- [Android Studio](https://developer.android.com/studio) 
- [XCode >=12](https://developer.apple.com/xcode/resources/) 
- JDK >=8

Clone the repo via:

```bash
git clone git@github.com:tru-ID/ionic5-angular-demo.git
```

The [**tru.ID** CLI](https://github.com/tru-ID/tru-cli) will allow you to input and store your credentials for your account; it'll also allow you to create a **tru.ID** project for your application. In your Terminal, install the CLI with the following command:

```bash
npm install -g @tru_id/cli
```

Set up the CLI with your **tru.ID** credentials, which you can find within the tru.ID [console](https://developer.tru.id/console).


Create a new tru.ID project in the root directory via:

```bash
tru projects:create example --project-dir .
```

If you want to create a tru.ID project with Sandbox mode enabled, for testing, run:

```bash
tru projects:create example --mode sandbox --project-dir
```

Read more about Sandbox mode [here](https://developer.tru.id/docs/sandbox)

## Starting the project

First, start the dev server by running in the root directory,

```bash
tru server -t
```

> **Note** if you would prefer to use ngrok instead of LocalTunnel, remove the `-t` from the above command, and in another Terminal run the command `ngrok http 8080`.

This will start a local development server and create a tunnel so that your phone application can communicate with the API.

With the `LocalTunnel` URL (or ngrok URL) provided, copy this value and update the `this.baseUrl` value found within `src/app/home/home.page.ts`.

To start the Ionic app , first install dependencies via:

```bash
npm install
```

The plugin is currently on the npm registry as `@tru_id/tru-plugin-ionic-capacitor`.

The next step is to sync the project for Android. In the terminal, run:

```bash
ionic build
ionic cap sync
ionic cap copy
```

Open the Android folder in Android Studio and let Gradle sync.

To run on your physical device, enter the following command into your Terminal:

```bash
ionic capacitor run android -l --external
```

For iOS, run the following commands in the terminal:

```bash
ionic build
ionic cap add ios
ionic cap sync
ionic cap copy
```

And finally, to run the application on your physical iOS device, run the following command in your Terminal:

```bash
ionic capacitor run ios --livereload --external
```

That will generate an ios folder, open it up in XCode and launch on a physical device.

## References

- [**tru.ID** docs](https://developer.tru.id/docs)

## Meta

Distributed under the MIT License. See [LICENSE](/LICENSE)

[**tru.ID**](https://tru.id)