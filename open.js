const API_KEY =
  "test_d5d01dcf5a408a2f32d5662cccf248128aa0ee44db28deb4e95da08b2a4012a160b1f54ba0f445f36db292e67dfe4e33";
const characterName = "아델";
const urlString =
  "https://open.api.nexon.com/maplestory/v1/id?character_name=" + characterName;

const answer = fetch(urlString, {
  headers: {
    "x-nxopen-api-key": API_KEY
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

console.log(answer);
