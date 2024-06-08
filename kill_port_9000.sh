#!/bin/bash

# Find all processes using port 9000
PIDS=$(lsof -t -i:9000)

# Check if any process is using port 9000
if [ -z "$PIDS" ]; then
  echo "No processes found using port 9000."
else
  # Kill all processes using port 9000
  echo "Killing the following processes using port 9000: $PIDS"
  kill -9 $PIDS
  echo "Processes killed."
fi

