#!/bin/bash


MODE=$1
(
# navigate to the folder
cd dip20; 

if [[ "$MODE" == "reinstall" ]]; then
        dfx canister uninstall-code dip20_token;
fi      

dfx canister create dip20_token --no-wallet --with-cycles 100000000000000000; 

if [[ "$MODE" != "reinstall" ]]; then
        echo "export const dip20_canister_id = '$(dfx canister id dip20_token)';" >> ../_test_environment/testCanisterIds.ts;
fi

dfx canister install --wasm dip20.wasm dip20_token \
	--argument="(
        \"image\",
        \"DIP20 Token\",
        \"TKN\",
        8:nat8,
        100000000000:nat,
        principal \"6s25k-hbv72-gibhe-tjgoy-pk77w-6ipvc-dzerp-rcg3q-o42a4-e6gyt-uqe\", 
        0:nat, 
        principal \"6s25k-hbv72-gibhe-tjgoy-pk77w-6ipvc-dzerp-rcg3q-o42a4-e6gyt-uqe\", 
        principal \"aaaaa-aa\",
        )" \
       
)