#!/usr/bin/env python3
"""
Create proper favicon.ico file for Shree Gopinath Dental Care
This script creates a multi-size favicon.ico file from logo.jpeg
"""

from PIL import Image
import os

def create_favicon_ico(input_path, output_path):
    """Create a proper favicon.ico file with multiple sizes"""
    try:
        # Open the original image
        with Image.open(input_path) as img:
            # Convert to RGBA if not already
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # Create a list to store different icon sizes
            icons = []
            
            # Standard favicon sizes
            sizes = [16, 32, 48]
            
            for size in sizes:
                # Resize image
                resized_img = img.resize((size, size), Image.Resampling.LANCZOS)
                icons.append(resized_img)
            
            # Save as ICO file with multiple sizes
            icons[0].save(output_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
            
            print(f"✓ Created proper favicon.ico with sizes: 16x16, 32x32, 48x48")
            print(f"✓ File size: {os.path.getsize(output_path)} bytes")
            
    except Exception as e:
        print(f"✗ Error creating favicon.ico: {e}")

def main():
    """Main function"""
    input_file = "logo.jpeg"
    output_file = "favicon.ico"
    
    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found!")
        return
    
    print("Creating proper favicon.ico file...")
    create_favicon_ico(input_file, output_file)
    
    print("\nFavicon.ico creation complete!")
    print("Now your favicon should work properly in browsers and Google search results.")

if __name__ == "__main__":
    main()
