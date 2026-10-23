import cv2
import numpy as np

img = cv2.imread('public/assets/aistudio/WhatsApp_Image_2026-10-22_at_14.35.06_0fe865f4.jpeg')
h, w, c = img.shape
mask = np.zeros((h, w), dtype=np.uint8)

# 1. Top-Left Logo & Subtitle:
# The logo is inside x: 20 to 580, y: 30 to 235
# Let's inspect the bounding box
# If we mask the polygon or box around the logo:
# In the sky, the background is smooth clouds and blue sky.
# Let's see: y from 30 to 240, x from 20 to 590
# We can create a mask that covers the logo elements cleanly
# Or test covering [30:235, 25:580]
# But wait: what is behind the logo? The sky!
# Let's check what cv2.inpaint does when inpainting [30:235, 25:580]:
# cv2.inpaint interpolates from the border (which is the sky at y=25, y=240, x=20, x=585).
# The border is pure sky!
# Let's also check top-right:
# x: 660 to 957, y: 25 to 280
# Border is pure sky at x=660, y=20, y=285!
# Mid-left:
# "BÂTIR AUJOURD'HUI" y: 250 to 285, x: 40 to 450
# "LES INFRASTRUCTURES" y: 285 to 335, x: 40 to 670
# "DE DEMAIN" y: 330 to 395, x: 40 to 530
# "Construction ... Aménagement" y: 410 to 465, x: 45 to 500
# Mid-right:
# "Votre projet, notre engagement" y: 310 to 415, x: 670 to 930
# Bottom bar:
# y: 1140 to 1280, x: 10 to 950

# Let's test with exact tight boxes with feathered/smoothed edges or Telea/NS
cv2.rectangle(mask, (25, 30), (585, 235), 255, -1)
cv2.rectangle(mask, (665, 30), (955, 280), 255, -1)
cv2.rectangle(mask, (40, 250), (450, 285), 255, -1)
cv2.rectangle(mask, (40, 285), (670, 335), 255, -1)
cv2.rectangle(mask, (40, 330), (530, 395), 255, -1)
cv2.rectangle(mask, (45, 410), (500, 465), 255, -1)
cv2.rectangle(mask, (670, 310), (930, 415), 255, -1)
cv2.rectangle(mask, (10, 1140), (950, 1275), 255, -1)

# Ensure nothing in the foreground is touched:
mask[500:1135, :] = 0

cv2.imwrite('public/assets/images/solid_mask.png', mask)
print('Running cv2.inpaint...')

res_ns = cv2.inpaint(img, mask, inpaintRadius=7, flags=cv2.INPAINT_NS)
cv2.imwrite('public/assets/images/res_solid_ns.jpg', res_ns, [cv2.IMWRITE_JPEG_QUALITY, 95])
print('Solid inpaint done')
