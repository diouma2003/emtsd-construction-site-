import cv2
import numpy as np

img = cv2.imread('public/assets/aistudio/WhatsApp_Image_2026-10-22_at_14.35.06_0fe865f4.jpeg')
h, w, c = img.shape
mask = np.zeros((h, w), dtype=np.uint8)

# 1. Top-Right contact section: x: 670 to 950, y: 30 to 280
# Background is bright sky/clouds. The text is dark gray/black and icons are orange/blue/purple.
roi_tr = img[30:280, 670:950]
gray_tr = cv2.cvtColor(roi_tr, cv2.COLOR_BGR2GRAY)
# In the sky, background is bright (> 200). Text is dark (< 180). Icons have high saturation.
hsv_tr = cv2.cvtColor(roi_tr, cv2.COLOR_BGR2HSV)
mask_tr = (gray_tr < 195) | (hsv_tr[:, :, 1] > 60)
mask[30:280, 670:950] = (mask_tr.astype(np.uint8)) * 255
# Also the thin vertical gold line at x: 670 to 675, y: 35 to 280
mask[35:280, 670:676] = 255

# 2. Mid-Right script: "Votre projet, notre engagement" and orange line
# x: 670 to 930, y: 310 to 415
roi_mr = img[310:415, 670:930]
gray_mr = cv2.cvtColor(roi_mr, cv2.COLOR_BGR2GRAY)
hsv_mr = cv2.cvtColor(roi_mr, cv2.COLOR_BGR2HSV)
mask_mr = (gray_mr < 180) | (hsv_mr[:, :, 1] > 60)
mask[310:415, 670:930] = (mask_mr.astype(np.uint8)) * 255

# 3. Mid-Left: "BÂTIR AUJOURD'HUI LES INFRASTRUCTURES DE DEMAIN" & sub-services
# x: 40 to 670, y: 250 to 480
roi_ml = img[250:480, 40:670]
gray_ml = cv2.cvtColor(roi_ml, cv2.COLOR_BGR2GRAY)
hsv_ml = cv2.cvtColor(roi_ml, cv2.COLOR_BGR2HSV)
# The text is dark blue, black, orange
mask_ml = (gray_ml < 190) | (hsv_ml[:, :, 1] > 60)
# Make sure we don't mask distant buildings below y=460 if they are dark:
# Distant skyline is below y=430 on the far left, so let's be careful around y:420-480
mask[250:480, 40:670] = (mask_ml.astype(np.uint8)) * 255

# 4. Top-Left Logo & subtitle
# x: 20 to 600, y: 30 to 240
roi_tl = img[30:240, 20:600]
gray_tl = cv2.cvtColor(roi_tl, cv2.COLOR_BGR2GRAY)
hsv_tl = cv2.cvtColor(roi_tl, cv2.COLOR_BGR2HSV)
mask_tl = (gray_tl < 205) | (hsv_tl[:, :, 1] > 40)
mask[30:240, 20:600] = (mask_tl.astype(np.uint8)) * 255

# 5. Bottom bar: icons and text
# x: 10 to 950, y: 1140 to 1270
roi_b = img[1140:1270, 10:950]
# Background is dark concrete (gray ~ 20 to 60). Text is white (gray > 120), icons are orange (hsv sat > 80, val > 80)
gray_b = cv2.cvtColor(roi_b, cv2.COLOR_BGR2GRAY)
hsv_b = cv2.cvtColor(roi_b, cv2.COLOR_BGR2HSV)
mask_b = (gray_b > 100) | ((hsv_b[:, :, 1] > 70) & (hsv_b[:, :, 2] > 70))
mask[1140:1270, 10:950] = (mask_b.astype(np.uint8)) * 255

# Dilate mask slightly to cover font anti-aliased borders
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
mask = cv2.dilate(mask, kernel, iterations=1)

# Ensure helmet, tablet, tools are NEVER masked:
# Helmet is roughly x: 0 to 480, y: 580 to 1100
# Tablet is roughly x: 380 to 760, y: 640 to 830
# Blueprints/tools: x: 500 to 957, y: 700 to 1140
mask[550:1140, :] = 0

cv2.imwrite('public/assets/images/test_mask.png', mask)
print('Mask saved, now running inpaint...')

res_telea = cv2.inpaint(img, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)
cv2.imwrite('public/assets/images/test_telea.jpg', res_telea, [cv2.IMWRITE_JPEG_QUALITY, 95])

res_ns = cv2.inpaint(img, mask, inpaintRadius=5, flags=cv2.INPAINT_NS)
cv2.imwrite('public/assets/images/test_ns.jpg', res_ns, [cv2.IMWRITE_JPEG_QUALITY, 95])
print('Done!')
