#!/bin/bash

TOTAL_COUNT=2
SUCCESS_COUNT=0
FAIL_COUNT=0
FAILED_AT=""

bash scripts/reset_all.sh

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
    if [ $1 == "multisig" ]; then
        # echo "sleeping for 5 seconds.."
        # sleep 5
        bash scripts/reset.sh
    fi
}


function handle_error() {
    FAIL_COUNT=$((FAIL_COUNT + 1))
    FAILED_AT=$1
    handle_resets $1
    show_result
}

function handle_success() {
    SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    echo "$1 tests passed"
    handle_resets $1
    show_result

}

tests=(
    "identities"
    "multisig"
    )

for test in "${tests[@]}"; do
# IDENTITIES TEST
npx jest $test
if [ $? -ne 0 ]; then
    handle_error $test
    exit 1
else 
    handle_success $test
fi
done
