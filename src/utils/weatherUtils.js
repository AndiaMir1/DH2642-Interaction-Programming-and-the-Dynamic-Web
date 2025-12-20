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
            highWind: ["Dance Pop", "Summer Anthems", "Upbeat Hits", "Mainstage", "Party Mix", "Lovely", "Energy", "Flowers", "Dua Lipa", "Club", "Festival", "Hyper", "Eurovision", "Bass", "Neon"],
            midWind: ["Feel Good Pop", "Summer Vibes", "Tropical House", "Top 40", "Sunshine", "Nectar Woode", "pool", "ocean", "bikini", "beach", "Roadtrip", "Radio", "Paradise", "Holiday", "Cocktail"],
            lowWind: ["Acoustic Pop", "Chill Hits", "Summer Lounge", "Soft Pop", "Lazy Day", "Feel good", "sand", "happy", "lucky", "Golden Hour", "Sunset", "Breeze", "Relax", "Island", "Ukelele"],
        },
        midTemp: {
            highWind: ["Workout Energy", "Power Pop", "Modern Rock", "Fast Pop", "Upbeat Indie", "boat", "jesus", "god", "riddim", "afrobeat", "Training", "Active", "Adventure", "Running", "Stadium"],
            midWind: ["Happy Hits", "Spring Pop", "Morning Radio", "Bright Pop", "Feel Good", "alcohol", "guitar", "singing", "bottle", "party", "Barbecue", "Picnic", "Park", "Retro", "Good Times"],
            lowWind: ["Easy Listening", "Coffee Shop", "Acoustic Hits", "Mellow Pop", "Piano", "In heaven there is no beer", "one less lonely girl", "Jazz", "Chillout", "Sunday", "Morning", "Smooth"],
        },
        lowTemp: {
            highWind: ["Crisp Pop", "High Energy Classics", "Winter Workout", "Electro Pop", "Autumn", "Late Night", "wonder", "shrek", "love", "wife", "Hiking", "Mountain", "Frost", "Adventure", "Viking"],
            midWind: ["Winter Radio", "Bright Hits", "Fresh Pop", "Clean Radio", "marry", "forever", "sun", "sunny", "monkey", "animal", "drugs", "Crystal", "Sparkle", "Clear Sky", "Nature", "Walk"],
            lowWind: ["Cozy Acoustic", "Winter Chillout", "Warm Vocals", "Soft Hits", "Cozy", "blanket", "honesty", "single", "light", "last", "first", "Home", "Fireplace", "Comfort", "Candle", "Peace"],
        }
    },
    thunderstorm: {
        highTemp: {
            highWind: ["Alternative Rock", "Electric Energy", "Hard Rock", "Power Anthems", "Intense Pop", "Crazy", "Angry", "Hard", "Destruction", "Voltage", "Chaos", "Adrenaline", "Rage", "Extreme"],
            midWind: ["Dark Pop", "Moody Beats", "Electronic Rock", "Night Drive", "Metal", "Punk", "punk rock", "Shoreline", "Gothic", "Industrial", "Nightmare", "Flash", "Shadow", "Rebel"],
            lowWind: ["Sultry R&B", "Heavy Bass", "Late Night Pop", "Atmospheric Hits", "Metal", "Thunder", "Coming", "Storm", "Scared", "Cold", "Midnight", "Static", "Danger", "Eerie", "Underground"],
        },
        midTemp: {
            highWind: ["Classic Rock", "Stadium Rock", "Rock Anthems", "Heavy Hits", "storm", "stormy", "movie", "Legend", "Guitar Solo", "Iconic", "Power", "Rumble", "Cloud", "Drum"],
            midWind: ["Cinematic Pop", "Dark Moody", "Tension", "Alternative Radio", "alone", "sex", "shelter", "song", "Tension", "Drama", "Rainy Night", "Stalker", "Mystery", "Silence"],
            lowWind: ["Dark Piano", "Deep Melancholy", "Fast Rock", "Ominous Beats", "phone", "writing", "theater", "Ghost", "Hollow", "Echo", "Submerged", "Drowning", "Heavy"],
        },
        lowTemp: {
            highWind: ["Metal Hits", "Hardcore Rock", "Industrial", "Aggressive" , "Thunderstruck", "Viking Metal", "Frozen", "Black Metal", "Scream", "Force", "Battle", "Winter Storm"],
            midWind: ["Dark Wave", "Gothic Pop", "Heavy Rock", "Grim Beats", "emo", "lonely", "angry", "mad", "emotional", "Cold Blood", "Abyss", "Sorrow", "Bleeding", "Lost", "Grave"],
            lowWind: ["Dark Ambient", "Doom Pop", "Silent Dark", "Deep Empty", "ocean", "island", "volcano", "Welcome To The Jungle", "Void", "Isolation", "End of World", "Outer Space", "Arctic"],
        }
    },
    drizzle: {
        highTemp: {
            highWind: ["Liquid DnB", "Tropical Beats", "Fresh House", "Summer Rain", "rain", "night pop", "Warm Rain", "Mist", "Fluid", "Flow", "Steamy", "Jungle"],
            midWind: ["Lo-Fi Pop", "Chillout", "Soft Beats", "Mellow Hits", "Quiet Pop", "Afternoon", "Study", "Bedroom", "Dream", "Soft", "Cloudy"],
            lowWind: ["Ambient Chill", "Zen Pop", "Nature Sounds", "Peaceful", "Yoga", "Meditation", "Spa", "Water", "Garden", "Sleep"],
        },
        midTemp: {
            highWind: ["Indie Hits", "Rainy Day Radio", "Soft Rock", "Modern Folk", "Ambient", "London", "Street", "Traffic", "Walk", "Grey", "Umbrella"],
            midWind: ["Sad Pop", "Melancholy Hits", "Rainy Day Pop", "Acoustic Radio", "mellow", "Tears", "Missing You", "Window", "Memory", "Letter"],
            lowWind: ["Chill Study", "Lo-Fi Beats", "Coffee House", "Muted Pop", "coast", "Reading", "Library", "Raindrops", "Tea", "Quiet", "Vinyl"],
        },
        lowTemp: {
            highWind: ["Gloomy Hits", "Cold Pop", "Moody Radio", "Grey Beats", "Cry", "Sad Chill", "Freezing", "Broken", "Hurt", "Winter Rain", "Dark"],
            midWind: ["Sad Acoustic", "Lonely Hits", "Heartbreak Pop", "Chilly", "Heartbreak", "Goodbye", "Alone", "Cold Heart", "Pain", "Empty"],
            lowWind: ["Slow Piano", "Minimalist Pop", "Deep Sadness", "Empty", "Blues", "Melancholy", "Solitude", "Fragile", "Deep", "Sinking"],
        }
    },
    rain: {
        highTemp: {
            highWind: ["Tropical Storm", "Drum & Bass", "Jungle Beats", "Electric Rain", "sad", "sorrow", "Monsoon", "Cyclone", "Flood", "Storm", "Heavy"],
            midWind: ["Warm R&B", "Steam", "Nature Hits", "Fluid Pop", "rain", "ballad", "slow", "home", "hunger", "hungry", "Humidity", "Shower", "Wash"],
            lowWind: ["Fresh Morning", "Soft Rain Acoustic", "Garden Vibes", "Afternoon", "night", "autumn", "fireplace", "hungover", "Earth", "Green", "Petrichor", "Roots"],
        },
        midTemp: {
            highWind: ["Power Ballads", "Emotional Rock", "Driving Hits", "Epic Pop", "games", "fire", "No Time For Us-Acoustic Version", "Highway", "Rainy Road", "Speed"],
            midWind: ["Rainy Hits", "Sad Songs Pop", "Coffee House Pop", "Rainy Jazz", "Jazz", "Joy Crookes", "Saxophone", "Blues", "Soul", "Vocal"],
            lowWind: ["Cozy Pop", "Reading Chill", "Home Radio", "Indoor Acoustic", "Blanket", "Kitchen", "Safety", "Warmth", "Pajamas", "Candle"],
        },
        lowTemp: {
            highWind: ["Cold Rock", "Epic Anthems", "Hard Rock Classics", "Winter Storm", "Grit", "Survival", "Ice Rain", "Hardship", "Brutal"],
            midWind: ["Sad Winter", "Grey Sky Hits", "Lonely Radio", "Freezing", "Despair", "North", "Longing", "Frozen Rain", "Sleet"],
            lowWind: ["Slow Sadness", "Dark Piano", "Abyssal", "Cold Empty", "Crying", "Funeral", "End", "Nightmare", "Darkness", "Distant"],
        }
    },
    snow: {
        midTemp: {
            highWind: ["Christmas Party", "Holiday Hits", "Winter Anthems", "Epic Winter", "soft", "white", "christmas", "santa", "reindeer", "Sleigh", "Bell", "Joy"],
            midWind: ["Winter Wonderland", "Holiday Classics", "Snowy Pop", "Bright Winter", "Mary", "God", "Angel", "Miracle", "Star", "Holy", "Choir"],
            lowWind: ["Silent Night", "Peaceful Holiday", "Winter Acoustic", "Soft Snow", "fireplace", "Cocoa", "Magic", "Snowfall", "Fluffy", "Pure"],
        },
        lowTemp: {
            highWind: ["Power Metal", "Extreme Energy", "Arctic Hits", "Ice Rock", "Dreamy Cold", "Tundra", "Glacier", "Zero", "Blizzard", "Frostbite"],
            midWind: ["Icy Pop", "Frosty Radio", "Northern Lights", "Deep Winter", "Dark Winter", "Aurora", "Borealis", "Night Sky", "Infinite", "Cold"],
            lowWind: ["Hibernation", "Deep Freeze", "Silent Piano", "Winter Sleep", "frozen", "unhappy", "different", "Winter", "Nap", "Still", "Dreaming"],
        }
    },
    Atmosphere: {
        highTemp: {
            highWind: ["Vaporwave", "Summer Haze", "Psych Rock", "Dreamy Pop", "vibe", "high", "cool", "sick", "coz", "Dizzy", "Heat", "Mirage", "Desert", "Blur"],
            midWind: ["Ethereal Hits", "Dream Pop", "Floating", "Hazy Pop", "Glitch", "Cloud", "Space", "Heavenly", "Angelic", "Spirit"],
            lowWind: ["Ambient Lounge", "Sun Drenched", "Slow Mo", "Lush Pop", "Chillout", "Silk", "Floating", "Drift", "Breeze", "Smooth"],
        },
        midTemp: {
            highWind: ["Mysterious Pop", "Noir Beats", "Cinematic", "Ghostly", "Fog", "Smog", "Shadow", "Hidden", "Detective", "Smoke"],
            midWind: ["Foggy Day", "Alternative Hits", "Mist Radio", "Moody Pop", "Haze", "Unknown", "Secret", "Lost", "Grey", "Blurry"],
            lowWind: ["Soft Mist", "Dreamy Acoustic", "Floating", "Peaceful", "Dawn", "Silence", "Forest", "Spirit", "Ghost", "Pure"],
        },
        lowTemp: {
            highWind: ["Eerie Pop", "Cold Atmospheric", "Void", "Whiteout", "Ghostly", "Haunted", "Phantom", "Arctic Haze", "Frost", "Chilly"],
            midWind: ["Dark Atmosphere", "Deep Fog", "Cinematic Dark", "Unknown", "Void", "Isolation", "Heavy", "Deep", "Mystery", "Shadow"],
            lowWind: ["Isolation", "Silent Cold", "Ambient Piano", "Grey Silence", "Breath", "Frozen", "Stillness", "Solitude", "Endless", "Grey"],
        }
    },
    cloud: {
        highTemp: {
            highWind: ["Overcast Pop", "Muffled Energy", "Summer Grey", "Static", "dark", "Stormy", "Heavy", "Gloomy", "Pressure", "Dull"],
            midWind: ["Mellow Summer", "Cloudy Vibes", "Soft Light", "Silver Pop", "cloud", "Grey Sky", "Flat", "Shadow", "Neutral", "Quiet"],
            lowWind: ["Lazy Day", "Warm Grey", "Daydream", "Floating Pop", "rap", "heavy", "Afternoon", "Relaxed", "Haze", "Boring", "Slow"],
        },
        midTemp: {
            highWind: ["Indie Rock", "Alternative Anthems", "Modern Rock", "Urban Hits", "bike", "swedish summer", "Street", "City", "Grey City", "Commute", "Everyday"],
            midWind: ["Daily Mix Pop", "Radio Hits", "Neutral Pop", "Easy Listening", "Standard", "Routine", "Normal", "Average", "Pop Radio", "Classic"],
            lowWind: ["Afternoon Chill", "Soft Pop Hits", "Silver Sky", "Mellow Radio", "Thinking", "Writing", "Calm", "Soft", "Acoustic", "Grey"],
        },
        lowTemp: {
            highWind: ["Gloomy Rock", "Winter Grey", "Cold Anthems", "Heavy Moody", "Brutal", "Harsh", "Concrete", "Iron", "Solid", "Cold Sky"],
            midWind: ["Sad Radio", "Somber Pop", "Grey Winter", "Dull Hits", "Empty", "Alone", "Boring", "Tired", "Depressing", "Sadness"],
            lowWind: ["Cozy Grey", "Sleepy Pop", "Soft & Sad", "Silver Lining", "shudder", "blanket", "smoke", "James Arthur", "Nap", "Rainy Day", "Soft", "Bed"],
        }
    }
};
