import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetFile = path.resolve(__dirname, "../map-data/landmarks.js");

const newLandmarks = [
  { id: "aviary", term: "Bird Aviary", phonetic: "/ˈeɪviəri/", chinese: "大型观鸟鸟舍", category: "facility", indoor: true },
  { id: "boathouse", term: "Boathouse", phonetic: "/ˈbəʊthaʊs/", chinese: "游艇码头船库", category: "water", indoor: true },
  { id: "picnic_shelter", term: "Picnic Shelter", phonetic: "/ˈpɪknɪk ˈʃeltə/", chinese: "遮阳野餐凉亭", category: "facility", indoor: false },
  { id: "viewing_platform", term: "Viewing Platform", phonetic: "/ˈvjuːɪŋ ˈplætfɔːm/", chinese: "高架观景展望台", category: "facility", indoor: false },
  { id: "windmill", term: "Historic Windmill", phonetic: "/hɪˈstɒrɪk ˈwɪndmɪl/", chinese: "历史风车磨坊", category: "building", indoor: true },
  { id: "watermill", term: "Old Watermill", phonetic: "/əʊld ˈwɔːtəmɪl/", chinese: "水力磨坊木屋", category: "building", indoor: true },
  { id: "herb_garden", term: "Medicinal Herb Garden", phonetic: "/mɪˈdɪsnl hɜːb ˈɡɑːdn/", chinese: "药用草本植物园", category: "nature", indoor: false },
  { id: "courtyard", term: "Central Courtyard", phonetic: "/ˈsentrəl ˈkɔːtjɑːd/", chinese: "建筑中央内庭院", category: "facility", indoor: false },
  { id: "atrium", term: "Glass Atrium", phonetic: "/ɡlɑːs ˈeɪtriəm/", chinese: "采光玻璃中庭大厅", category: "building", indoor: true },
  { id: "lecture_theatre", term: "Main Lecture Theatre", phonetic: "/meɪn ˈlektʃə ˈθɪətə/", chinese: "主阶梯大讲堂", category: "building", indoor: true },
  { id: "seminar_room", term: "Seminar Room", phonetic: "/ˈsemɪnɑː rʊm/", chinese: "研讨辅导教室", category: "building", indoor: true },
  { id: "pottery_workshop", term: "Pottery Studio", phonetic: "/ˈpɒtəri ˈstjuːdiəʊ/", chinese: "陶艺手工作坊", category: "building", indoor: true },
  { id: "bicycle_shed", term: "Covered Bicycle Shed", phonetic: "/ˈkʌvəd ˈbaɪsɪkl ʃed/", chinese: "带棚自行车存放处", category: "facility", indoor: false },
  { id: "conservatory", term: "Tropical Conservatory", phonetic: "/ˈtrɒpɪkl kənˈsɜːvətri/", chinese: "热带植物保温暖房", category: "building", indoor: true },
  { id: "aquarium", term: "Marine Aquarium", phonetic: "/məˈriːn əˈkweəriəm/", chinese: "海洋生物水族馆", category: "building", indoor: true },
  { id: "observatory", term: "Astronomical Observatory", phonetic: "/ˌæstrəˈnɒmɪkl əbˈzɜːvətri/", chinese: "圆顶天文观测台", category: "building", indoor: true },
  { id: "statue", term: "Bronze Founder's Statue", phonetic: "/brɒnz ˈfaʊndəz ˈstætʃuː/", chinese: "先驱者青铜纪念像", category: "nature", indoor: false },
  { id: "amphitheatre", term: "Open-Air Amphitheatre", phonetic: "/ˌəʊpən ˈeər ˈæmfɪθɪətə/", chinese: "露天半圆阶梯剧场", category: "facility", indoor: false },
  { id: "clock_tower", term: "Central Clock Tower", phonetic: "/ˈsentrəl klɒk ˈtaʊə/", chinese: "园区中央大钟楼", category: "building", indoor: true },
  { id: "first_aid", term: "First Aid Station", phonetic: "/fɜːst eɪd ˈsteɪʃn/", chinese: "红十字急救医务站", category: "facility", indoor: true },
  { id: "information_kiosk", term: "Information Kiosk", phonetic: "/ˌɪnfəˈmeɪʃn ˈkiːɒsk/", chinese: "电子触摸问询服务亭", category: "facility", indoor: false },
  { id: "wildflower_meadow", term: "Wildflower Meadow", phonetic: "/ˈwaɪldflaʊə ˈmedəʊ/", chinese: "野花生态保育草甸", category: "nature", indoor: false },
  { id: "bee_hives", term: "Apiary Bee Hives", phonetic: "/ˈeɪpiəri biː haɪvz/", chinese: "养蜂科普蜂箱区", category: "nature", indoor: false },
  { id: "sculpture_walk", term: "Sculpture Promenade", phonetic: "/ˈskʌlptʃə ˌprɒməˈnɑːd/", chinese: "当代艺术雕塑林荫道", category: "nature", indoor: false }
];

let content = fs.readFileSync(targetFile, "utf-8");
const bracketIndex = content.lastIndexOf("];");
if (bracketIndex === -1) {
  console.error("Closing bracket not found");
  process.exit(1);
}

const additionsStr = ",\n    " + newLandmarks.map(l => JSON.stringify(l)).join(",\n    ");
const newContent = content.slice(0, bracketIndex) + additionsStr + "\n  " + content.slice(bracketIndex);

fs.writeFileSync(targetFile, newContent, "utf-8");
console.log(`Successfully expanded LANDMARKS by ${newLandmarks.length} items! Total is now 60.`);
