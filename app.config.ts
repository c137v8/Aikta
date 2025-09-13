import 'dotenv/config';

export default {
  expo: {
    name: "Aikta",
    slug: "Aikta",
    icon: "./assets/images/Aiktadark.png",

    splash: {
      image: "./assets/images/Aiktadark.png",
      resizeMode: "contain",
      backgroundColor: "#000000ff",
    },

    android: {
      package: "com.moodmachine.aikta",  // <-- change this to your unique package name
    },

    ios: {
      bundleIdentifier: "com.moodmachine.aikta",  // iOS equivalent (optional but recommended)
    },

    extra: {
      apiUrl: process.env.API_URL,
      apiKey: process.env.API_KEY,
      eas: {
        projectId: "5ea176a3-74f4-4e17-bcca-29d6dcecd76e",
      },
    },
  },
};
