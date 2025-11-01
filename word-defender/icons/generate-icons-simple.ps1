# Simple PowerShell script to generate icon files using .NET
Add-Type -AssemblyName System.Drawing

function Create-Icon {
    param($size)
    
    $bitmap = New-Object System.Drawing.Bitmap($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    
    # Enable anti-aliasing
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    
    # Background gradient (purple)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(102, 126, 234))
    $graphics.FillRectangle($brush, 0, 0, $size, $size)
    
    # Draw bacteria (red circle)
    $centerX = $size / 2
    $centerY = $size / 2
    $radius = $size * 0.3
    
    # Main bacteria body
    $bacteriaBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 107, 107))
    $graphics.FillEllipse($bacteriaBrush, $centerX - $radius, $centerY - $radius, $radius * 2, $radius * 2)
    
    # Draw tentacles
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 107, 107), [Math]::Max(1, $size * 0.05))
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    
    for ($i = 0; $i -lt 6; $i++) {
        $angle = ([Math]::PI * 2 / 6) * $i
        $startX = $centerX + [Math]::Cos($angle) * $radius
        $startY = $centerY + [Math]::Sin($angle) * $radius
        $endX = $centerX + [Math]::Cos($angle) * $radius * 1.8
        $endY = $centerY + [Math]::Sin($angle) * $radius * 1.8
        $graphics.DrawLine($pen, $startX, $startY, $endX, $endY)
    }
    
    # Highlight
    $highlightBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(80, 255, 255, 255))
    $highlightRadius = $radius * 0.5
    $highlightX = $centerX - $radius * 0.3
    $highlightY = $centerY - $radius * 0.3
    $graphics.FillEllipse($highlightBrush, $highlightX - $highlightRadius, $highlightY - $highlightRadius, $highlightRadius * 2, $highlightRadius * 2)
    
    # Eyes (for larger icons)
    if ($size -ge 48) {
        $eyeSize = $radius * 0.25
        $eyeLeftX = $centerX - $radius * 0.3
        $eyeRightX = $centerX + $radius * 0.3
        $eyeY = $centerY - $radius * 0.2
        
        # White of eyes
        $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
        $graphics.FillEllipse($whiteBrush, $eyeLeftX - $eyeSize, $eyeY - $eyeSize, $eyeSize * 2, $eyeSize * 2)
        $graphics.FillEllipse($whiteBrush, $eyeRightX - $eyeSize, $eyeY - $eyeSize, $eyeSize * 2, $eyeSize * 2)
        
        # Pupils
        $blackBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Black)
        $pupilSize = $eyeSize * 0.5
        $graphics.FillEllipse($blackBrush, $eyeLeftX - $pupilSize, $eyeY - $pupilSize, $pupilSize * 2, $pupilSize * 2)
        $graphics.FillEllipse($blackBrush, $eyeRightX - $pupilSize, $eyeY - $pupilSize, $pupilSize * 2, $pupilSize * 2)
        
        # Crosshair
        $cyanPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(0, 255, 255), [Math]::Max(1, $size * 0.03))
        $crosshairSize = $size * 0.15
        $chX = $size * 0.75
        $chY = $size * 0.25
        
        $graphics.DrawLine($cyanPen, $chX - $crosshairSize, $chY, $chX + $crosshairSize, $chY)
        $graphics.DrawLine($cyanPen, $chX, $chY - $crosshairSize, $chX, $chY + $crosshairSize)
        $graphics.DrawEllipse($cyanPen, $chX - $crosshairSize * 0.7, $chY - $crosshairSize * 0.7, $crosshairSize * 1.4, $crosshairSize * 1.4)
    }
    
    # Save
    $filename = "icon$size.png"
    $bitmap.Save($filename, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "✓ Generated $filename" -ForegroundColor Green
    
    # Cleanup
    $graphics.Dispose()
    $bitmap.Dispose()
}

# Generate all three sizes
Write-Host "`nGenerating Word Defender Icons..." -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

Create-Icon 16
Create-Icon 48
Create-Icon 128

Write-Host "`n✓ All icons generated successfully!" -ForegroundColor Green
Write-Host "Icons saved in: $PWD`n" -ForegroundColor Yellow
