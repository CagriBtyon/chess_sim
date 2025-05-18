import cv2
import numpy as np
import os
# import pytesseract
# OCR_LANGUAGE = "eng"  # Türkçe için "tur"

image_folder = "games"
output_folder = "foundcells"
os.makedirs(output_folder, exist_ok=True)
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def detect_lines(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_COLOR)
    if image is None: 
        print(f"Hata: {image_path} okunamadı.")
        return [], [] 

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150, apertureSize=3)

    lines = cv2.HoughLinesP(edges, 1, np.pi / 180, 75, minLineLength=75, maxLineGap=3)
    vertical_lines, horizontal_lines = [], []

    if lines is not None:
        for line in lines:
            x1, y1, x2, y2 = line[0]
            if abs(x1 - x2) < 5:
                vertical_lines.append((x1, x2))
            elif abs(y1 - y2) < 5:
                horizontal_lines.append((y1, y2))

    vertical_lines.sort(key=lambda x: x[0])
    horizontal_lines.sort(key=lambda y: y[0])

    return vertical_lines, horizontal_lines

def group_lines(lines, axis_index, threshold=30):
    grouped = []
    group = []

    for line in lines:
        val = line[axis_index]
        if not group:
            group.append(line)
        else:
            prev_val = group[-1][axis_index]
            if abs(val - prev_val) <= threshold:
                group.append(line)
            else:
                avg = tuple(int(np.mean([g[i] for g in group])) for i in range(2))
                grouped.append(avg)
                group = [line]

    if group:
        avg = tuple(int(np.mean([g[i] for g in group])) for i in range(2))
        grouped.append(avg)

    return grouped

def process_image(image_path, image_index, cell_start_index=1):
    img = cv2.imread(image_path)
    filename = os.path.basename(image_path)  # "Image (12).jfif"
    name, _ = os.path.splitext(filename)     # "Image (12)"
    vertical_lines, horizontal_lines = detect_lines(image_path)
    vertical_lines = [v for v in vertical_lines if 290 < v[0] < 3000]
    horizontal_lines = [h for h in horizontal_lines if h[0] > 1186]
    # draw_lines_on_image(image_path , vertical_lines , horizontal_lines)

    vertical_lines = group_lines(vertical_lines, 0)
    horizontal_lines = group_lines(horizontal_lines, 0)
    
    cell_count = cell_start_index
    with open("labels.txt", "a", encoding="utf-8") as label_file:
        for i in range(len(horizontal_lines) - 1):            
            for j in range(len(vertical_lines) - 1):
                y1 = int(horizontal_lines[i][0])
                y2 = int(horizontal_lines[i + 1][0])
                x1 = int(vertical_lines[j][0])
                x2 = int(vertical_lines[j + 1][0])

                if x2 - x1 < 150:
                    continue

                cell_img = img[y1:y2, x1:x2]
                cell_filename = f"{output_folder}/{name}_cell{cell_count}.png"                
                # OCR ile içerik tanı
                # text = pytesseract.image_to_string(cell_img, lang=OCR_LANGUAGE).strip()

                # labels.txt dosyasına yaz
                label_file.write(f"{cell_filename} \n")
                
                print(f"{cell_filename} kaydedildi!")
                cv2.imwrite(cell_filename, cell_img)
                cell_count += 1
        if cell_count != 81 and cell_count != 85:
            label_file.write(f"{name} sıkıntılı")                


def draw_lines_on_image(image_path, vertical_lines, horizontal_lines):
    image = cv2.imread(image_path, cv2.IMREAD_COLOR)
    if image is None:
        print(f"Hata: {image_path} okunamadı.")
        return

    # Dikey çizgileri çiz
    for x1, x2 in vertical_lines:
        cv2.line(image, (x1, 0), (x2, image.shape[0]), (0, 255, 0), 2)

    # Yatay çizgileri çiz
    for y1, y2 in horizontal_lines:
        cv2.line(image, (0, y1), (image.shape[1], y2), (255, 0, 0), 2)
    
    dirname, filename = os.path.split(image_path)
    name, ext = os.path.splitext(filename)
    output_path = os.path.join(dirname, f"{name}_isaretli.jpg")
    
    cv2.imwrite(output_path, image)
    print(f"Çizgili görsel kaydedildi: {output_path}")


def main():
    process_image("games/Image (29).jfif", 1)
    # image_count = 1
    # for filename in sorted(os.listdir(image_folder)):
    #     if filename.lower().endswith((".png", ".jpg", ".jpeg", ".jfif")):
    #         image_path = os.path.join(image_folder, filename)
    #         process_image(image_path, image_count)
    #         image_count += 1

if __name__ == "__main__":
    main()
