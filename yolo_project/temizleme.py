import os
from shutil import move

image_dir = "C:\\Users\\sbile\\Downloads\\foundcells2\\foundcells2"  # Orijinal klasör
output_dir = "foundcells2_filtered"
os.makedirs(output_dir, exist_ok=True)

for file in os.listdir(image_dir):
    if file.endswith((".png", ".jpg", ".jpeg")):
        label_file = os.path.splitext(file)[0] + ".txt"
        if label_file in os.listdir(image_dir):
            move(os.path.join(image_dir, file), os.path.join(output_dir, file))
            move(os.path.join(image_dir, label_file), os.path.join(output_dir, label_file))
