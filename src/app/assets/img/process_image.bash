#!/bin/bash

# Get the directory where the script is located
script_dir=$(dirname "$0")

# Change the working directory to where the script is located
cd "$script_dir"

# Now print the current working directory to confirm the change
echo "Current working directory: $(pwd)"

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

# Ensure Homebrew is installed
install_homebrew

# Ensure FFmpeg is installed
install_ffmpeg

# Continue with the rest of the script
echo "Proceeding with the script..."

# Define input and output directories, etc.
input_dir="full"
output_keys=("preload_thumb" "tiny" "small" "medium" "large" "xlarge")
output_values=(16 128 256 512 1024 1920)

# Specify local paths to ffmpeg and ffprobe
pngquant="./pngquant"

# Loop through each output directory, creating it if doesn't exist, and process images
for ((i=0; i<${#output_keys[@]}; i++)); do
    output_dir="${output_keys[i]}"
    new_image_size="${output_values[i]}"
    mkdir -p "$output_dir"
    echo "Processing images for ${output_dir}..."

    # Loop through each image in the input directory
    for input_image in "$input_dir"/*.png; do
        filename=$(basename "$input_image")

        # Using local ffprobe to get the dimensions of the original image
        dimensions=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$input_image")
        if [ -z "$dimensions" ]; then
            echo "Error: Unable to retrieve dimensions for $input_image"
            continue
        fi

        IFS=',' read -ra dim_array <<< "$dimensions"
        width="${dim_array[0]}"
        height="${dim_array[1]}"

        # Calculate the new dimensions while maintaining the aspect ratio
        if [ "$width" -ge "$height" ]; then
            new_width=$new_image_size
            new_height=$(($new_image_size * height / width))
        else
            new_height=$new_image_size
            new_width=$(($new_image_size * width / height))
        fi

        # Generate the resized image using local ffmpeg
        resized_image="$output_dir/resized_$filename"
        ffmpeg -y -i "$input_image" -vf "scale=$new_width:$new_height" -c:v png -f rawvideo -pix_fmt rgba - | "$pngquant" --quality=65-80 --force --output="$resized_image" -
        
        # Move the resized image to the final output location
        mv "$resized_image" "$output_dir/$filename"
        
        echo "Processed: $filename"

        # Generate and save base64-encoded image for "preload_thumb" directory
        if [ "$output_dir" = "preload_thumb" ]; then
            mkdir -p "base64"
            base64_image="$(base64 -w 0 -i "$output_dir/$filename")"
            echo "My base64 image:"
            echo "$base64_image"
            echo "----"
            echo "const value = \"$base64_image\";export default value;" > "base64/${filename%.*}.js"
        fi
    done
done

echo "Image processing complete!"
