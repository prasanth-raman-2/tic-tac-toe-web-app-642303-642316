#!/bin/bash
cd /tmp/kavia/workspace/code-generation/tic-tac-toe-web-app-642303-642316/tic_tac_toe_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

