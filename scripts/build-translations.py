import json
from pathlib import Path

from argostranslate import translate


APP_DIR = Path(__file__).resolve().parent.parent
CORPUS_PATH = APP_DIR / "corpus-data.js"
CACHE_PATH = APP_DIR / "data" / "sentence-translations.json"
OUTPUT_PATH = APP_DIR / "sentence-translations.js"


def load_curated_cards():
    source = CORPUS_PATH.read_text(encoding="utf-8")
    marker = "window.CORPUS_DATA = "
    payload = source.split(marker, 1)[1].rsplit(";", 1)[0]
    return [card for card in json.loads(payload) if card.get("curated")]


cards = load_curated_cards()
cache = json.loads(CACHE_PATH.read_text(encoding="utf-8")) if CACHE_PATH.exists() else {}
translator = translate.get_translation_from_codes("en", "zh")
translations = {}


def save():
    CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    completed = {
        card["id"]: {"source": card["sentence"], "text": translations[card["id"]]}
        for card in cards
        if card["id"] in translations
    }
    CACHE_PATH.write_text(json.dumps(completed, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


for index, card in enumerate(cards, start=1):
    cached = cache.get(card["id"])
    if cached and cached.get("source") == card["sentence"] and cached.get("text"):
        translations[card["id"]] = cached["text"]
    else:
        translations[card["id"]] = translator.translate(card["sentence"])

    if index % 25 == 0 or index == len(cards):
        save()
        print(f"已生成 {index}/{len(cards)} 条精修句译文", flush=True)


ordered = {card["id"]: translations[card["id"]] for card in cards}
OUTPUT_PATH.write_text(
    "// 由 scripts/build-translations.py 生成，请勿手工编辑。\n"
    f"window.SENTENCE_TRANSLATIONS = {json.dumps(ordered, ensure_ascii=False, indent=2)};\n",
    encoding="utf-8",
)
print(f"完成：{len(cards)} 条精修句译文已写入 {OUTPUT_PATH.name}")
