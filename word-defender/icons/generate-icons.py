"""
Generate PNG icons for Word Defender Chrome Extension
Requires: pip install Pillow
"""

try:
    from PIL import Image, ImageDraw
    import math
    
    def draw_icon(size):
        # Create image with gradient background
        img = Image.new('RGB', (size, size), color='#667eea')
        draw = ImageDraw.Draw(img, 'RGBA')
        
        # Draw background gradient effect
        for y in range(size):
            color_value = int(102 + (118 - 102) * (y / size))
            draw.line([(0, y), (size, y)], fill=(color_value, 126, 234))
        
        center_x = size // 2
        center_y = size // 2
        radius = int(size * 0.3)
        
        # Draw tentacles
        tentacle_color = (255, 107, 107, 200)
        tentacle_width = max(1, int(size * 0.05))
        
        for i in range(6):
            angle = (math.pi * 2 / 6) * i
            start_x = center_x + int(math.cos(angle) * radius)
            start_y = center_y + int(math.sin(angle) * radius)
            end_x = center_x + int(math.cos(angle) * radius * 1.8)
            end_y = center_y + int(math.sin(angle) * radius * 1.8)
            
            draw.line([(start_x, start_y), (end_x, end_y)], 
                     fill=tentacle_color, width=tentacle_width)
        
        # Draw main bacteria body (outer glow)
        glow_radius = int(radius * 1.3)
        draw.ellipse([center_x - glow_radius, center_y - glow_radius,
                     center_x + glow_radius, center_y + glow_radius],
                    fill=(255, 107, 107, 100))
        
        # Draw main bacteria body
        draw.ellipse([center_x - radius, center_y - radius,
                     center_x + radius, center_y + radius],
                    fill=(255, 107, 107))
        
        # Draw highlight
        highlight_radius = int(radius * 0.5)
        highlight_x = center_x - int(radius * 0.3)
        highlight_y = center_y - int(radius * 0.3)
        draw.ellipse([highlight_x - highlight_radius, highlight_y - highlight_radius,
                     highlight_x + highlight_radius, highlight_y + highlight_radius],
                    fill=(255, 255, 255, 100))
        
        # Draw eyes (for larger icons)
        if size >= 48:
            eye_size = int(radius * 0.25)
            eye_left_x = center_x - int(radius * 0.3)
            eye_right_x = center_x + int(radius * 0.3)
            eye_y = center_y - int(radius * 0.2)
            
            # White of eyes
            draw.ellipse([eye_left_x - eye_size, eye_y - eye_size,
                         eye_left_x + eye_size, eye_y + eye_size],
                        fill='white')
            draw.ellipse([eye_right_x - eye_size, eye_y - eye_size,
                         eye_right_x + eye_size, eye_y + eye_size],
                        fill='white')
            
            # Pupils
            pupil_size = int(eye_size * 0.5)
            draw.ellipse([eye_left_x - pupil_size, eye_y - pupil_size,
                         eye_left_x + pupil_size, eye_y + pupil_size],
                        fill='black')
            draw.ellipse([eye_right_x - pupil_size, eye_y - pupil_size,
                         eye_right_x + pupil_size, eye_y + pupil_size],
                        fill='black')
        
        # Draw crosshair (for larger icons)
        if size >= 48:
            crosshair_size = int(size * 0.15)
            ch_x = int(size * 0.75)
            ch_y = int(size * 0.25)
            line_width = max(1, int(size * 0.03))
            
            # Crosshair lines
            draw.line([(ch_x - crosshair_size, ch_y), (ch_x + crosshair_size, ch_y)],
                     fill=(0, 255, 255), width=line_width)
            draw.line([(ch_x, ch_y - crosshair_size), (ch_x, ch_y + crosshair_size)],
                     fill=(0, 255, 255), width=line_width)
            
            # Crosshair circle
            circle_radius = int(crosshair_size * 0.7)
            draw.ellipse([ch_x - circle_radius, ch_y - circle_radius,
                         ch_x + circle_radius, ch_y + circle_radius],
                        outline=(0, 255, 255), width=line_width)
        
        return img
    
    # Generate all three icon sizes
    sizes = [16, 48, 128]
    
    for size in sizes:
        img = draw_icon(size)
        filename = f'icon{size}.png'
        img.save(filename)
        print(f'✓ Generated {filename}')
    
    print('\n🎉 All icons generated successfully!')
    print('You can now install the Chrome extension.')
    
except ImportError:
    print('❌ Error: Pillow library not found')
    print('\nTo generate icons with Python:')
    print('1. Install Python (if not already installed)')
    print('2. Run: pip install Pillow')
    print('3. Run: python generate-icons.py')
    print('\nAlternatively:')
    print('- Open create-icons.html in a browser and download icons manually')
    print('- Or use any image editor to create 16x16, 48x48, and 128x128 PNG files')
except Exception as e:
    print(f'❌ Error generating icons: {e}')
    print('\nPlease use create-icons.html in a browser as an alternative.')
