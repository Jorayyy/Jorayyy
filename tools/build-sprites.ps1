param(
  [string]$Config = "$PSScriptRoot\sprites.json",
  [string]$SvgOut = "$PSScriptRoot\..\assets\sprites",
  [string]$PngOut = "$PSScriptRoot\..\assets\sprites",
  [string]$PreviewDir = "$env:TEMP\opencode\sprites",
  [int]$PreviewScale = 24
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Web.Extensions

$serializer = New-Object System.Web.Script.Serialization.JavaScriptSerializer
$data = $serializer.DeserializeObject([System.IO.File]::ReadAllText((Resolve-Path -LiteralPath $Config)))
$width = [int]$data["width"]
$height = [int]$data["height"]

$palette = @{}
foreach ($key in $data["palette"].Keys) {
  $palette[[string]$key] = $data["palette"][$key]
}

foreach ($d in @($SvgOut, $PngOut, $PreviewDir)) {
  if (-not (Test-Path -LiteralPath $d)) { New-Item -ItemType Directory -Force -Path $d | Out-Null }
}

function New-Bitmap {
  param([int]$w, [int]$h, [string]$bg)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::NearestNeighbor
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::Half
  if ($bg) { $g.Clear([System.Drawing.ColorTranslator]::FromHtml($bg)) } else { $g.Clear([System.Drawing.Color]::Transparent) }
  return @{ Bitmap = $bmp; Graphics = $g }
}

$report = @()

foreach ($name in $data["sprites"].Keys) {
  $sprite = $data["sprites"][$name]
  $label = if ($sprite["label"]) { [string]$sprite["label"] } else { [string]$name }
  $sw = if ($sprite["width"]) { [int]$sprite["width"] } else { $width }
  $sh = if ($sprite["height"]) { [int]$sprite["height"] } else { $height }
  $rows = @($sprite["rows"])

  if ($rows.Count -ne $sh) {
    throw "$name has $($rows.Count) rows, expected $sh"
  }

  $grid = @()
  for ($y = 0; $y -lt $sh; $y++) {
    $row = [string]$rows[$y]
    if ($row.Length -gt $sw) {
      throw "$name row $y is $($row.Length) wide, max $sw"
    }
    $row = $row.PadRight($sw, '.')
    $grid += ,$row.ToCharArray()
  }

  $rects = New-Object System.Text.StringBuilder
  for ($y = 0; $y -lt $sh; $y++) {
    $x = 0
    while ($x -lt $sw) {
      $ch = [string]$grid[$y][$x]
      if (-not $palette.ContainsKey($ch)) { throw "$name row $y uses unknown color '$ch'" }
      $run = 1
      while ($x + $run -lt $sw -and [string]$grid[$y][$x + $run] -eq $ch) { $run++ }
      $fill = $palette[$ch]
      if ($fill) {
        [void]$rects.AppendLine("    <rect x=`"$x`" y=`"$y`" width=`"$run`" height=`"1`" fill=`"$fill`"/>")
      }
      $x += $run
    }
  }

  $svg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $sw $sh" width="$($sw * 16)" height="$($sh * 16)" shape-rendering="crispEdges" role="img" aria-label="$label pixel sprite">
<g>
$($rects.ToString().TrimEnd())
</g>
</svg>
"@
  [System.IO.File]::WriteAllText((Join-Path $SvgOut "$name.svg"), $svg, (New-Object System.Text.UTF8Encoding($false)))

  $game = New-Bitmap -w $sw -h $sh -bg $null
  for ($y = 0; $y -lt $sh; $y++) {
    for ($x = 0; $x -lt $sw; $x++) {
      $fill = $palette[[string]$grid[$y][$x]]
      if ($fill) {
        $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($fill))
        $game.Graphics.FillRectangle($brush, $x, $y, 1, 1)
        $brush.Dispose()
      }
    }
  }
  $game.Bitmap.Save((Join-Path $PngOut "$name.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  $game.Graphics.Dispose(); $game.Bitmap.Dispose()

  $prev = New-Bitmap -w ($sw * $PreviewScale) -h ($sh * $PreviewScale) -bg "#444a52"
  for ($y = 0; $y -lt $sh; $y++) {
    for ($x = 0; $x -lt $sw; $x++) {
      $fill = $palette[[string]$grid[$y][$x]]
      if ($fill) {
        $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($fill))
        $prev.Graphics.FillRectangle($brush, $x * $PreviewScale, $y * $PreviewScale, $PreviewScale, $PreviewScale)
        $brush.Dispose()
      }
    }
  }
  $prev.Bitmap.Save((Join-Path $PreviewDir "$name.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  $prev.Graphics.Dispose(); $prev.Bitmap.Dispose()

  $report += "$name ($label): $sw x $sh"
}

$report
Write-Output "Preview: $PreviewDir"
