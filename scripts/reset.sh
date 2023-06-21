#!/bin/sh

(
  cd _test_environment/multisig; 
  dfx canister uninstall-code multisig;
  dfx canister install --wasm wasm/multisig.wasm.gz multisig --argument '(principal "6s25k-hbv72-gibhe-tjgoy-pk77w-6ipvc-dzerp-rcg3q-o42a4-e6gyt-uqe")';
)

bash dip20/deploy.sh reinstall
bash icrc1/deploy.sh reinstall
