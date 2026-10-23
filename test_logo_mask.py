import cv2
import numpy as np

img = cv2.imread('public/assets/aistudio/WhatsApp_Image_2026-10-22_at_14.35.06_0fe865f4.jpeg')
roi = img[25:240, 20:590]

# Convert to HSV and Gray
hsv = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)

# In the top left, the sky is mostly light blue and white clouds (low saturation, or hue in blue ~90-130).
# The logo has:
# - Green symbol: H ~ 35 to 85, S > 40
# - Orange / Yellow: H ~ 10 to 30, S > 50
# - Dark gray/black (M, D, T bar, CONSTRUCTION, REPRISE): V < 120 or (V < 180 and S < 30 and differs from sky)
# - Crane in T: H ~ 15 to 35, S > 40

mask_roi = np.zeros(roi.shape[:2], dtype=np.uint8)
# Orange/yellow
mask_roi[(hsv[:,:,0] >= 5) & (hsv[:,:,0] <= 32) & (hsv[:,:,1] >= 40)] = 255
# Green
mask_roi[(hsv[:,:,0] >= 35) & (hsv[:,:,0] <= 85) & (hsv[:,:,1] >= 40)] = 255
# Dark text / letters / lines
mask_roi[gray < 165] = 255

# Also, there are faint orange/yellow lines and circle:
mask_roi[(hsv[:,:,0] >= 10) & (hsv[:,:,0] <= 35) & (hsv[:,:,1] >= 25)] = 255

# Dilate slightly
k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
mask_roi = cv2.dilate(mask_roi, k, iterations=1)

cv2.imwrite('public/assets/images/mask_logo.png', mask_roi)
print('Mask percentage:', np.mean(mask_roi > 0))
