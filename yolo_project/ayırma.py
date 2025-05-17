import os
import random
from shutil import copy2

source_dir = "D:\\foundcells2_yolo_format\\foundcells2_filtered"
images = [f for f in os.listdir(source_dir) if f.endswith((".png", ".jpg", ".jpeg"))]
random.shuffle(images)

split_index = int(0.8 * len(images))
train_images = images[:split_index]
val_images = images[split_index:]

# Klasörleri otomatik oluştur
for subset in ["train", "val"]:
    os.makedirs(f"D:\\foundcells2_yolo_format\\images\\{subset}", exist_ok=True)
    os.makedirs(f"D:\\foundcells2_yolo_format\\labels\\{subset}", exist_ok=True)

# Yeni klasörlere kopyalama
for subset, subset_images in [("train", train_images), ("val", val_images)]:
    for img in subset_images:
        label = os.path.splitext(img)[0] + ".txt"
        copy2(os.path.join(source_dir, img), f"D:\\foundcells2_yolo_format\\images\\{subset}\\{img}")
        copy2(os.path.join(source_dir, label), f"D:\\foundcells2_yolo_format\\labels\\{subset}\\{label}")
