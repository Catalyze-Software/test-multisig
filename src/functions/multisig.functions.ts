import { Ed25519KeyIdentity } from "@dfinity/identity";
import { Principal } from "@dfinity/principal";
import identities from "../misc/identities";

export function addToWhitelistTest(identity: Ed25519KeyIdentity, postGroup: PostGroup) {
  let multisigCanister: _SERVICE | undefined;

  it("Multisig canister should be defined", async () => {
    multisigCanister = await multisigActor<_SERVICE>(identity);
    expect(profileCanister).toBeDefined();
  });
}
