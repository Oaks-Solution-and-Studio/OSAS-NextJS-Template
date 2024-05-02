#!/bin/bash

# Read version number from package.json using awk
version=$(awk -F'"' '/version/{print $4}' package.json)

# Change to the build directory
cd ../out

# Function to check and install Homebrew
install_homebrew() {
    echo "Checking for Homebrew installation..."
    if ! command -v brew &> /dev/null; then
        echo "Homebrew not installed. Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        if [ $? -ne 0 ]; then
            echo "Failed to install Homebrew. Exiting script."
            exit 1
        fi
    else
        echo "Homebrew is already installed."
    fi
}

# Function to check and install FFmpeg
install_ffmpeg() {
    echo "Checking for FFmpeg installation..."
    if ! brew list ffmpeg &> /dev/null; then
        echo "FFmpeg not installed. Installing FFmpeg..."
        brew install ffmpeg
        if [ $? -ne 0 ]; then
            echo "Failed to install FFmpeg. Exiting script."
            exit 1
        fi
    else
        echo "FFmpeg is already installed."
    fi
}

# Function to check and install jpegoptim
install_jpegoptim() {
    echo "Checking for jpegoptim installation..."
    if ! brew list jpegoptim &> /dev/null; then
        echo "jpegoptim not installed. Installing jpegoptim..."
        brew install jpegoptim
        if [ $? -ne 0 ]; then
            echo "Failed to install jpegoptim. Exiting script."
            exit 1
        fi
    else
        echo "jpegoptim is already installed."
    fi
}

# Ensure Homebrew is installed
install_homebrew

# Ensure FFmpeg is installed
install_ffmpeg

# Ensure jpegoptim is installed
install_jpegoptim

# Continue with the rest of the script
echo "Proceeding with the script..."

# Define input and output directories, etc.
input_dir="_next/static/media"

# Check if input directory exists and is not empty
if [ ! -d "$input_dir" ] || [ -z "$(ls -A $input_dir)" ]; then
    echo "No input images found in $input_dir. Exiting script."
    exit 1
fi
echo "Input directory: $input_dir"

echo "Processing images..."

# Loop through each PNG image in the input directory
for input_image in "$input_dir"/*.png; do
    filename=$(basename "$input_image")
    output_image="$input_dir/$filename"  # Specify output image name

    # Generate the resized image using local pngquant
    pngquant="../pngquant"
    output=$( "$pngquant" --quality=65-80 --force --output="$output_image" "$input_image" 2>&1)
    
    if [ $? -ne 0 ]; then
        if echo "$output" | grep -q "ERROR"; then
            echo "[PNG] Error processing $filename: $output"
        else
            echo "[PNG] Failed to process $filename. Continuing with next image."
        fi
        continue
    fi
    echo "[PNG] Processed: $filename"
done

# Loop through each JPEG image in the input directory
for input_image in "$input_dir"/*.jpg; do
    filename=$(basename "$input_image")
    output_image="$input_dir/$filename"  # Specify output image name

    # Optimize the JPEG image using jpegoptim
   jpegoptim --max=80 --strip-all --all-progressive --overwrite --dest="$input_dir" "$input_image" 2>&1
    if [ $? -ne 0 ]; then
        echo "[JPG] Failed to process $filename. Continuing with next image."
        continue
    fi
    echo "[JPG] Processed: $filename"
done

echo "Image processing complete!"