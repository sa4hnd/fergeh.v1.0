from PIL import Image
import piexif
from datetime import datetime, timedelta
import random
import os

# Function to crop the image and slightly change its pixel dimensions
def crop_and_change_pixels(img_path, pixels_to_crop=20, change_pixels_percentage=5):
    # Open the image
    img = Image.open(img_path)
    
    # Crop the image
    width, height = img.size
    left = random.randint(0, pixels_to_crop)
    top = random.randint(0, pixels_to_crop)
    right = width - random.randint(0, pixels_to_crop)
    bottom = height - random.randint(0, pixels_to_crop)
    cropped_img = img.crop((left, top, right, bottom))
    
    # Slightly change the pixel dimensions
    new_width = int(width * (1 + change_pixels_percentage / 100.0))
    new_height = int(height * (1 + change_pixels_percentage / 100.0))
    resized_img = cropped_img.resize((new_width, new_height), Image.LANCZOS)
    
    # Load existing EXIF data or create new if none exists
    exif_dict = piexif.load(resized_img.info.get('exif', piexif.dump({})))
    
    # Update EXIF data with new values
    date_yesterday = (datetime.now() - timedelta(days=1)).strftime('%Y:%m:%d %H:%M:%S')
    exif_dict['0th'][piexif.ImageIFD.Make] = 'Apple'
    exif_dict['0th'][piexif.ImageIFD.Model] = 'iPhone 8'
    exif_dict['Exif'][piexif.ExifIFD.DateTimeOriginal] = date_yesterday
    exif_dict['0th'][piexif.ImageIFD.Software] = '16.7.5'
    exif_dict['Exif'][piexif.ExifIFD.PixelXDimension] = new_width
    exif_dict['Exif'][piexif.ExifIFD.PixelYDimension] = new_height
    exif_dict['0th'][piexif.ImageIFD.BitsPerSample] = (8, 8, 8)
    exif_dict['Exif'][piexif.ExifIFD.FNumber] = (9, 5)
    exif_dict['Exif'][piexif.ExifIFD.ExposureTime] = (1, 30)
    exif_dict['Exif'][piexif.ExifIFD.ISOSpeedRatings] = 100
    exif_dict['Exif'][piexif.ExifIFD.ExposureBiasValue] = (0, 10)
    exif_dict['Exif'][piexif.ExifIFD.FocalLength] = (4, 1)
    exif_dict['Exif'][piexif.ExifIFD.LensModel] = 'iPhone 8 back camera 3.99mm f/1.8'
    exif_dict['Exif'][piexif.ExifIFD.LensMake] = 'Apple'
    exif_dict['Exif'][piexif.ExifIFD.BrightnessValue] = (random.randint(400, 800), 100)
    exif_dict['Exif'][piexif.ExifIFD.MeteringMode] = 2
    exif_dict['Exif'][piexif.ExifIFD.Flash] = 0x0
    
    # Convert the EXIF data to bytes
    exif_bytes = piexif.dump(exif_dict)
    
    # Save the image with updated EXIF data
    resized_img.save(img_path, 'jpeg', exif=exif_bytes)

# Function to append null bytes to an image file
def append_null_bytes_to_image(image_path, number_of_bytes):
    with open(image_path, 'ab') as image_file:
        null_bytes = b'\x00' * number_of_bytes
        image_file.write(null_bytes)

# Function to rename the image file
def rename_image_file(image_path):
    directory, original_filename = os.path.split(image_path)
    filename, file_extension = os.path.splitext(original_filename)
    new_filename = f"{filename}_{datetime.now().strftime('%Y%m%d%H%M%S')}{file_extension}"
    new_image_path = os.path.join(directory, new_filename)
    os.rename(image_path, new_image_path)
    return new_image_path

# Function to process all images in a specified directory
def process_images_in_directory(directory_path, pixels_to_crop=20, change_pixels_percentage=5, number_of_bytes=1024):
    # List all files in the directory
    all_files = os.listdir(directory_path)
    
    # Filter out the image files
    image_files = [f for f in all_files if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    
    # Process each image file
    for img_file in image_files:
        img_path = os.path.join(directory_path, img_file)
        crop_and_change_pixels(img_path, pixels_to_crop, change_pixels_percentage)
        append_null_bytes_to_image(img_path, number_of_bytes)
        new_image_path = rename_image_file(img_path)
        print(f"Processed and renamed image: {new_image_path}")

# Example usage
directory_path = r'C:\Users\LENOVO\Desktop\metadata'
process_images_in_directory(directory_path)