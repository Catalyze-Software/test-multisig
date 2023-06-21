#!/bin/bash

GENESIS_AMT="1000000000"

MODE=$1

if [[ "$MODE" == "reinstall" ]]; then
  MODE="--mode reinstall"
fi

(
# navigate to the folder
cd dip20; 
dfx canister create dip20_token --no-wallet --with-cycles 100000000000000000; 
dfx canister install --wasm dip20.wasm dip20_token \
	--argument="(
        \"image\",
        \"DIP20 Token\",
        \"TKN\",
        8:nat8,
        $GENESIS_AMT:nat,
        principal \"6s25k-hbv72-gibhe-tjgoy-pk77w-6ipvc-dzerp-rcg3q-o42a4-e6gyt-uqe\", 
        0:nat, 
        principal \"6s25k-hbv72-gibhe-tjgoy-pk77w-6ipvc-dzerp-rcg3q-o42a4-e6gyt-uqe\", 
        principal \"aaaaa-aa\",
        )" \
        $MODE
        if [[ "$MODE" != "--mode reinstall" ]]; then
                echo "export const dip20_canister_id = '$(dfx canister id dip20_token)';" >> ../_test_environment/testCanisterIds.ts;
        fi
)