#!/usr/bin/env python3
"""Generate 20 cute flat-vector flashcard PNGs (1:1, no text)."""
from PIL import Image, ImageDraw
import math, os

OUT = "/workspace/flashcards/day1/images"
SIZE = 512
os.makedirs(OUT, exist_ok=True)

PASTELS = [
    (255, 236, 230),  # peach
    (230, 245, 255),  # sky
    (235, 250, 235),  # mint
    (255, 245, 230),  # cream
    (245, 235, 255),  # lavender
    (255, 240, 245),  # pink
    (240, 248, 255),  # alice
    (255, 250, 240),  # floral
]

def soft_bg(idx):
    img = Image.new("RGB", (SIZE, SIZE), PASTELS[idx % len(PASTELS)])
    d = ImageDraw.Draw(img)
    # subtle corner blobs
    c = PASTELS[(idx + 3) % len(PASTELS)]
    d.ellipse([-80, -80, 180, 180], fill=tuple(min(255, x+8) for x in c))
    d.ellipse([SIZE-160, SIZE-160, SIZE+60, SIZE+60], fill=tuple(max(0, x-6) for x in c))
    return img, d

def round_rect(d, xy, r, fill, outline=None, width=1):
    x0,y0,x1,y1 = xy
    d.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=width)

def circle(d, cx, cy, r, fill, outline=None, width=1):
    d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=fill, outline=outline, width=width)

def person(d, cx, cy, scale=1.0, body=(100,160,220), head=(255,220,185)):
    s = scale
    circle(d, cx, cy - int(55*s), int(28*s), head)
    # hair
    d.ellipse([cx-int(28*s), cy-int(85*s), cx+int(28*s), cy-int(50*s)], fill=(80,60,50))
    # body
    d.rounded_rectangle([cx-int(32*s), cy-int(25*s), cx+int(32*s), cy+int(50*s)], radius=int(16*s), fill=body)
    # legs
    d.rounded_rectangle([cx-int(28*s), cy+int(45*s), cx-int(8*s), cy+int(90*s)], radius=6, fill=(60,80,120))
    d.rounded_rectangle([cx+int(8*s), cy+int(45*s), cx+int(28*s), cy+int(90*s)], radius=6, fill=(60,80,120))

# ---- individual scenes ----

def draw_01_open(img, d):
    # open door with light spilling out
    round_rect(d, [140, 80, 370, 440], 8, (180,140,100))
    round_rect(d, [160, 100, 350, 420], 4, (255,250,220))
    # door ajar
    d.polygon([(350,100),(430,80),(430,440),(350,420)], fill=(200,160,120))
    circle(d, 400, 260, 10, (240,200,80))
    # sparkles
    for x,y in [(200,160),(280,200),(220,300)]:
        circle(d, x, y, 6, (255,230,100))

def draw_02_close(img, d):
    round_rect(d, [150, 70, 360, 450], 8, (160,120,90))
    # closed panels
    round_rect(d, [165, 90, 250, 430], 4, (190,150,110))
    round_rect(d, [260, 90, 345, 430], 4, (180,140,100))
    circle(d, 245, 260, 12, (220,180,60))
    circle(d, 275, 260, 12, (220,180,60))
    # lock
    round_rect(d, [235, 250, 285, 290], 6, (120,100,80))

def draw_03_work(img, d):
    # desk + laptop person
    person(d, 256, 280, 0.9, body=(90,170,200))
    round_rect(d, [120, 340, 390, 380], 8, (180,140,100))
    round_rect(d, [180, 250, 330, 340], 6, (80,90,110))
    round_rect(d, [190, 260, 320, 320], 4, (160,220,255))
    # coffee
    round_rect(d, [350, 300, 385, 340], 4, (255,255,255))
    round_rect(d, [355, 305, 380, 335], 3, (160,100,60))

def draw_04_rest(img, d):
    # person sleeping on cloud/pillow
    d.ellipse([80, 280, 430, 420], fill=(255,255,255))
    d.ellipse([120, 250, 280, 360], fill=(255,240,250))
    person(d, 220, 260, 0.7, body=(255,180,200))
    # zzz
    d.text((340, 160), "Z", fill=(180,160,200))
    circle(d, 360, 140, 8, (200,180,220))
    circle(d, 390, 110, 12, (200,180,220))
    # moon
    circle(d, 400, 100, 40, (255,245,180))
    circle(d, 415, 90, 35, PASTELS[2])

def draw_05_hurry(img, d):
    # running person with speed lines
    person(d, 300, 260, 0.95, body=(255,120,100))
    for i, y in enumerate([180, 220, 260, 300]):
        d.line([(80, y), (180 - i*10, y)], fill=(255,160,120), width=6)
    # sweat drop
    d.ellipse([340, 160, 360, 190], fill=(150,200,255))

def draw_06_late(img, d):
    # clock showing late + worried face
    circle(d, 256, 220, 110, (255,255,255), outline=(100,100,120), width=8)
    circle(d, 256, 220, 8, (100,100,120))
    # hands at ~10:10 but implying late - actually 12:05 style late
    d.line([(256,220),(256,140)], fill=(80,80,100), width=6)
    d.line([(256,220),(320,250)], fill=(220,80,80), width=5)
    # ticks
    for a in range(12):
        ang = math.radians(a*30 - 90)
        x1 = 256 + int(90*math.cos(ang)); y1 = 220 + int(90*math.sin(ang))
        x2 = 256 + int(100*math.cos(ang)); y2 = 220 + int(100*math.sin(ang))
        d.line([(x1,y1),(x2,y2)], fill=(120,120,140), width=3)
    # sweat / late mark
    d.ellipse([360, 120, 385, 160], fill=(120,180,255))
    # small running figure bottom
    person(d, 256, 400, 0.45, body=(255,140,100))

def draw_07_commute(img, d):
    # train / path
    round_rect(d, [60, 200, 450, 340], 40, (100,180,220))
    round_rect(d, [80, 220, 200, 300], 12, (200,230,255))
    round_rect(d, [220, 220, 340, 300], 12, (200,230,255))
    round_rect(d, [360, 220, 430, 300], 12, (200,230,255))
    # windows reflection
    for x in [100, 240, 380]:
        circle(d, x, 250, 8, (255,255,255))
    # tracks
    d.line([(40,360),(470,360)], fill=(120,120,130), width=8)
    d.line([(40,380),(470,380)], fill=(120,120,130), width=8)
    # person boarding
    person(d, 100, 400, 0.5, body=(255,160,100))

def draw_08_station(img, d):
    # station building with platform
    round_rect(d, [80, 140, 430, 320], 10, (230,235,245))
    round_rect(d, [100, 160, 410, 220], 6, (100,160,200))
    # roof
    d.polygon([(60,150),(256,70),(450,150)], fill=(80,130,180))
    # entrance
    round_rect(d, [200, 240, 310, 320], 4, (60,80,100))
    # platform line
    round_rect(d, [50, 320, 460, 360], 4, (180,180,190))
    d.line([(50,340),(460,340)], fill=(255,200,50), width=6)
    # sign post
    round_rect(d, [330, 180, 400, 210], 4, (50,50,60))

def draw_09_ride(img, d):
    # person boarding / sitting in vehicle
    round_rect(d, [100, 180, 420, 360], 30, (120,190,230))
    round_rect(d, [130, 210, 250, 300], 10, (220,240,255))
    round_rect(d, [270, 210, 390, 300], 10, (220,240,255))
    person(d, 190, 260, 0.55, body=(255,140,120))
    # door open arrow
    d.polygon([(430,250),(480,280),(430,310)], fill=(100,200,140))

def draw_10_getoff(img, d):
    # person stepping down from vehicle
    round_rect(d, [40, 160, 260, 340], 24, (140,180,220))
    round_rect(d, [70, 190, 180, 280], 8, (210,230,250))
    person(d, 340, 280, 0.85, body=(100,190,150))
    # steps
    round_rect(d, [240, 340, 320, 370], 4, (160,160,170))
    round_rect(d, [260, 370, 340, 400], 4, (150,150,160))
    # arrow down
    d.polygon([(380,160),(420,160),(400,210)], fill=(255,140,100))

def draw_11_buy(img, d):
    # shopping bag + coins / shop
    round_rect(d, [160, 180, 350, 400], 20, (255,160,140))
    round_rect(d, [180, 200, 330, 380], 12, (255,200,180))
    # handles
    d.arc([190, 120, 260, 220], 180, 0, fill=(180,100,80), width=10)
    d.arc([250, 120, 320, 220], 180, 0, fill=(180,100,80), width=10)
    # coin
    circle(d, 400, 320, 40, (255,220,80))
    circle(d, 400, 320, 28, (255,200,50))
    # cute star on bag
    circle(d, 255, 280, 20, (255,230,100))

def draw_12_sell(img, d):
    # shop counter with goods
    round_rect(d, [80, 280, 430, 400], 10, (180,140,100))
    round_rect(d, [100, 250, 200, 310], 8, (255,180,100))
    round_rect(d, [220, 230, 320, 310], 8, (100,200,160))
    round_rect(d, [340, 260, 410, 310], 8, (180,160,255))
    person(d, 256, 180, 0.7, body=(255,150,100))
    # price tag
    d.polygon([(150,200),(190,200),(190,240),(170,255),(150,240)], fill=(255,100,100))

def draw_13_pay(img, d):
    # wallet / card / yen coins
    round_rect(d, [120, 180, 340, 340], 16, (100,160,120))
    round_rect(d, [140, 200, 320, 280], 8, (80,140,100))
    # card sticking out
    round_rect(d, [200, 150, 310, 210], 6, (100,160,220))
    circle(d, 230, 180, 10, (255,220,80))
    # coins
    circle(d, 380, 300, 45, (255,215,60))
    circle(d, 400, 360, 35, (230,190,50))
    circle(d, 340, 380, 30, (255,220,80))

def draw_14_lend(img, d):
    # hand giving book/item to another
    # left person
    person(d, 160, 280, 0.75, body=(100,160,220))
    # right person
    person(d, 360, 280, 0.75, body=(255,150,140))
    # book being passed
    round_rect(d, [220, 200, 300, 270], 4, (255,120,100))
    round_rect(d, [225, 205, 295, 265], 3, (255,200,180))
    # hearts / kindness
    circle(d, 256, 150, 12, (255,150,170))

def draw_15_borrow(img, d):
    # person receiving item gratefully
    person(d, 280, 270, 0.9, body=(140,180,220))
    # book in hands
    round_rect(d, [230, 240, 330, 310], 6, (100,180,140))
    # arrow toward person
    d.polygon([(80,240),(160,220),(160,260)], fill=(255,180,100))
    round_rect(d, [60, 200, 130, 280], 6, (255,200,120))

def draw_16_medicine(img, d):
    # pill bottle + cross
    round_rect(d, [180, 160, 330, 400], 20, (255,255,255))
    round_rect(d, [190, 200, 320, 390], 12, (100,200,180))
    round_rect(d, [200, 140, 310, 180], 8, (80,160,140))
    # medical cross
    round_rect(d, [235, 250, 275, 340], 4, (255,255,255))
    round_rect(d, [215, 280, 295, 310], 4, (255,255,255))
    # pills
    circle(d, 380, 280, 25, (255,120,140))
    circle(d, 400, 340, 20, (120,180,255))
    d.ellipse([100, 320, 150, 360], fill=(255,220,100))

def draw_17_illness(img, d):
    # sick person in bed with thermometer
    round_rect(d, [80, 280, 430, 400], 20, (255,255,255))
    round_rect(d, [100, 260, 400, 340], 16, (200,220,255))
    # head
    circle(d, 160, 240, 35, (255,210,190))
    d.ellipse([130, 210, 190, 245], fill=(240,100,100))  # fever flush / blanket edge hair
    # thermometer
    round_rect(d, [200, 230, 320, 250], 8, (255,255,255))
    circle(d, 320, 240, 14, (255,100,100))
    # tissue
    round_rect(d, [360, 200, 420, 250], 6, (255,255,255))
    # sad sweat
    d.ellipse([195, 210, 210, 235], fill=(150,200,255))

def draw_18_hall(img, d):
    # library/museum building
    round_rect(d, [90, 180, 420, 400], 8, (230,220,200))
    # columns
    for x in [120, 180, 240, 300, 360]:
        round_rect(d, [x, 200, x+35, 380], 4, (255,250,240))
    # pediment
    d.polygon([(70,190),(256,80),(440,190)], fill=(200,180,150))
    # door
    round_rect(d, [220, 300, 290, 400], 4, (120,90,70))
    # flag
    d.line([(256,80),(256,40)], fill=(100,80,60), width=3)
    d.polygon([(256,40),(310,55),(256,70)], fill=(255,120,100))

def draw_19_promise(img, d):
    # calendar / handshake / pinky promise
    # calendar
    round_rect(d, [120, 100, 390, 380], 16, (255,255,255))
    round_rect(d, [120, 100, 390, 160], 16, (255,120,140))
    # binding rings
    for x in [180, 256, 330]:
        circle(d, x, 100, 12, (200,200,210))
    # circled date
    circle(d, 256, 260, 50, (255,230,235))
    circle(d, 256, 260, 40, (255,150,160))
    # checkmark
    d.line([(230,260),(250,285),(290,235)], fill=(255,255,255), width=8)

def draw_20_meet(img, d):
    # two people waving / meeting
    person(d, 170, 280, 0.85, body=(100,170,220))
    person(d, 350, 280, 0.85, body=(255,150,160))
    # speech hearts
    circle(d, 256, 140, 18, (255,140,160))
    circle(d, 230, 160, 12, (255,180,190))
    circle(d, 280, 155, 12, (255,180,190))
    # ground shadow
    d.ellipse([100, 420, 420, 460], fill=(220,210,230))

DRAWERS = [
    ("kanji_01_kai.png", draw_01_open),
    ("kanji_02_hei.png", draw_02_close),
    ("kanji_03_dou.png", draw_03_work),
    ("kanji_04_kyuu.png", draw_04_rest),
    ("kanji_05_kyuu.png", draw_05_hurry),
    ("kanji_06_chi.png", draw_06_late),
    ("kanji_07_tsuu.png", draw_07_commute),
    ("kanji_08_eki.png", draw_08_station),
    ("kanji_09_jou.png", draw_09_ride),
    ("kanji_10_kou.png", draw_10_getoff),
    ("kanji_11_bai.png", draw_11_buy),
    ("kanji_12_bai.png", draw_12_sell),
    ("kanji_13_futsu.png", draw_13_pay),
    ("kanji_14_tai.png", draw_14_lend),
    ("kanji_15_shaku.png", draw_15_borrow),
    ("kanji_16_yaku.png", draw_16_medicine),
    ("kanji_17_byou.png", draw_17_illness),
    ("kanji_18_kan.png", draw_18_hall),
    ("kanji_19_yaku.png", draw_19_promise),
    ("kanji_20_kai.png", draw_20_meet),
]

def main():
    for i, (name, drawer) in enumerate(DRAWERS):
        img, d = soft_bg(i)
        drawer(img, d)
        path = os.path.join(OUT, name)
        img.save(path, "PNG", optimize=True)
        print(f"OK {name}")
    print(f"Done: {len(DRAWERS)} images -> {OUT}")

if __name__ == "__main__":
    main()
