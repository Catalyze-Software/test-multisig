import { Actor, HttpAgent } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import {
  _SERVICE as _MULTISIG_SERVICE,
  idlFactory as multisigIdlFactory,
} from "../declarations/multisig.declarations";
import {
  _SERVICE as _DIP20_SERVICE,
  idlFactory as dip20IdlFactory,
} from "../declarations/dip20.declarations";
import {
  _SERVICE as _ICRC1_SERVICE,
  idlFactory as icrc1IdlFactory,
} from "../declarations/icrc1.declarations";
import {
  dip20_canister_id,
  icrc1_canister_id,
  multisig_canister_id,
} from "../../_test_environment/testCanisterIds";

const host = "http://127.0.0.1:8080";

const agent = (identity: Ed25519KeyIdentity) => {
  const agent = new HttpAgent({ host, identity });
  agent.fetchRootKey();
  return agent;
};

export function multisigActor(identity: Ed25519KeyIdentity) {
  return Actor.createActor(multisigIdlFactory, {
    agent: agent(identity),
    canisterId: multisig_canister_id,
  }) as _MULTISIG_SERVICE;
}

export function dip20Actor(identity: Ed25519KeyIdentity) {
  return Actor.createActor(dip20IdlFactory, {
    agent: agent(identity),
    canisterId: dip20_canister_id,
  }) as _DIP20_SERVICE;
}

export function icrc1Actor(identity: Ed25519KeyIdentity) {
  return Actor.createActor(icrc1IdlFactory, {
    agent: agent(identity),
    canisterId: icrc1_canister_id,
  }) as _ICRC1_SERVICE;
}
