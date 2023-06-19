#!/bin/sh

  repos=(
    "multisig"
)

for repo in "${repos[@]}"; do
  (
    cd _test_environment/$repo; 
    dfx canister uninstall-code parent;
    dfx canister install --wasm wasm/parent.wasm.gz parent;
  )
done
