#!/bin/bash

TOTAL_COUNT=4
SUCCESS_COUNT=0
FAIL_COUNT=0
FAILED_AT=""

# Function to show the test result
function show_result() {
    if [ $FAIL_COUNT -ne 0 ]; then
        echo ========================================
        echo "$FAILED_AT tests failed. Exiting with error."
        echo ========================================
        exit 1
    else
        echo ========================================
        echo "Suite passed"
        echo $SUCCESS_COUNT / $TOTAL_COUNT Suites passed
        echo ========================================
    fi
}

function handle_resets() {
    if [ $1 != "identities" ]; then
        bash scripts/reset.sh
    fi
}


function handle_error() {
    FAIL_COUNT=$((FAIL_COUNT + 1))
    FAILED_AT=$1
    show_result
}

function handle_success() {
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    echo "$1 tests passed"
    show_result
}

tests=(
    # "identities"
    # "transfer"
    # "whitelist"
    "airdrop"
    )

for test in "${tests[@]}"; do
# IDENTITIES TEST
handle_resets $test
npx jest $test
if [ $? -ne 0 ]; then
    handle_error $test
    # exit 1
else 
    handle_success $test
fi
done
