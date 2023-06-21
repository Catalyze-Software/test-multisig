#!/bin/sh

# remove all pulled repos
rm -rf _test_environment

# create folder
mkdir -p _test_environment

# create file for canister ids
touch _test_environment/testCanisterIds.ts

# stop in case its running
dfx stop

# start the replica
dfx start --clean --background 

#install candid ui
(
    cd didjs; 
    dfx canister create didjs --no-wallet; 
    echo "export const candid_ui = 'http://localhost:8080/?canisterId=$(dfx canister id didjs)';" >> ../_test_environment/testCanisterIds.ts;
    echo "export const candid_ui_canister_id = '$(dfx canister id didjs)';" >> ../_test_environment/testCanisterIds.ts;
    dfx canister install --wasm didjs.wasm didjs;
)
    # clone the repo
git clone --depth 1 git@github.com:Catalyze-Software/multisig.git _test_environment/multisig

# run code inside folder
(
    # navigate to the folder
    cd _test_environment/multisig; 
    # create the parent folder (child gets automatically created)
    dfx canister create multisig --no-wallet --with-cycles 100000000000000000; 

    # store the canister id in a .ts file
    echo "export const $(echo "multisig")_canister_id = '$(dfx canister id multisig)';" >> ../../_test_environment/testCanisterIds.ts;
    
    # install the wasm with identity 0 as the owner
    dfx canister install --wasm wasm/multisig.wasm.gz multisig --argument '(principal "6s25k-hbv72-gibhe-tjgoy-pk77w-6ipvc-dzerp-rcg3q-o42a4-e6gyt-uqe")';
)

bash dip20/deploy.sh
bash icrc1/deploy.sh