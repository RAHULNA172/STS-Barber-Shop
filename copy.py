import shutil
import sys

src = '/home/addweb/.gemini/antigravity/brain/8ec16d52-b862-48af-bf3c-1ef983acd9b2/hero_image_1783942529610.png'
dest = '/home/addweb/barbar/STS-Barber-Shop/images/hero.jpg'

try:
    shutil.copy(src, dest)
    print("Success")
except Exception as e:
    print(e)
