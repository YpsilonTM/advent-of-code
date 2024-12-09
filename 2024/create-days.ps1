# Copy folder 'template' to '09' '10' '11' '12' '13' ... '24'

$source = "./template"
$target = "./"

for ($i = 9; $i -le 24; $i++) {
    $folder = "{0:D2}" -f $i
    $path = Join-Path $target $folder
    Copy-Item -Recurse -Path $source -Destination $path
}