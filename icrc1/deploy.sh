#!/bin/bash

MODE=$1
(
    # navigate to the folder
cd icrc1; 
if [[ "$MODE" == "reinstall" ]]; then
        dfx canister uninstall-code icrc1_token;
fi      

dfx canister create icrc1_token --no-wallet --with-cycles 100000000000000000; 

if [[ "$MODE" != "reinstall" ]]; then
        echo "export const icrc1_canister_id = '$(dfx canister id icrc1_token)';" >> ../_test_environment/testCanisterIds.ts;
fi

dfx canister install --wasm icrc1.wasm icrc1_token \
	--argument="(record {
        decimals = 8:nat8;
        initial_mints = vec {
                record {
                        account = record {
                                owner = principal \"6s25k-hbv72-gibhe-tjgoy-pk77w-6ipvc-dzerp-rcg3q-o42a4-e6gyt-uqe\";
                                subaccount = null;
                        };
                        amount = 100000000000:nat;
                }
        };
        minting_account = record {
                owner = principal \"6s25k-hbv72-gibhe-tjgoy-pk77w-6ipvc-dzerp-rcg3q-o42a4-e6gyt-uqe\";
                subaccount = null;
        };
        token_name = \"ICRC1 token\";
        token_symbol = \"ICRC1TKN\";
        transfer_fee = 10000:nat;
        })" \
)