import cv2
import numpy as np

# Load original
orig = cv2.imread('public/assets/aistudio/WhatsApp_Image_2026-10-22_at_14.35.06_0fe865f4.jpeg')
h, w, c = orig.shape
result = orig.copy()

# Step 1: Bottom bar inpainting
# Mask the bottom icons, lines, and text
mask_bottom = np.zeros((h, w), dtype=np.uint8)
b_roi = orig[1130:1280, 10:950]
b_gray = cv2.cvtColor(b_roi, cv2.COLOR_BGR2GRAY)
b_hsv = cv2.cvtColor(b_roi, cv2.COLOR_BGR2HSV)
b_text = (b_gray > 90) | ((b_hsv[:,:,1] > 60) & (b_hsv[:,:,2] > 60))
mask_bottom[1130:1280, 10:950] = (b_text.astype(np.uint8)) * 255
# Dilate by 3
k_b = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
mask_bottom = cv2.dilate(mask_bottom, k_b, iterations=1)
result = cv2.inpaint(result, mask_bottom, inpaintRadius=5, flags=cv2.INPAINT_TELEA)

# Step 2: "Votre projet, notre engagement" script & orange line
mask_script = np.zeros((h, w), dtype=np.uint8)
s_roi = orig[310:415, 670:930]
s_gray = cv2.cvtColor(s_roi, cv2.COLOR_BGR2GRAY)
s_hsv = cv2.cvtColor(s_roi, cv2.COLOR_BGR2HSV)
s_text = (s_gray < 175) | (s_hsv[:,:,1] > 50)
mask_script[310:415, 670:930] = (s_text.astype(np.uint8)) * 255
mask_script = cv2.dilate(mask_script, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)), iterations=1)
result = cv2.inpaint(result, mask_script, inpaintRadius=5, flags=cv2.INPAINT_TELEA)

# Step 3: "Construction • Génie civil • Bâtiment / Travaux publics • Aménagement"
mask_services = np.zeros((h, w), dtype=np.uint8)
svc_roi = orig[405:470, 45:510]
svc_gray = cv2.cvtColor(svc_roi, cv2.COLOR_BGR2GRAY)
svc_hsv = cv2.cvtColor(svc_roi, cv2.COLOR_BGR2HSV)
svc_text = (svc_gray < 155) | (svc_hsv[:,:,1] > 60)
mask_services[405:470, 45:510] = (svc_text.astype(np.uint8)) * 255
mask_services = cv2.dilate(mask_services, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (4, 4)), iterations=1)
result = cv2.inpaint(result, mask_services, inpaintRadius=4, flags=cv2.INPAINT_TELEA)

# Step 4: Top-right contact block:
# Icons and text
mask_tr = np.zeros((h, w), dtype=np.uint8)
tr_roi = orig[30:290, 665:950]
tr_gray = cv2.cvtColor(tr_roi, cv2.COLOR_BGR2GRAY)
tr_hsv = cv2.cvtColor(tr_roi, cv2.COLOR_BGR2HSV)
tr_text = (tr_gray < 195) | (tr_hsv[:,:,1] > 40)
mask_tr[30:290, 665:950] = (tr_text.astype(np.uint8)) * 255
# thin divider line at 671
mask_tr[35:285, 668:675] = 255
mask_tr = cv2.dilate(mask_tr, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5)), iterations=1)
result = cv2.inpaint(result, mask_tr, inpaintRadius=5, flags=cv2.INPAINT_TELEA)

cv2.imwrite('public/assets/images/retouch_stage1.jpg', result, [cv2.IMWRITE_JPEG_QUALITY, 95])
print('Stage 1 done')
