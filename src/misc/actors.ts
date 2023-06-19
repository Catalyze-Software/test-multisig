import { Actor, HttpAgent } from "@dfinity/agent";
import { Ed25519KeyIdentity } from "@dfinity/identity";
import { _SERVICE, idlFactory } from "../declarations/mutlisig.declarations";
import {
  multisig_canister_id,
} from "../../_test_environment/testCanisterIds";

const host = "http://127.0.0.1:8080";

const agent = (identity: Ed25519KeyIdentity) => {
  const agent = new HttpAgent({ host, identity });
  agent.fetchRootKey();
  return agent;
};

export default const mutisigActor = (identity: Ed25519KeyIdentity) => {
  return Actor.createActor(idlFactory, { agent: agent(identity), canisterId: multisig_canister_id }) as _SERVICE;
};
