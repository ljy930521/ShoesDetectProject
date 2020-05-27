import numpy as np
import cv2
from matplotlib import pyplot as plt
 
MIN_MATCH_COUNT = 10
 
img1 = cv2.imread('shoes.jpg',0) # queryImage
img2 = cv2.imread('shoes_fake2.jpg',0) # trainImage
 
# Initiate SIFT detector

orb = cv2.ORB_create()


# find the keypoints and descriptors with SIFT
kp1, des1 = orb.detectAndCompute(img1,None)
kp2, des2 = orb.detectAndCompute(img2,None)

FLANN_INDEX_KDTREE = 0
FLANN_INDEX_LSH = 6
index_params = dict(algorithm=FLANN_INDEX_LSH, table_number=6, key_size=12, multi_probe_level=1)
search_params = dict(checks = 50) #특성매칭을 위한 반복 횟수 크게잡을수록 정확 but 느려짐
 
flann = cv2.FlannBasedMatcher(index_params, search_params)

matches = flann.knnMatch(des1,des2,k=2)#k=? ?번째로 가까운 매칭 결과까지 리턴
good = []

for m,n in matches:
    if m.distance < 0.9*n.distance:
        good.append(m)
good


name = []
matcheRate = len(good)/len(matches)
print(matcheRate)
if float(matcheRate) > 0.9:
    name = 'perfect.jpg'
    print("perfect")
elif float(matcheRate) > 0.85 and float(matcheRate) <= 0.9:
    name = 'good.jpg'
    print("good")
else:
    name = 'bad.jpg'
    print("bad")
name

if len(good)>MIN_MATCH_COUNT:
    src_pts = np.float32([ kp1[m.queryIdx].pt for m in good ]).reshape(-1,1,2)
    dst_pts = np.float32([ kp2[m.trainIdx].pt for m in good ]).reshape(-1,1,2)
 
    M, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC,5.0)
    matchesMask = mask.ravel().tolist()
 
    h,w = img1.shape
    pts = np.float32([ [0,0],[0,h-1],[w-1,h-1],[w-1,0] ]).reshape(-1,1,2)
    dst = cv2.perspectiveTransform(pts,M)
 
    img2 = cv2.polylines(img2,[np.int32(dst)],True,255,3, cv2.LINE_AA)
else:
    print("Not enough matches are found - %d/%d" % (len(good),MIN_MATCH_COUNT))
    matchesMask = None

draw_params = dict(matchColor = (255,255,255), # draw matches in green color
                singlePointColor = (0,0,255),
                matchesMask = matchesMask, # draw only inliers
                flags = 0)

img3 = cv2.drawMatches(img1,kp1,img2,kp2,good,None,**draw_params)
 
# plt.imshow(img3, 'gray'),plt.show()
# cv2.imshow("gray", img3)
cv2.imwrite(name, img3)
cv2.waitKey(0)