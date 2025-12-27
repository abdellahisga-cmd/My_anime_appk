#!/usr/bin/env bash
# ffmpeg/transcode.sh
# usage: transcode.sh /path/to/input.mp4 /output/dir basename
set -e
INPUT="$1"
OUTDIR="$2"
BASENAME="$3"

if [ -z "$INPUT" ] || [ -z "$OUTDIR" ] || [ -z "$BASENAME" ]; then
  echo "Usage: $0 input.mp4 /output/dir basename"
  exit 1
fi

mkdir -p "$OUTDIR"

# Create HLS multi-bitrate (4 variants)
ffmpeg -y -i "$INPUT" -preset veryfast -g 48 -sc_threshold 0 \
  -map 0:v:0 -map 0:a:0 -s:v:0 426x240 -b:v:0 400k -maxrate:v:0 856k -bufsize:v:0 1200k \
  -map 0:v:0 -map 0:a:0 -s:v:1 854x480 -b:v:1 900k -maxrate:v:1 1498k -bufsize:v:1 2100k \
  -map 0:v:0 -map 0:a:0 -s:v:2 1280x720 -b:v:2 2500k -maxrate:v:2 2675k -bufsize:v:2 3750k \
  -map 0:v:0 -map 0:a:0 -s:v:3 1920x1080 -b:v:3 5000k -maxrate:v:3 5350k -bufsize:v:3 7500k \
  -map 0:a -c:a aac -b:a 128k \
  -f hls -hls_time 6 -hls_playlist_type vod \
  -hls_segment_filename "$OUTDIR/${BASENAME}_v%v_seg%d.ts" \
  -master_pl_name "$OUTDIR/${BASENAME}_master.m3u8" \
  -var_stream_map "v:0,a:0 v:1,a:0 v:2,a:0 v:3,a:0" \
  "$OUTDIR/${BASENAME}_v%v.m3u8"

echo "Transcode finished: $OUTDIR"