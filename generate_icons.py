#!/usr/bin/env python3
"""
Generate PNG icons (192x192 and 512x512) from SVG for PWA.
Requires: pip install pillow cairosvg
"""
import os
from PIL import Image, ImageDraw

def create_icon(size, filename):
    """Create a simple icon with gradient background and 'F' letter."""
    # Create image with gradient background
    img = Image.new('RGB', (size, size), color=(212, 165, 116))  # #d4a574
    draw = ImageDraw.Draw(img)
    
    # Add a slightly darker bottom gradient effect
    for y in range(size):
        # Gradient from #d4a574 to #c89460
        ratio = y / size
        r = int(212 - (20 * ratio))
        g = int(165 - (15 * ratio))
        b = int(116 - (10 * ratio))
        draw.line([(0, y), (size, y)], fill=(r, g, b))
    
    # Draw white 'F' letter in center
    # Use a simple filled rectangle approach
    draw.rectangle(
        [size * 0.2, size * 0.2, size * 0.4, size * 0.8],
        fill='white'
    )
    draw.rectangle(
        [size * 0.2, size * 0.35, size * 0.65, size * 0.5],
        fill='white'
    )
    draw.rectangle(
        [size * 0.2, size * 0.55, size * 0.6, size * 0.68],
        fill='white'
    )
    
    # Save as PNG
    img.save(filename, 'PNG')
    print(f"✓ Generated {filename}")

if __name__ == '__main__':
    root = os.path.dirname(os.path.abspath(__file__))
    
    create_icon(192, os.path.join(root, 'icon-192.png'))
    create_icon(512, os.path.join(root, 'icon-512.png'))
    
    print("\n✓ All icons generated successfully!")
    print("Now commit and push to GitHub Pages.")
