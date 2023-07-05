#!/bin/bash

rename_js_to_ts() {
    for file in "$1"/*; do
        if [ -d "$file" ]; then
            rename_js_to_ts "$file" # Recursive call for subdirectories
        elif [ "${file##*.}" = "js" ]; then
            new_file="${file%.*}.ts"
            mv "$file" "$new_file"
            echo "Renamed $file to $new_file"
        fi
    done
}

rename_js_to_ts "$(pwd)"

