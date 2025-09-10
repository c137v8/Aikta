import 'dotenv/config';

export default {
  expo: {
    name: "Aikta",
    slug: "Aikta",
    icon: "./assets/images/Aiktadark.png",       // App icon
  splash: {
    image: "./assets/images/Aiktadark.png",  // Splash screen image
    resizeMode: "contain",         // or "cover"
    backgroundColor: "#ffffff",    // background while loading
  },
    extra: {
    //  apiUrl: process.env.API_URL,
      //apiKey: process.env.API_KEY,
    },
  },
};
