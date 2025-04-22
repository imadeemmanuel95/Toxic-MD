const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0FSRmVPOEZCRzRsR2FlYWVhK0FvNTNOMkxqVG52aGpTR1h6Ky9mT0ZHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0RZV3NjVXI5ZnVkUDJCYWV0M0tXTVd3T3Q2SEJSdlNRK1RtOHphT3VBQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVR1R2TmRwWUNXSjdQU3JzMG5DTmR3c1lsMm93clRldlJlbnZhSWRsNUZFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SWtsVi96bGw1OGViQ1FlQ21JUzFiZGh4Ti94QS9DVFVqbXhtTzVmUjJZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNGZHY1dytGVHIxQXBFM1JCdDFxZ0J0YjVpcUVsTG1xeklSb3lHdzk0SEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRKMExITXhaQ2VRNGhReDRXMjRxK0hPdUF6M2JqMnc0bEdINnlYU2g4UzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0RqUmNUTWVKcUVMYW9BNVdvV2dUaE5JWmZ5TEpRY01FMVRjUEdvczBVTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiamVhMk1EcCtFczBrYmtkWHNqaGh4KzBiQy9vZFoyanZERFpqNHpHdklVWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZnNFZId3doYnJoaWFKUExRM3M3TXZrV1lzQUZ5amIxS1dlVTFEQ3pESXpBRy9IdlpmaEY3OEI1MSswbThMc0VabjF2dGV5RnJ1ZEhKS25wd0VUT2dBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTksImFkdlNlY3JldEtleSI6Ims4bERGaXBoWDQ4eUk2cW03TTRlcC9UR1ZEQzZIMHlBRENKa0hCWDR2ZHM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkFtdnZtdTg5UzZlMHVrQk9rbVB3aWciLCJwaG9uZUlkIjoiMzM4MTc3ZTEtZWZiNC00NDNhLTg5MDktMjg5NmVmYjFhMGRhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdlZElDS2I5Qkp3aExhRWZMMXRzblRYRndjTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqWGhNd0pRVFk2SU9LTS9pWGxtM1dlck5PUkU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNE5QTkZSTkciLCJtZSI6eyJpZCI6IjIzNDkwMTEzMjMzNTE6MjNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0orOW1lRUhFUGFxb01BR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImNZdXlTMlpqMXk2WExMcUJIZW5mYlZOZUxOc0licDkrMEZLaThMazRVams9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjYvY0dINVVCV3pVVmhCdEErajgzS0NseXlLUDYrTGx0VVNaWkRaeGRWc3BIOGUxTXl1aU5tSmoxMU9IRXpCckpsaVBXQ1l5TkgvV09oZFk0NXpTekRRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJEWVNTVVFTVFdIc1d5bG5KeTE0T3JIOTVKcGI4YmNFWDF2QTlzd1MzdHA1eThYSldJV3RDVHI2ZXdoNnZFNUJaYlk3aktzQlBzZEsycEo1RWM0UklnZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDkwMTEzMjMzNTE6MjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWEdMc2t0bVk5Y3VseXk2Z1IzcDMyMVRYaXpiQ0c2ZmZ0QlNvdkM1T0ZJNSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTM2MDI2MCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMc1gifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Biggy-Fx👽👽",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349011323351",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
