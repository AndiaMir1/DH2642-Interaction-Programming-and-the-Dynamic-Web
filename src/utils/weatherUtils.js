export function getWeatherCategory(conditionCode){
    if (conditionCode>=200 && conditionCode<300) return "thunderstorm";
    if (conditionCode>=300 && conditionCode<400) return "drizzle";
    if (conditionCode>=400 && conditionCode<500) return "rain";
    if (conditionCode>=600 && conditionCode<700) return "snow";
    if (conditionCode>=700 && conditionCode<800) return "Atmosphere";
    if (conditionCode===800) return "clear";
    if (conditionCode>800) return "cloud";
    return "clear";

}

export function getTemperature(temp) {
    if (temp >= 15) return "highTemp";
    if (temp < 15 && temp > -5) return "midTemp";
    if (temp <= -5) return "lowTemp";
}


export function getWind(wind) {
    if (wind >= 20.7) return "highWind";
    if (wind > 7.9 && wind < 20.7) return "midWind";
    if (wind <= 7.9) return "lowWind";
}

export const weatherMusic = {
    clear: {
        highTemp: {
            highWind: ["Dance Pop", "Summer Anthems", "Upbeat Hits", "Mainstage", "Party Mix",, "Lovely", "Energy", "Flowers", ],
            midWind: ["Feel Good Pop", "Summer Vibes", "Tropical House", "Top 40", "Sunshine", "Nectar Woode", "pool", "ocean", "bikini", "beach"],
            lowWind: ["Acoustic Pop", "Chill Hits", "Summer Lounge", "Soft Pop", "Lazy Day", "Feel good", "sand", "happy", "lucky"],
        },
        midTemp: {
            highWind: ["Workout Energy", "Power Pop", "Modern Rock", "Fast Pop", "Upbeat Indie", "boat", "jesus", "god", "riddim", "afrobeat"],
            midWind: ["Happy Hits", "Spring Pop", "Morning Radio", "Bright Pop", "Feel Good", "alcohol", "guitar", "singing", "bottle", "party"],
            lowWind: ["Easy Listening", "Coffee Shop", "Acoustic Hits", "Mellow Pop", "Piano", "In heaven there is no beer", "one less lonely girl"],
        },
        lowTemp: {
            highWind: ["Crisp Pop", "High Energy Classics", "Winter Workout", "Electro Pop", "Autumn", "Late Night", "wonder", "shrek", "love", "wife"],
            midWind: ["Winter Radio", "Bright Hits", "Fresh Pop", "Clean Radio", "marry", "forever", "sun", "sunny", "monkey", "animal", "drugs"],
            lowWind: ["Cozy Acoustic", "Winter Chillout", "Warm Vocals", "Soft Hits", "Cozy", "blanket", "honesty", "single", "light", "last", "first"],
        }
    },
    thunderstorm: {
        highTemp: {
            highWind: ["Alternative Rock", "Electric Energy", "Hard Rock", "Power Anthems", "Intense Pop", "Crazy", "Angry", "Hard"],
            midWind: ["Dark Pop", "Moody Beats", "Electronic Rock", "Night Drive", "Metal", "Punk", "punk rock", "Shoreline"],
            lowWind: ["Sultry R&B", "Heavy Bass", "Late Night Pop", "Atmospheric Hits", "Metal", "Thunder", "Coming", "Storm", "Scared", "Cold"],
        },
        midTemp: {
            highWind: ["Classic Rock", "Stadium Rock", "Rock Anthems", "Heavy Hits", "storm", "stormy", "movie"],
            midWind: ["Cinematic Pop", "Dark Moody", "Tension", "Alternative Radio", "alone", "sex", "shelter", "song"],
            lowWind: ["Dark Piano", "Deep Melancholy", "Fast Rock", "Ominous Beats", "phone", "writing", "theater"],
        },
        lowTemp: {
            highWind: ["Metal Hits", "Hardcore Rock", "Industrial", "Aggressive" , "Thunderstruck"],
            midWind: ["Dark Wave", "Gothic Pop", "Heavy Rock", "Grim Beats", "emo", "lonely", "angry", "mad", "emotional"],
            lowWind: ["Dark Ambient", "Doom Pop", "Silent Dark", "Deep Empty", "ocean", "island", "volcano", "Welcome To The Jungle"],
        }
    },
    drizzle: {
        highTemp: {
            highWind: ["Liquid DnB", "Tropical Beats", "Fresh House", "Summer Rain", "rain", "night pop"],
            midWind: ["Lo-Fi Pop", "Chillout", "Soft Beats", "Mellow Hits", "Quiet Pop"],
            lowWind: ["Ambient Chill", "Zen Pop", "Nature Sounds", "Peaceful"],
        },
        midTemp: {
            highWind: ["Indie Hits", "Rainy Day Radio", "Soft Rock", "Modern Folk", "Ambient"],
            midWind: ["Sad Pop", "Melancholy Hits", "Rainy Day Pop", "Acoustic Radio", "mellow"],
            lowWind: ["Chill Study", "Lo-Fi Beats", "Coffee House", "Muted Pop", "coast"],
        },
        lowTemp: {
            highWind: ["Gloomy Hits", "Cold Pop", "Moody Radio", "Grey Beats", "Cry", "Sad Chill"],
            midWind: ["Sad Acoustic", "Lonely Hits", "Heartbreak Pop", "Chilly", "Heartbreak"],
            lowWind: ["Slow Piano", "Minimalist Pop", "Deep Sadness", "Empty", "Blues"],
        }
    },
    rain: {
        highTemp: {
            highWind: ["Tropical Storm", "Drum & Bass", "Jungle Beats", "Electric Rain", "sad", "sorrow"],
            midWind: ["Warm R&B", "Steam", "Nature Hits", "Fluid Pop", "rain", "ballad", "slow", "home", "hunger", "hungry"],
            lowWind: ["Fresh Morning", "Soft Rain Acoustic", "Garden Vibes", "Afternoon", "night", "autumn", "fireplace", "hungover"],
        },
        midTemp: {
            highWind: ["Power Ballads", "Emotional Rock", "Driving Hits", "Epic Pop", "games", "fire", "No Time For Us-Acoustic Version"],
            midWind: ["Rainy Hits", "Sad Songs Pop", "Coffee House Pop", "Rainy Jazz", "Jazz", "Joy Crookes"],
            lowWind: ["Cozy Pop", "Reading Chill", "Home Radio", "Indoor Acoustic"],
        },
        lowTemp: {
            highWind: ["Cold Rock", "Epic Anthems", "Hard Rock Classics", "Winter Storm"],
            midWind: ["Sad Winter", "Grey Sky Hits", "Lonely Radio", "Freezing"],
            lowWind: ["Slow Sadness", "Dark Piano", "Abyssal", "Cold Empty"],
        }
    },
    snow: {
        midTemp: {
            highWind: ["Christmas Party", "Holiday Hits", "Winter Anthems", "Epic Winter", "soft", "white", "christmas", "santa", "reindeer",],
            midWind: ["Winter Wonderland", "Holiday Classics", "Snowy Pop", "Bright Winter", "Mary", "God"],
            lowWind: ["Silent Night", "Peaceful Holiday", "Winter Acoustic", "Soft Snow", "fireplace", ],
        },
        lowTemp: {
            highWind: ["Power Metal", "Extreme Energy", "Arctic Hits", "Ice Rock", "Dreamy Cold"],
            midWind: ["Icy Pop", "Frosty Radio", "Northern Lights", "Deep Winter", "Dark Winter"],
            lowWind: ["Hibernation", "Deep Freeze", "Silent Piano", "Winter Sleep", "frozen", "unhappy", "different", "Winter"],
        }
    },
    Atmosphere: {
        highTemp: {
            highWind: ["Vaporwave", "Summer Haze", "Psych Rock", "Dreamy Pop", "vibe", "high", "cool", "sick", "coz"],
            midWind: ["Ethereal Hits", "Dream Pop", "Floating", "Hazy Pop"],
            lowWind: ["Ambient Lounge", "Sun Drenched", "Slow Mo", "Lush Pop"],
        },
        midTemp: {
            highWind: ["Mysterious Pop", "Noir Beats", "Cinematic", "Ghostly"],
            midWind: ["Foggy Day", "Alternative Hits", "Mist Radio", "Moody Pop"],
            lowWind: ["Soft Mist", "Dreamy Acoustic", "Floating", "Peaceful"],
        },
        lowTemp: {
            highWind: ["Eerie Pop", "Cold Atmospheric", "Void", "Whiteout"],
            midWind: ["Dark Atmosphere", "Deep Fog", "Cinematic Dark", "Unknown"],
            lowWind: ["Isolation", "Silent Cold", "Ambient Piano", "Grey Silence"],
        }
    },
    cloud: {
        highTemp: {
            highWind: ["Overcast Pop", "Muffled Energy", "Summer Grey", "Static", "dark"],
            midWind: ["Mellow Summer", "Cloudy Vibes", "Soft Light", "Silver Pop", "cloud"],
            lowWind: ["Lazy Day", "Warm Grey", "Daydream", "Floating Pop", "rap", "heavy"],
        },
        midTemp: {
            highWind: ["Indie Rock", "Alternative Anthems", "Modern Rock", "Urban Hits", "bike", "swedish summer"],
            midWind: ["Daily Mix Pop", "Radio Hits", "Neutral Pop", "Easy Listening"],
            lowWind: ["Afternoon Chill", "Soft Pop Hits", "Silver Sky", "Mellow Radio"],
        },
        lowTemp: {
            highWind: ["Gloomy Rock", "Winter Grey", "Cold Anthems", "Heavy Moody"],
            midWind: ["Sad Radio", "Somber Pop", "Grey Winter", "Dull Hits"],
            lowWind: ["Cozy Grey", "Sleepy Pop", "Soft & Sad", "Silver Lining", "shudder", "blanket", "smoke", "James Arthur"],
        }
    }
};
