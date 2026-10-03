#!/usr/bin/env python3
"""Draw Day 2–7 flashcard PNGs and write their cards.json files.

Illustrations are real PNG (not JPEG bytes). Day 1 is left untouched.
"""
import json
import math
import os

from PIL import Image, ImageDraw

from week_content import DAY1, DAYS, card_dicts

ROOT = os.path.dirname(os.path.abspath(__file__))
SIZE = 512

PASTELS = [
    (255, 236, 230),
    (230, 245, 255),
    (235, 250, 235),
    (255, 245, 230),
    (245, 235, 255),
    (255, 240, 245),
    (240, 248, 255),
    (255, 250, 240),
]

SKIN = (255, 214, 186)
HAIR = (96, 68, 54)
HAIR_F = (70, 48, 42)
INK = (86, 74, 82)
WOOD = (198, 148, 98)
RED = (226, 92, 104)
BLUE = (116, 184, 220)
GREEN = (112, 184, 124)
YELLOW = (255, 206, 84)
ORANGE = (255, 158, 86)
PINK = (255, 164, 186)
WHITE = (255, 255, 255)
NAVY = (72, 96, 140)
TEAL = (90, 170, 164)


def canvas(idx):
    img = Image.new("RGB", (SIZE, SIZE), PASTELS[idx % len(PASTELS)])
    d = ImageDraw.Draw(img)
    c = PASTELS[(idx + 3) % len(PASTELS)]
    d.ellipse([-80, -80, 180, 180], fill=tuple(min(255, x + 8) for x in c))
    d.ellipse([SIZE - 160, SIZE - 160, SIZE + 60, SIZE + 60], fill=tuple(max(0, x - 6) for x in c))
    return img, d


def rr(d, box, r, fill, outline=None, w=1):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=w)


def circ(d, cx, cy, r, fill, outline=None, w=1):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill, outline=outline, width=w)


def ground(d):
    d.ellipse([70, 430, 442, 490], fill=(230, 220, 228))


def person(d, cx, cy, s=1.0, shirt=BLUE, hair=HAIR, skin=SKIN):
    """Standing figure. cy is about the chest."""
    circ(d, cx, cy - int(58 * s), int(28 * s), skin)
    d.pieslice(
        [cx - int(30 * s), cy - int(92 * s), cx + int(30 * s), cy - int(40 * s)],
        200, 340, fill=hair,
    )
    d.ellipse([cx - int(30 * s), cy - int(88 * s), cx + int(30 * s), cy - int(52 * s)], fill=hair)
    rr(d, [cx - int(32 * s), cy - int(28 * s), cx + int(32 * s), cy + int(48 * s)], int(16 * s), shirt)
    rr(d, [cx - int(28 * s), cy + int(42 * s), cx - int(8 * s), cy + int(92 * s)], 6, NAVY)
    rr(d, [cx + int(8 * s), cy + int(42 * s), cx + int(28 * s), cy + int(92 * s)], 6, NAVY)


def face(d, cx, cy, r, mood="smile", hair=HAIR):
    circ(d, cx, cy, r, SKIN)
    d.ellipse([cx - r, cy - r - 4, cx + r, cy - r // 5], fill=hair)
    d.chord([cx - r, cy - r, cx + r, cy + r // 3], 200, 340, fill=hair)
    eye_y = cy - r // 8
    eye_dx = r // 3
    er = max(4, r // 10)
    if mood == "shut":
        d.arc([cx - eye_dx - er, eye_y - er, cx - eye_dx + er, eye_y + er], 20, 160, fill=INK, width=3)
        d.arc([cx + eye_dx - er, eye_y - er, cx + eye_dx + er, eye_y + er], 20, 160, fill=INK, width=3)
    elif mood == "angry":
        circ(d, cx - eye_dx, eye_y, er, INK)
        circ(d, cx + eye_dx, eye_y, er, INK)
        d.line([(cx - eye_dx - er, eye_y - er - 4), (cx - eye_dx + er, eye_y - 2)], fill=INK, width=4)
        d.line([(cx + eye_dx + er, eye_y - er - 4), (cx + eye_dx - er, eye_y - 2)], fill=INK, width=4)
    else:
        circ(d, cx - eye_dx, eye_y, er, INK)
        circ(d, cx + eye_dx, eye_y, er, INK)
    mouth_w = r // 2
    my = cy + r // 3
    if mood in ("smile", "love", "shut"):
        d.arc([cx - mouth_w, my - r // 5, cx + mouth_w, my + r // 2], 20, 160, fill=RED, width=4)
    elif mood == "sad":
        d.arc([cx - mouth_w, my, cx + mouth_w, my + r // 2], 200, 340, fill=RED, width=4)
        d.ellipse([cx - eye_dx - 2, eye_y + er, cx - eye_dx + 6, eye_y + er + 16], fill=(140, 190, 230))
    elif mood == "angry":
        d.arc([cx - mouth_w, my, cx + mouth_w, my + r // 3], 200, 340, fill=RED, width=4)
    elif mood == "open":
        d.ellipse([cx - mouth_w // 2, my - 4, cx + mouth_w // 2, my + r // 3], fill=(180, 70, 80))
    if mood == "love":
        circ(d, cx - r // 2, cy + r // 8, r // 8, (255, 160, 170))
        circ(d, cx + r // 2, cy + r // 8, r // 8, (255, 160, 170))


def bowl(d, cx, cy, w=150, fill=(255, 248, 240), inner=(255, 236, 210)):
    d.pieslice([cx - w, cy - w // 3, cx + w, cy + w], 0, 180, fill=fill)
    d.pieslice([cx - w + 16, cy - w // 5, cx + w - 16, cy + w - 28], 0, 180, fill=inner)
    d.ellipse([cx - w, cy - 18, cx + w, cy + 18], fill=fill)


def steam(d, cx, cy):
    for i, x in enumerate((cx - 36, cx, cx + 36)):
        d.arc([x - 12, cy - 50 - i * 6, x + 12, cy - 10], 200, 340, fill=(255, 255, 255), width=4)


def cup(d, cx, cy, liquid=TEAL):
    rr(d, [cx - 40, cy - 20, cx + 40, cy + 70], 12, WHITE)
    rr(d, [cx - 28, cy - 4, cx + 28, cy + 56], 8, liquid)
    d.arc([cx + 30, cy, cx + 70, cy + 50], 280, 80, fill=WHITE, width=8)


def house(d, cx, cy, s=1.0, wall=(255, 248, 240), roof=RED):
    rr(d, [cx - int(70 * s), cy - int(10 * s), cx + int(70 * s), cy + int(80 * s)], 6, wall)
    d.polygon(
        [
            (cx - int(90 * s), cy - int(10 * s)),
            (cx, cy - int(80 * s)),
            (cx + int(90 * s), cy - int(10 * s)),
        ],
        fill=roof,
    )
    rr(d, [cx - int(16 * s), cy + int(28 * s), cx + int(16 * s), cy + int(80 * s)], 3, WOOD)


def sun(d, cx, cy, r=48):
    circ(d, cx, cy, r, YELLOW)
    for i in range(8):
        a = math.radians(i * 45)
        x1 = cx + int((r + 8) * math.cos(a))
        y1 = cy + int((r + 8) * math.sin(a))
        x2 = cx + int((r + 26) * math.cos(a))
        y2 = cy + int((r + 26) * math.sin(a))
        d.line([(x1, y1), (x2, y2)], fill=YELLOW, width=6)


def cloud(d, cx, cy, s=1.0, fill=WHITE):
    circ(d, cx, cy, int(36 * s), fill)
    circ(d, cx - int(40 * s), cy + int(8 * s), int(28 * s), fill)
    circ(d, cx + int(42 * s), cy + int(10 * s), int(30 * s), fill)


def heart(d, cx, cy, s=1.0, fill=RED):
    r = int(22 * s)
    circ(d, cx - r // 2, cy, r, fill)
    circ(d, cx + r // 2, cy, r, fill)
    d.polygon([(cx - r - 4, cy + 6), (cx + r + 4, cy + 6), (cx, cy + int(48 * s))], fill=fill)


def coin(d, cx, cy, r=36, fill=YELLOW):
    circ(d, cx, cy, r, fill, outline=(220, 160, 40), w=4)
    circ(d, cx, cy, r // 2, (255, 230, 140))


def arrow(d, x0, y0, x1, y1, fill=ORANGE, w=16):
    d.line([(x0, y0), (x1, y1)], fill=fill, width=w)
    ang = math.atan2(y1 - y0, x1 - x0)
    ah = 28
    p1 = (x1, y1)
    p2 = (x1 - ah * math.cos(ang - 0.45), y1 - ah * math.sin(ang - 0.45))
    p3 = (x1 - ah * math.cos(ang + 0.45), y1 - ah * math.sin(ang + 0.45))
    d.polygon([p1, p2, p3], fill=fill)


def car(d, cx, cy, s=1.0, body=BLUE):
    rr(d, [cx - int(110 * s), cy - int(10 * s), cx + int(110 * s), cy + int(50 * s)], 16, body)
    d.polygon(
        [
            (cx - int(40 * s), cy - int(10 * s)),
            (cx - int(10 * s), cy - int(55 * s)),
            (cx + int(50 * s), cy - int(55 * s)),
            (cx + int(80 * s), cy - int(10 * s)),
        ],
        fill=(190, 225, 245),
    )
    circ(d, cx - int(60 * s), cy + int(52 * s), int(22 * s), INK)
    circ(d, cx + int(60 * s), cy + int(52 * s), int(22 * s), INK)
    circ(d, cx - int(60 * s), cy + int(52 * s), int(10 * s), WHITE)
    circ(d, cx + int(60 * s), cy + int(52 * s), int(10 * s), WHITE)


SCENES = {}


def scene(key):
    def wrap(fn):
        SCENES[key] = fn
        return fn
    return wrap


# ----- Day 2 food -----

@scene("d2_shoku")
def d2_shoku(d):
    bowl(d, 256, 250, 150, inner=(255, 244, 220))
    steam(d, 256, 200)
    d.line([(150, 150), (200, 250)], fill=WOOD, width=8)
    d.line([(360, 150), (310, 250)], fill=WOOD, width=8)


@scene("d2_in")
def d2_in(d):
    cup(d, 250, 230, (120, 190, 230))
    rr(d, [300, 150, 312, 250], 4, PINK)
    circ(d, 306, 140, 10, PINK)


@scene("d2_han")
def d2_han(d):
    bowl(d, 256, 270, 140)
    circ(d, 220, 250, 28, WHITE)
    circ(d, 270, 240, 30, WHITE)
    circ(d, 250, 280, 26, WHITE)


@scene("d2_ryo")
def d2_ryo(d):
    rr(d, [90, 300, 420, 360], 12, WOOD)
    d.ellipse([140, 180, 230, 280], fill=ORANGE)
    circ(d, 280, 230, 40, (255, 230, 140))
    circ(d, 350, 250, 28, GREEN)


@scene("d2_ri")
def d2_ri(d):
    d.ellipse([120, 250, 390, 340], fill=INK)
    d.ellipse([140, 230, 370, 310], fill=(90, 96, 110))
    d.pieslice([160, 200, 350, 300], 200, 340, fill=(255, 196, 120))
    rr(d, [300, 150, 330, 250], 6, WOOD)


@scene("d2_mi")
def d2_mi(d):
    face(d, 200, 250, 90, "love")
    rr(d, [320, 220, 390, 250], 8, WHITE)
    d.polygon([(330, 250), (350, 280), (360, 250)], fill=WHITE)


@scene("d2_kan")
def d2_kan(d):
    rr(d, [150, 230, 360, 340], 16, PINK)
    rr(d, [170, 180, 340, 250], 20, WHITE)
    circ(d, 255, 200, 16, RED)


@scene("d2_shin")
def d2_shin(d):
    d.polygon([(256, 120), (300, 360), (212, 360)], fill=RED)
    d.polygon([(256, 170), (280, 330), (232, 330)], fill=(255, 140, 80))
    d.ellipse([230, 100, 282, 150], fill=GREEN)


@scene("d2_en")
def d2_en(d):
    # salt shaker: cap, holes, glass body, salt pile
    rr(d, [196, 150, 316, 200], 16, (230, 230, 236))
    for x, y in ((226, 168), (256, 168), (286, 168), (241, 186), (271, 186)):
        circ(d, x, y, 4, (180, 180, 188))
    rr(d, [188, 198, 324, 360], 28, (255, 255, 255))
    d.pieslice([200, 250, 312, 350], 0, 180, fill=(248, 248, 252))
    d.ellipse([150, 360, 230, 400], fill=WHITE)
    d.ellipse([230, 370, 330, 415], fill=WHITE)
    d.ellipse([190, 385, 280, 430], fill=WHITE)


@scene("d2_niku")
def d2_niku(d):
    d.ellipse([140, 200, 380, 340], fill=(196, 92, 78))
    d.ellipse([180, 230, 250, 290], fill=(230, 140, 110))
    rr(d, [120, 330, 400, 370], 10, WHITE)


@scene("d2_gyo")
def d2_gyo(d):
    d.ellipse([110, 210, 390, 330], fill=(120, 180, 210))
    d.polygon([(380, 250), (450, 210), (450, 330), (380, 290)], fill=(100, 160, 190))
    circ(d, 180, 260, 10, WHITE)
    circ(d, 180, 260, 5, INK)


@scene("d2_ya")
def d2_ya(d):
    d.ellipse([40, 300, 470, 460], fill=(150, 200, 120))
    for x in (140, 220, 300, 380):
        d.polygon([(x, 300), (x - 20, 200), (x + 20, 200)], fill=GREEN)
        circ(d, x, 190, 16, (255, 120, 110))


@scene("d2_sai")
def d2_sai(d):
    d.ellipse([160, 160, 360, 400], fill=(90, 170, 90))
    d.ellipse([200, 200, 330, 360], fill=(140, 200, 110))
    rr(d, [240, 360, 270, 440], 6, (90, 150, 70))


@scene("d2_bei")
def d2_bei(d):
    for i, (x, y) in enumerate([(180, 220), (240, 200), (300, 230), (210, 280), (270, 270), (330, 290), (240, 330), (300, 340)]):
        d.ellipse([x, y, x + 36, y + 22], fill=WHITE)


@scene("d2_cha")
def d2_cha(d):
    d.pieslice([150, 180, 360, 400], 0, 180, fill=(90, 150, 110))
    d.ellipse([150, 250, 360, 310], fill=(120, 180, 130))
    steam(d, 255, 200)


@scene("d2_shu")
def d2_shu(d):
    rr(d, [150, 140, 250, 360], 30, (230, 230, 235))
    rr(d, [165, 180, 235, 340], 16, (255, 248, 240))
    d.pieslice([300, 250, 400, 340], 0, 180, fill=WHITE)
    rr(d, [330, 230, 370, 270], 6, WHITE)


@scene("d2_ten")
def d2_ten(d):
    rr(d, [110, 200, 400, 400], 8, (255, 246, 236))
    d.polygon([(90, 210), (256, 110), (420, 210)], fill=ORANGE)
    rr(d, [220, 280, 300, 400], 6, (120, 170, 200))
    rr(d, [140, 250, 200, 310], 6, (190, 220, 240))


@scene("d2_chuu")
def d2_chuu(d):
    rr(d, [150, 120, 340, 390], 12, WHITE)
    for y in (180, 230, 280, 330):
        d.line([(180, y), (310, y)], fill=(220, 210, 220), width=4)
    rr(d, [340, 160, 390, 230], 6, YELLOW)


@scene("d2_netsu")
def d2_netsu(d):
    bowl(d, 256, 280, 130, inner=(255, 180, 140))
    steam(d, 256, 210)
    circ(d, 120, 180, 20, RED)
    circ(d, 390, 190, 16, ORANGE)


@scene("d2_rei")
def d2_rei(d):
    cup(d, 250, 240, (180, 220, 245))
    for x, y in ((160, 180), (340, 160), (380, 250)):
        rr(d, [x, y, x + 28, y + 28], 6, (200, 230, 255))


# ----- Day 3 home -----

@scene("d3_ie")
def d3_ie(d):
    ground(d)
    house(d, 256, 250, 1.4)


@scene("d3_shitsu")
def d3_shitsu(d):
    rr(d, [80, 120, 430, 400], 12, (236, 214, 170))
    for y in (200, 250, 300, 350):
        d.line([(100, y), (410, y)], fill=(214, 186, 130), width=3)
    rr(d, [200, 250, 310, 360], 8, (120, 90, 70))


@scene("d3_bu")
def d3_bu(d):
    rr(d, [90, 120, 420, 400], 12, (245, 245, 250), outline=(180, 180, 190), w=4)
    d.line([(255, 120), (255, 400)], fill=(180, 180, 190), width=4)
    d.line([(90, 260), (420, 260)], fill=(180, 180, 190), width=4)


@scene("d3_oku")
def d3_oku(d):
    d.polygon([(60, 300), (256, 120), (452, 300)], fill=RED)
    rr(d, [140, 300, 370, 340], 4, WOOD)


@scene("d3_to")
def d3_to(d):
    rr(d, [150, 90, 360, 430], 8, WOOD)
    rr(d, [170, 120, 250, 400], 4, (176, 128, 84))
    rr(d, [260, 120, 340, 400], 4, (186, 138, 92))
    circ(d, 248, 260, 8, YELLOW)


@scene("d3_mado")
def d3_mado(d):
    rr(d, [120, 110, 390, 380], 10, WHITE)
    rr(d, [145, 135, 250, 240], 4, (170, 210, 240))
    rr(d, [265, 135, 365, 240], 4, (170, 210, 240))
    rr(d, [145, 255, 250, 355], 4, (170, 210, 240))
    rr(d, [265, 255, 365, 355], 4, (170, 210, 240))
    d.polygon([(100, 200), (70, 380), (140, 380)], fill=PINK)


@scene("d3_tsukue")
def d3_tsukue(d):
    rr(d, [80, 240, 430, 290], 8, WOOD)
    rr(d, [120, 290, 150, 420], 6, WOOD)
    rr(d, [360, 290, 390, 420], 6, WOOD)
    rr(d, [180, 160, 320, 240], 6, (230, 236, 245))


@scene("d3_shin_ne")
def d3_shin_ne(d):
    rr(d, [90, 280, 430, 390], 24, WHITE)
    rr(d, [110, 250, 250, 330], 16, (200, 220, 250))
    face(d, 180, 250, 40, "shut")
    circ(d, 400, 120, 28, (255, 244, 180))


@scene("d3_ki")
def d3_ki(d):
    sun(d, 390, 130, 36)
    person(d, 240, 270, 1.0, shirt=ORANGE)
    d.line([(150, 180), (190, 150)], fill=SKIN, width=8)


@scene("d3_sen")
def d3_sen(d):
    rr(d, [120, 200, 390, 280], 10, (200, 206, 214))
    d.ellipse([170, 230, 340, 360], fill=(180, 210, 230))
    d.ellipse([200, 250, 310, 330], fill=(140, 190, 220))
    circ(d, 255, 180, 10, BLUE)


@scene("d3_sou")
def d3_sou(d):
    d.line([(180, 120), (300, 360)], fill=WOOD, width=10)
    for i in range(6):
        d.line([(280 + i * 8, 340), (320 + i * 8, 420)], fill=(120, 90, 60), width=4)


@scene("d3_jo")
def d3_jo(d):
    d.line([(160, 140), (250, 320)], fill=WOOD, width=10)
    rr(d, [230, 310, 360, 390], 8, (180, 186, 196))
    for x in (120, 160, 200):
        circ(d, x, 400, 6, YELLOW)


@scene("d3_den")
def d3_den(d):
    circ(d, 256, 230, 70, YELLOW)
    rr(d, [230, 290, 282, 340], 6, (210, 210, 216))
    d.line([(256, 120), (256, 160)], fill=YELLOW, width=6)
    d.line([(150, 180), (190, 210)], fill=YELLOW, width=6)
    d.line([(360, 180), (320, 210)], fill=YELLOW, width=6)


@scene("d3_sui")
def d3_sui(d):
    d.ellipse([190, 140, 320, 300], fill=BLUE)
    d.polygon([(220, 250), (290, 250), (256, 390)], fill=BLUE)
    circ(d, 240, 190, 10, WHITE)


@scene("d3_ka")
def d3_ka(d):
    d.polygon([(256, 120), (320, 360), (192, 360)], fill=ORANGE)
    d.polygon([(256, 180), (290, 340), (222, 340)], fill=YELLOW)
    rr(d, [210, 350, 300, 390], 6, WOOD)


@scene("d3_juu")
def d3_juu(d):
    house(d, 256, 230, 1.15)
    person(d, 256, 300, 0.55, shirt=PINK)


@scene("d3_nyuu")
def d3_nyuu(d):
    rr(d, [250, 140, 420, 400], 8, (230, 236, 245))
    rr(d, [300, 230, 380, 400], 6, (170, 200, 220))
    arrow(d, 80, 270, 240, 270, GREEN)


@scene("d3_shutsu")
def d3_shutsu(d):
    rr(d, [80, 140, 250, 400], 8, (230, 236, 245))
    rr(d, [120, 230, 200, 400], 6, (170, 200, 220))
    arrow(d, 270, 270, 430, 270, ORANGE)


@scene("d3_ken")
def d3_ken(d):
    circ(d, 180, 180, 40, YELLOW, outline=(210, 160, 40), w=8)
    circ(d, 180, 180, 16, PASTELS[1])
    rr(d, [200, 165, 390, 200], 8, YELLOW)
    rr(d, [340, 200, 360, 240], 3, YELLOW)
    rr(d, [300, 200, 318, 230], 3, YELLOW)


@scene("d3_seki")
def d3_seki(d):
    rr(d, [150, 180, 360, 280], 20, PINK)
    rr(d, [170, 280, 210, 420], 8, WOOD)
    rr(d, [300, 280, 340, 420], 8, WOOD)
    rr(d, [140, 160, 200, 240], 12, PINK)


# ----- Day 4 going out -----

@scene("d4_sha")
def d4_sha(d):
    ground(d)
    car(d, 256, 240, 1.15)


@scene("d4_dou")
def d4_dou(d):
    d.polygon([(40, 430), (200, 160), (300, 160), (140, 430)], fill=(170, 176, 186))
    d.line([(230, 200), (230, 250)], fill=YELLOW, width=8)
    d.line([(210, 280), (210, 330)], fill=YELLOW, width=8)
    d.line([(190, 360), (190, 400)], fill=YELLOW, width=8)


@scene("d4_ho")
def d4_ho(d):
    ground(d)
    person(d, 250, 250, 1.05, shirt=GREEN)
    d.line([(300, 220), (350, 190)], fill=SKIN, width=8)


@scene("d4_sou_hashi")
def d4_sou_hashi(d):
    person(d, 320, 250, 1.0, shirt=RED)
    for y in (180, 230, 280, 330):
        d.line([(60, y), (180, y)], fill=ORANGE, width=8)


@scene("d4_chaku")
def d4_chaku(d):
    d.line([(256, 160), (256, 390)], fill=INK, width=6)
    d.polygon([(256, 150), (330, 200), (256, 230)], fill=RED)
    circ(d, 256, 400, 16, INK)
    circ(d, 180, 300, 30, GREEN)


@scene("d4_okuru")
def d4_okuru(d):
    person(d, 140, 270, 0.85, shirt=PINK)
    car(d, 340, 280, 0.7)
    d.line([(180, 210), (220, 180)], fill=SKIN, width=6)


@scene("d4_gei")
def d4_gei(d):
    house(d, 360, 240, 0.9)
    person(d, 180, 280, 0.9, shirt=ORANGE)
    d.line([(140, 230), (110, 190)], fill=SKIN, width=7)
    d.line([(220, 230), (260, 190)], fill=SKIN, width=7)


@scene("d4_un")
def d4_un(d):
    person(d, 230, 270, 0.95, shirt=TEAL)
    rr(d, [280, 200, 390, 290], 10, ORANGE)


@scene("d4_ten_koro")
def d4_ten_koro(d):
    circ(d, 160, 320, 48, INK)
    circ(d, 160, 320, 16, WHITE)
    circ(d, 340, 320, 48, INK)
    circ(d, 340, 320, 16, WHITE)
    d.line([(160, 320), (250, 200), (340, 280)], fill=TEAL, width=10)
    rr(d, [230, 170, 280, 200], 6, RED)


@scene("d4_shi_to")
def d4_shi_to(d):
    circ(d, 180, 180, 50, RED)
    circ(d, 180, 180, 36, (80, 40, 40))
    circ(d, 180, 180, 16, YELLOW)
    car(d, 300, 300, 0.65, body=(180, 180, 190))


@scene("d4_u")
def d4_u(d):
    arrow(d, 120, 256, 390, 256, BLUE, 22)


@scene("d4_sa")
def d4_sa(d):
    arrow(d, 390, 256, 120, 256, PINK, 22)


@scene("d4_zen")
def d4_zen(d):
    arrow(d, 256, 390, 256, 120, GREEN, 22)


@scene("d4_go")
def d4_go(d):
    arrow(d, 256, 120, 256, 390, ORANGE, 22)


@scene("d4_kin")
def d4_kin(d):
    house(d, 160, 250, 0.85)
    house(d, 340, 260, 0.75, roof=BLUE)


@scene("d4_en_too")
def d4_en_too(d):
    d.line([(40, 340), (470, 300)], fill=(190, 210, 170), width=8)
    house(d, 400, 230, 0.35, roof=RED)
    sun(d, 120, 140, 28)


@scene("d4_kyou")
def d4_kyou(d):
    d.rectangle([0, 300, 512, 430], fill=(150, 200, 230))
    d.arc([80, 160, 430, 360], 200, 340, fill=WOOD, width=18)
    rr(d, [150, 250, 175, 340], 4, WOOD)
    rr(d, [330, 250, 355, 340], 4, WOOD)


@scene("d4_kou")
def d4_kou(d):
    d.rectangle([0, 280, 512, 512], fill=(120, 180, 210))
    d.polygon([(40, 280), (180, 200), (200, 280)], fill=(210, 200, 170))
    rr(d, [280, 230, 420, 280], 6, WOOD)
    d.polygon([(300, 250), (360, 180), (390, 250)], fill=WHITE)


@scene("d4_sen_fune")
def d4_sen_fune(d):
    d.rectangle([0, 300, 512, 512], fill=(140, 196, 220))
    d.polygon([(80, 300), (430, 300), (380, 360), (130, 360)], fill=WHITE)
    rr(d, [200, 220, 280, 300], 6, BLUE)
    d.polygon([(240, 150), (240, 230), (320, 230)], fill=WHITE)


@scene("d4_hi_tobu")
def d4_hi_tobu(d):
    d.polygon([(80, 260), (360, 230), (420, 250), (360, 280), (80, 290)], fill=BLUE)
    d.polygon([(300, 180), (340, 240), (300, 250)], fill=(80, 140, 190))
    d.polygon([(200, 250), (230, 330), (180, 270)], fill=(80, 140, 190))
    cloud(d, 120, 360, 0.7)


# ----- Day 5 time and weather -----

@scene("d5_ji")
def d5_ji(d):
    circ(d, 256, 250, 120, WHITE, outline=INK, w=8)
    circ(d, 256, 250, 8, INK)
    d.line([(256, 250), (256, 160)], fill=INK, width=6)
    d.line([(256, 250), (330, 280)], fill=RED, width=6)


@scene("d5_kan_aida")
def d5_kan_aida(d):
    rr(d, [70, 180, 180, 340], 12, BLUE)
    rr(d, [330, 180, 440, 340], 12, PINK)
    d.line([(200, 260), (310, 260)], fill=ORANGE, width=6)


@scene("d5_fun")
def d5_fun(d):
    circ(d, 256, 256, 110, WHITE, outline=INK, w=8)
    d.pieslice([146, 146, 366, 366], 270, 330, fill=YELLOW)
    circ(d, 256, 256, 8, INK)


@scene("d5_kon")
def d5_kon(d):
    circ(d, 180, 250, 80, WHITE, outline=BLUE, w=8)
    circ(d, 180, 250, 8, BLUE)
    d.line([(180, 250), (180, 190)], fill=BLUE, width=6)
    person(d, 360, 280, 0.7, shirt=ORANGE)


@scene("d5_chou")
def d5_chou(d):
    sun(d, 140, 300, 50)
    d.rectangle([0, 300, 512, 512], fill=(255, 220, 170))
    cloud(d, 360, 160, 0.8, (255, 236, 220))


@scene("d5_chuu_hiru")
def d5_chuu_hiru(d):
    sun(d, 256, 180, 60)
    d.rectangle([0, 360, 512, 512], fill=(255, 214, 140))


@scene("d5_ya_yoru")
def d5_ya_yoru(d):
    # night overlay on pastel: draw a dark rounded panel
    rr(d, [40, 40, 472, 472], 40, (64, 74, 120))
    circ(d, 160, 160, 40, (255, 244, 200))
    circ(d, 180, 148, 36, (64, 74, 120))
    for x, y, r in ((300, 120, 4), (360, 180, 3), (320, 240, 4), (400, 140, 3)):
        circ(d, x, y, r, WHITE)


@scene("d5_shuu")
def d5_shuu(d):
    for i in range(7):
        x = 50 + i * 62
        fill = PINK if i == 2 else WHITE
        rr(d, [x, 190, x + 50, 300], 8, fill, outline=(220, 200, 210), w=3)


@scene("d5_you")
def d5_you(d):
    rr(d, [120, 100, 390, 410], 16, WHITE)
    rr(d, [120, 100, 390, 170], 16, ORANGE)
    sun(d, 256, 280, 40)


@scene("d5_nen")
def d5_nen(d):
    rr(d, [110, 90, 400, 420], 12, WHITE)
    for r in range(4):
        for c in range(3):
            rr(d, [140 + c * 80, 150 + r * 60, 200 + c * 80, 195 + r * 60], 6, (255, 236, 230))


@scene("d5_getsu")
def d5_getsu(d):
    circ(d, 240, 250, 90, (255, 244, 190))
    circ(d, 280, 230, 80, PASTELS[4])


@scene("d5_nichi")
def d5_nichi(d):
    sun(d, 256, 250, 70)


@scene("d5_shun")
def d5_shun(d):
    rr(d, [240, 250, 270, 420], 6, WOOD)
    for x, y in ((180, 180), (250, 140), (320, 190), (200, 250), (310, 250)):
        circ(d, x, y, 22, PINK)
        circ(d, x, y, 8, WHITE)


@scene("d5_ka_natsu")
def d5_ka_natsu(d):
    sun(d, 150, 150, 40)
    circ(d, 300, 280, 80, GREEN)
    circ(d, 300, 280, 50, RED)
    circ(d, 300, 280, 16, INK)


@scene("d5_shuu_aki")
def d5_shuu_aki(d):
    d.polygon([(256, 120), (340, 250), (256, 230), (172, 250)], fill=(214, 84, 60))
    d.polygon([(256, 200), (330, 340), (256, 310), (182, 340)], fill=ORANGE)
    rr(d, [246, 330, 266, 420], 4, WOOD)


@scene("d5_tou")
def d5_tou(d):
    circ(d, 256, 300, 70, WHITE)
    circ(d, 256, 210, 50, WHITE)
    circ(d, 256, 145, 32, WHITE)
    circ(d, 244, 140, 4, INK)
    circ(d, 268, 140, 4, INK)
    d.polygon([(300, 150), (360, 170), (300, 185)], fill=ORANGE)


@scene("d5_u_ame")
def d5_u_ame(d):
    cloud(d, 256, 180, 1.4, (150, 166, 184))
    for x in (160, 210, 260, 310, 360):
        d.line([(x, 250), (x - 20, 360)], fill=BLUE, width=5)


@scene("d5_fuu")
def d5_fuu(d):
    for y, x0 in ((160, 80), (230, 60), (300, 100)):
        d.arc([x0, y, x0 + 280, y + 80], 200, 340, fill=BLUE, width=8)
    rr(d, [340, 260, 370, 420], 6, WOOD)
    d.ellipse([300, 180, 430, 280], fill=GREEN)


@scene("d5_sei")
def d5_sei(d):
    sun(d, 256, 230, 64)
    d.rectangle([0, 380, 512, 512], fill=(190, 220, 170))


@scene("d5_sho")
def d5_sho(d):
    sun(d, 256, 150, 48)
    person(d, 256, 300, 0.85, shirt=ORANGE)
    d.ellipse([300, 230, 322, 260], fill=BLUE)


# ----- Day 6 people -----

@scene("d6_jin")
def d6_jin(d):
    ground(d)
    person(d, 256, 250, 1.15, shirt=BLUE)


@scene("d6_yuu")
def d6_yuu(d):
    ground(d)
    person(d, 180, 260, 0.9, shirt=BLUE)
    person(d, 330, 260, 0.9, shirt=PINK, hair=HAIR_F)
    heart(d, 256, 140, 0.7)


@scene("d6_shin_oya")
def d6_shin_oya(d):
    ground(d)
    person(d, 190, 250, 1.05, shirt=TEAL)
    person(d, 320, 300, 0.6, shirt=YELLOW, hair=HAIR_F)


@scene("d6_zoku")
def d6_zoku(d):
    ground(d)
    person(d, 140, 260, 0.75, shirt=BLUE)
    person(d, 250, 250, 0.8, shirt=PINK, hair=HAIR_F)
    person(d, 340, 300, 0.5, shirt=YELLOW)
    person(d, 400, 305, 0.45, shirt=ORANGE, hair=HAIR_F)


@scene("d6_hi_kare")
def d6_hi_kare(d):
    ground(d)
    person(d, 240, 260, 1.05, shirt=NAVY)
    heart(d, 360, 180, 0.6)


@scene("d6_jo")
def d6_jo(d):
    ground(d)
    person(d, 256, 250, 1.1, shirt=PINK, hair=HAIR_F)
    d.ellipse([210, 175, 302, 230], fill=HAIR_F)


@scene("d6_dan")
def d6_dan(d):
    ground(d)
    person(d, 256, 250, 1.1, shirt=NAVY, hair=HAIR)


@scene("d6_shi_ko")
def d6_shi_ko(d):
    ground(d)
    person(d, 256, 280, 0.7, shirt=YELLOW, hair=HAIR_F)


@scene("d6_shi_wata")
def d6_shi_wata(d):
    ground(d)
    person(d, 270, 260, 1.05, shirt=(180, 150, 220))
    d.line([(210, 230), (160, 280)], fill=SKIN, width=8)
    circ(d, 145, 300, 14, SKIN)


@scene("d6_kou_su")
def d6_kou_su(d):
    face(d, 180, 250, 80, "love")
    heart(d, 360, 240, 1.3)


@scene("d6_ken_iya")
def d6_ken_iya(d):
    face(d, 190, 250, 80, "angry")
    circ(d, 370, 240, 50, WHITE, outline=RED, w=8)
    d.line([(340, 210), (400, 270)], fill=RED, width=8)


@scene("d6_raku")
def d6_raku(d):
    face(d, 256, 250, 110, "open")
    for x, y in ((120, 140), (380, 150), (140, 360)):
        circ(d, x, y, 10, YELLOW)


@scene("d6_hi_kana")
def d6_hi_kana(d):
    face(d, 256, 250, 110, "sad")


@scene("d6_do")
def d6_do(d):
    face(d, 256, 260, 110, "angry")
    d.polygon([(150, 120), (190, 120), (160, 170)], fill=RED)
    d.polygon([(360, 110), (330, 110), (350, 165)], fill=RED)


@scene("d6_shou")
def d6_shou(d):
    face(d, 256, 250, 110, "open")
    d.arc([150, 150, 362, 360], 200, 340, fill=RED, width=0)


@scene("d6_kyuu")
def d6_kyuu(d):
    face(d, 256, 250, 100, "sad")
    d.ellipse([190, 280, 210, 340], fill=BLUE)
    d.ellipse([300, 270, 322, 340], fill=BLUE)


@scene("d6_kokoro")
def d6_kokoro(d):
    heart(d, 256, 220, 2.4, RED)


@scene("d6_shi_omo")
def d6_shi_omo(d):
    person(d, 180, 280, 0.9, shirt=BLUE)
    rr(d, [280, 120, 430, 230], 20, WHITE)
    circ(d, 330, 200, 8, (220, 210, 220))
    circ(d, 355, 200, 8, (220, 210, 220))
    circ(d, 380, 200, 8, (220, 210, 220))


@scene("d6_chi")
def d6_chi(d):
    person(d, 256, 300, 0.85, shirt=TEAL)
    circ(d, 256, 140, 36, YELLOW)
    rr(d, [240, 168, 272, 190], 4, (230, 200, 80))


@scene("d6_wa")
def d6_wa(d):
    person(d, 160, 280, 0.8, shirt=BLUE)
    person(d, 360, 280, 0.8, shirt=PINK, hair=HAIR_F)
    rr(d, [200, 140, 310, 210], 16, WHITE)
    d.polygon([(230, 210), (250, 245), (270, 210)], fill=WHITE)


# ----- Day 7 body and shopping -----

@scene("d7_tai")
def d7_tai(d):
    ground(d)
    person(d, 256, 240, 1.25, shirt=(255, 176, 140))


@scene("d7_tou_atama")
def d7_tou_atama(d):
    face(d, 256, 240, 120, "smile")
    arrow(d, 256, 70, 256, 110, ORANGE, 10)


@scene("d7_gan")
def d7_gan(d):
    face(d, 256, 256, 140, "smile")


@scene("d7_moku")
def d7_moku(d):
    d.ellipse([110, 180, 400, 340], fill=WHITE, outline=INK, width=6)
    circ(d, 256, 260, 55, (120, 170, 210))
    circ(d, 256, 260, 28, INK)
    circ(d, 270, 245, 10, WHITE)


@scene("d7_ji_mimi")
def d7_ji_mimi(d):
    d.ellipse([160, 80, 360, 420], fill=SKIN, outline=(230, 180, 150), width=6)
    d.ellipse([210, 140, 320, 360], fill=(255, 196, 176))
    d.ellipse([230, 200, 300, 300], fill=(240, 160, 150))


@scene("d7_kou_kuchi")
def d7_kou_kuchi(d):
    d.ellipse([100, 200, 410, 330], fill=(214, 96, 110))
    d.ellipse([130, 215, 380, 300], fill=(240, 140, 150))
    rr(d, [160, 240, 350, 275], 10, WHITE)


@scene("d7_shu_te")
def d7_shu_te(d):
    circ(d, 256, 300, 70, SKIN)
    for i, x in enumerate((150, 200, 256, 312)):
        rr(d, [x, 120, x + 40, 250], 16, SKIN)
    rr(d, [330, 200, 400, 250], 16, SKIN)


@scene("d7_soku")
def d7_soku(d):
    d.ellipse([120, 220, 400, 360], fill=SKIN)
    rr(d, [150, 250, 230, 300], 10, RED)
    d.ellipse([300, 250, 420, 340], fill=(230, 90, 100))


@scene("d7_kin")
def d7_kin(d):
    coin(d, 180, 220, 50)
    coin(d, 250, 270, 60)
    coin(d, 340, 220, 46)
    rr(d, [150, 330, 360, 400], 8, (120, 180, 130))


@scene("d7_en_maru")
def d7_en_maru(d):
    circ(d, 256, 256, 140, YELLOW, outline=(220, 160, 40), w=10)
    circ(d, 256, 256, 40, PASTELS[3])


@scene("d7_kou_taka")
def d7_kou_taka(d):
    arrow(d, 160, 380, 160, 120, RED, 18)
    coin(d, 340, 200, 50)
    rr(d, [280, 280, 400, 360], 8, WHITE)


@scene("d7_an")
def d7_an(d):
    arrow(d, 160, 130, 160, 390, GREEN, 18)
    coin(d, 340, 320, 36)
    rr(d, [280, 160, 400, 230], 8, WHITE)


@scene("d7_hin")
def d7_hin(d):
    rr(d, [180, 120, 330, 230], 12, ORANGE)
    rr(d, [90, 260, 240, 370], 12, BLUE)
    rr(d, [270, 260, 420, 370], 12, PINK)


@scene("d7_butsu")
def d7_butsu(d):
    rr(d, [150, 180, 360, 380], 16, (255, 214, 120))
    d.polygon([(150, 180), (256, 120), (360, 180)], fill=RED)
    d.line([(256, 120), (256, 380)], fill=RED, width=10)


@scene("d7_chi_ne")
def d7_chi_ne(d):
    d.polygon([(200, 140), (340, 140), (360, 190), (180, 190)], fill=YELLOW)
    rr(d, [230, 190, 270, 390], 6, WOOD)
    d.line([(220, 210), (320, 210)], fill=ORANGE, width=4)


@scene("d7_tai_fukuro")
def d7_tai_fukuro(d):
    d.polygon([(160, 180), (350, 180), (390, 420), (120, 420)], fill=PINK)
    d.arc([180, 100, 250, 200], 200, 340, fill=WOOD, width=8)
    d.arc([260, 100, 330, 200], 200, 340, fill=WOOD, width=8)


@scene("d7_fuku")
def d7_fuku(d):
    d.polygon(
        [(180, 160), (330, 160), (360, 210), (300, 230), (300, 400), (210, 400), (210, 230), (150, 210)],
        fill=BLUE,
    )
    d.polygon([(180, 160), (256, 210), (330, 160), (300, 140), (210, 140)], fill=(90, 150, 196))


@scene("d7_dai")
def d7_dai(d):
    person(d, 150, 280, 0.7, shirt=BLUE)
    person(d, 370, 280, 0.7, shirt=PINK, hair=HAIR_F)
    coin(d, 256, 240, 28)
    arrow(d, 190, 250, 300, 250, YELLOW, 8)


@scene("d7_kyaku")
def d7_kyaku(d):
    rr(d, [80, 250, 250, 310], 8, WOOD)
    person(d, 160, 200, 0.65, shirt=ORANGE)
    person(d, 360, 260, 0.85, shirt=TEAL)


@scene("d7_in_staff")
def d7_in_staff(d):
    person(d, 256, 260, 1.05, shirt=WHITE)
    rr(d, [210, 230, 302, 330], 8, TEAL)
    rr(d, [180, 150, 332, 185], 8, TEAL)


def write_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")


def main():
    missing = []
    week_days = [{
        "id": DAY1["id"],
        "path": DAY1["dir"] + "/",
        "title": DAY1["title"],
        "meta": DAY1["meta"],
    }]
    for day in DAYS:
        rows = card_dicts(day)
        out_dir = os.path.join(ROOT, day["dir"])
        img_dir = os.path.join(out_dir, "images")
        os.makedirs(img_dir, exist_ok=True)
        write_json(os.path.join(out_dir, "cards.json"), [
            {
                "id": c["id"],
                "kanji": c["kanji"],
                "readings": {"on": c["on"], "kun": c["kun"]},
                "meaning_zh_hk": c["meaning_zh_hk"],
                "meaning_en": c["meaning_en"],
                "example": c["example"],
                "image": c["image"],
            }
            for c in rows
        ])
        for c in rows:
            key = f"d{day['id']}_{c['slug']}"
            if key not in SCENES:
                missing.append(key)
                continue
            img, draw = canvas(c["id"] + day["id"] * 3)
            SCENES[key](draw)
            path = os.path.join(img_dir, os.path.basename(c["image"]))
            img.save(path, "PNG", optimize=True)
            print("OK", path)
        week_days.append({
            "id": day["id"],
            "path": day["dir"] + "/",
            "title": day["title"],
            "meta": day["meta"],
        })
    write_json(os.path.join(ROOT, "week.json"), {
        "id": 1,
        "label": "Week 1",
        "label_zh": "第一週",
        "days": week_days,
    })
    if missing:
        raise SystemExit("missing scenes: " + ", ".join(missing))
    print("week.json written")


if __name__ == "__main__":
    main()
