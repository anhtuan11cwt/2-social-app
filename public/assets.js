import { Home, MessageCircle, Search, UserIcon, Users } from "lucide-react";
import bgImage from "./bgImage.png";
import group_users from "./group_users.png";
import logo from "./logo.svg";
import sample_cover from "./sample_cover.jpg";
import sample_profile from "./sample_profile.jpg";
import sponsored_img from "./sponsored_img.png";

export const assets = {
  bgImage,
  group_users,
  logo,
  sample_cover,
  sample_profile,
  sponsored_img,
};

export const menuItemsData = [
  { Icon: Home, label: "Feed", to: "/" },
  { Icon: MessageCircle, label: "Messages", to: "/messages" },
  { Icon: Users, label: "Connections", to: "/connections" },
  { Icon: Search, label: "Discover", to: "/discover" },
  { Icon: UserIcon, label: "Profile", to: "/profile" },
];

export const dummyUserData = {
  _id: "user_2zdFoZib5lNr614LgkONdD8WG32",
  bio: "🌍 Dreamer | 📚 Learner | 🚀 Doer\r\nExploring life one step at a time.\r\n✨ Staying curious. Creating with purpose.",
  connections: ["user_2", "user_3"],
  cover_photo: sample_cover,
  createdAt: "2025-07-09T09:26:59.231Z",
  email: "admin@example.com",
  followers: ["user_2", "user_3"],
  following: ["user_2", "user_3"],
  full_name: "John Warren",
  is_verified: true,
  location: "New York, NY",
  posts: [],
  profile_picture: sample_profile,
  updatedAt: "2025-07-21T06:56:50.017Z",
  username: "john_warren",
};

const dummyUser2Data = {
  ...dummyUserData,
  _id: "user_2",
  full_name: "Richard Hendricks",
  profile_picture:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
  username: "Richard Hendricks",
};

const dummyUser3Data = {
  ...dummyUserData,
  _id: "user_3",
  full_name: "Alexa james",
  profile_picture:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
  username: "alexa_james",
};

export const dummyStoriesData = [
  {
    _id: "68833d466e4b42b685068860",
    background_color: "#4f46e5",
    content:
      "📌 This isn't the story I wanted to tell… not yet. But if you're reading this, know that something interesting is in motion 🔄. The next post will make more sense 🧩.",
    createdAt: "2025-07-25T08:16:06.958Z",
    media_type: "text",
    media_url: "",
    updatedAt: "2025-07-25T08:16:06.958Z",
    user: dummyUserData,
  },
  {
    _id: "688340046e4b42b685068a73",
    background_color: "#4f46e5",
    content: "",
    createdAt: "2025-07-25T08:27:48.134Z",
    media_type: "image",
    media_url:
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    updatedAt: "2025-07-25T08:27:48.134Z",
    user: dummyUserData,
  },
  {
    _id: "68833fe96e4b42b685068a5e",
    background_color: "#4f46e5",
    content: "",
    createdAt: "2025-07-25T08:27:21.289Z",
    media_type: "video",
    media_url:
      "https://videos.pexels.com/video-files/14447442/14447442-hd_1080_1920_30fps.mp4",
    updatedAt: "2025-07-25T08:27:21.289Z",
    user: dummyUserData,
  },
  {
    _id: "68833e136e4b42b685068937",
    background_color: "#4f46e5",
    content: "",
    createdAt: "2025-07-25T08:19:31.080Z",
    media_type: "image",
    media_url:
      "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg",
    updatedAt: "2025-07-25T08:19:31.080Z",
    user: dummyUserData,
  },
  {
    _id: "68833d706e4b42b685068875",
    background_color: "#4f46e5",
    content:
      "🤫 Not every moment needs to be loud. Sometimes, the best things happen in silence — in drafts 📝, in progress 🧪, in planning 📊. That's where I am right now.",
    createdAt: "2025-07-25T08:16:48.617Z",
    media_type: "text",
    media_url: "",
    updatedAt: "2025-07-25T08:16:48.617Z",
    user: dummyUserData,
  },
  {
    _id: "68833c9e6e4b42b6850687e7",
    background_color: "#4f46e5",
    content:
      "✨ Something meaningful is on the way. I'm working behind the scenes 🛠️ to bring it all together. This space is just the beginning 🌱. Stay tuned 👀.",
    createdAt: "2025-07-25T08:13:18.111Z",
    media_type: "text",
    media_url: "",
    updatedAt: "2025-07-25T08:13:18.111Z",
    user: dummyUserData,
  },
];

export const dummyPostsData = [
  {
    _id: "68773e977db16954a783839c",
    content:
      "We're a small #team with a big vision — working day and night to turn dreams into products, and #products into something people love.",
    createdAt: "2025-07-16T05:54:31.191Z",
    image_urls: [
      "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg",
    ],
    likes_count: [],
    post_type: "text_with_image",
    updatedAt: "2025-07-16T05:54:31.191Z",
    user: dummyUserData,
  },
  {
    _id: "686e6d0407845749500c24cd",
    content:
      "Unlock your potential—every small step counts. Stay consistent, stay focused, and trust the process. Growth takes time, but every day is a new chance to be better than yesterday. 🌱✨\r\n\r\n#Motivation #GrowthMindset #DailyInspiration #StayFocused #LevelUp #PositiveVibes #KeepGoing #SelfImprovement #MindsetMatters #SuccessJourney",
    createdAt: "2025-07-09T13:22:12.601Z",
    image_urls: [],
    likes_count: [],
    post_type: "text",
    updatedAt: "2025-07-09T13:22:12.601Z",
    user: dummyUserData,
  },
  {
    _id: "686e6b21de877d29cf02e2a7",
    content:
      "This is a sample paragraph with some #hashtags like #socialmedia and #marketing. Let's find them!",
    createdAt: "2025-07-09T13:14:09.144Z",
    image_urls: [],
    likes_count: [],
    post_type: "text",
    updatedAt: "2025-07-09T13:14:09.144Z",
    user: dummyUserData,
  },
  {
    _id: "686e3e47ba0cf0fecba19947",
    content: "",
    createdAt: "2025-07-09T10:02:47.213Z",
    image_urls: [
      "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg",
    ],
    likes_count: ["user_2zdJbcAqiOX9jq2DIueBRQn0lMt"],
    post_type: "image",
    updatedAt: "2025-07-09T10:09:37.075Z",
    user: dummyUserData,
  },
  {
    _id: "686e39e86e0585e9e2e58dd3",
    content: "Finally , got the car !",
    createdAt: "2025-07-09T09:44:08.626Z",
    image_urls: [
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
    ],
    likes_count: [],
    post_type: "text_with_image",
    updatedAt: "2025-07-09T09:44:08.626Z",
    user: dummyUserData,
  },
  {
    _id: "686e361389841ba9f2633201",
    content: "Hello, Everyone this is my first Post",
    createdAt: "2025-07-09T09:27:47.529Z",
    image_urls: [],
    likes_count: [],
    post_type: "text",
    updatedAt: "2025-07-09T09:27:47.529Z",
    user: dummyUserData,
  },
];

export const dummyRecentMessagesData = [
  {
    _id: "68833af618623d2de81b5381",
    createdAt: "2025-07-25T08:06:14.436Z",
    from_user_id: dummyUser2Data,
    media_url: "",
    message_type: "text",
    seen: true,
    text: "I seen your profile",
    to_user_id: dummyUserData,
    updatedAt: "2025-07-25T08:47:47.768Z",
  },
  {
    _id: "6878cc3c17a54e4d3748012f",
    createdAt: "2025-07-17T10:11:08.437Z",
    from_user_id: dummyUserData,
    media_url: "",
    message_type: "text",
    seen: true,
    text: "This is a Samsung Tablet",
    to_user_id: dummyUserData,
    updatedAt: "2025-07-25T08:07:11.893Z",
  },
  {
    _id: "686fb66c7f0dcbff63b239e7",
    createdAt: "2025-07-10T12:47:40.510Z",
    from_user_id: dummyUser3Data,
    media_url: "",
    message_type: "text",
    seen: false,
    text: "how are you",
    to_user_id: dummyUserData,
    updatedAt: "2025-07-10T12:47:40.510Z",
  },
];

export const dummyMessagesData = [
  {
    _id: "6878cc3217a54e4d37480122",
    createdAt: "2025-07-17T10:10:58.524Z",
    from_user_id: "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
    media_url:
      "https://images.pexels.com/photos/106341/pexels-photo-106341.jpeg",
    message_type: "image",
    seen: true,
    text: "",
    to_user_id: "user_2zdFoZib5lNr614LgkONdD8WG32",
    updatedAt: "2025-07-25T10:43:50.346Z",
  },
  {
    _id: "6878cc3c17a54e4d3748012f",
    createdAt: "2025-07-17T10:11:08.437Z",
    from_user_id: "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
    media_url: "",
    message_type: "text",
    seen: true,
    text: "This is a Samsung Tablet",
    to_user_id: "user_2zdFoZib5lNr614LgkONdD8WG32",
    updatedAt: "2025-07-25T10:43:50.346Z",
  },
  {
    _id: "68835ffc6e4b42b685069def",
    createdAt: "2025-07-25T10:44:12.753Z",
    from_user_id: "user_2zdFoZib5lNr614LgkONdD8WG32",
    media_url: "",
    message_type: "text",
    seen: false,
    text: "yah , this tablet is good",
    to_user_id: "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
    updatedAt: "2025-07-25T10:44:12.753Z",
  },
  {
    _id: "6878cc2817a54e4d3748010c",
    createdAt: "2025-08-17T10:10:48.956Z",
    from_user_id: "user_2zdFoZib5lNr614LgkONdD8WG32",
    media_url: "",
    message_type: "text",
    seen: true,
    text: "you can purchase it from amazon",
    to_user_id: "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
    updatedAt: "2025-08-25T10:43:50.346Z",
  },
];

export const dummyConnectionsData = [
  dummyUserData,
  dummyUser2Data,
  dummyUser3Data,
];

export const dummyFollowersData = [dummyUser2Data, dummyUser3Data];

export const dummyFollowingData = [dummyUser2Data, dummyUser3Data];

export const dummyPendingConnectionsData = [dummyUserData];
