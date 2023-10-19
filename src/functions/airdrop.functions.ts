import { Principal } from "@dfinity/principal";
import identities from "../misc/identities";
import { dip20Actor, icrc1Actor, multisigActor } from "../misc/actors";
import { _SERVICE } from "../declarations/multisig.declarations";
import {
  multisig_canister_id,
  dip20_canister_id,
  icrc1_canister_id,
} from "../../_test_environment/testCanisterIds";

export function airdropTest() {
  let dip20One = dip20Actor(identities.one());
  let icrcOne = icrc1Actor(identities.one());

  let msOne = multisigActor(identities.one());
  let msTwo = multisigActor(identities.two());
  let msThree = multisigActor(identities.three());

  const initialAmount = 1 * 10 ** 9;
  const airdropRequestAmount = 1 * 10 ** 7;
  const insufficientAmount = 1 * 10 ** 10;

  it("DIP20 one canister should be defined", async () => {
    expect(dip20One).toBeDefined();
  });
  it("ICRC one canister should be defined", async () => {
    expect(icrcOne).toBeDefined();
  });
  it("Multisig one canister should be defined", async () => {
    expect(msOne).toBeDefined();
  });
  it("Multisig two canister should be defined", async () => {
    expect(msTwo).toBeDefined();
  });
  it("Multisig three canister should be defined", async () => {
    expect(msThree).toBeDefined();
  });

  //
  // Initializing step: multisig should have enough funds for airdrop
  //
  it("Should send identity one DIP20 funds to multisig wallet", async () => {
    let result = await dip20One.transfer(
      Principal.fromText(multisig_canister_id),
      BigInt(initialAmount)
    );
    expect(result).toEqual({ Ok: BigInt(0) });
  });

  it("Multisig should have balance of 1000000000 DIP20", async () => {
    let result = await dip20One.balanceOf(
      Principal.fromText(multisig_canister_id)
    );
    expect(result).toEqual(BigInt(initialAmount));
  });

  it("Should send identity one ICRC1 funds to multisig wallet", async () => {
    let result = await icrcOne.icrc1_transfer({
      to: {
        owner: Principal.fromText(multisig_canister_id),
        subaccount: [],
      },
      fee: [],
      memo: [],
      from_subaccount: [],
      created_at_time: [],
      amount: BigInt(initialAmount),
    });
    expect(result).toEqual({ Ok: expect.anything() });
  });

  it("Multisig should have balance of 1000000000 ICRC", async () => {
    let result = await icrcOne.icrc1_balance_of({
      owner: Principal.fromText(multisig_canister_id),
      subaccount: [],
    });
    expect(result).toEqual(BigInt(initialAmount));
  });
  /** End - Initializing funding on multisig */

  /** Start - Add ms one, two, three to whitelist */
  it("Should add identity two to the whitelist", async () => {
    let result = await msOne.whitelist_request({
      Add: identities.two().getPrincipal(),
    });
    expect(result).toEqual({ Ok: "Whitelist request approved" });
  });

  it("Should have identity one and two in the whitelist", async () => {
    let result = (await msOne.get_whitelist()).map((p) => p.toString());

    await expect(Promise.resolve(result)).resolves.toHaveLength(2);
    await expect(Promise.resolve(result)).resolves.toContain(
      identities.one().getPrincipal().toString()
    );
    await expect(Promise.resolve(result)).resolves.toContain(
      identities.two().getPrincipal().toString()
    );
  });

  it("Should add identity three to the whitelist", async () => {
    let result = await msOne.whitelist_request({
      Add: identities.three().getPrincipal(),
    });
    expect(result).toEqual({ Err: "No majority reached" });
  });

  it("Should say the whitelist request approved", async () => {
    let result = await msTwo.vote_on_whitelist_request(1, { Approve: null });
    expect(result).toEqual({ Ok: "Whitelist request approved" });
  });

  it("Should have identity one, two and three in the whitelist", async () => {
    let result = (await msTwo.get_whitelist()).map((p) => p.toString());
    await expect(Promise.resolve(result)).resolves.toHaveLength(3);
    await expect(Promise.resolve(result)).resolves.toContain(
      identities.one().getPrincipal().toString()
    );
    await expect(Promise.resolve(result)).resolves.toContain(
      identities.two().getPrincipal().toString()
    );
    await expect(Promise.resolve(result)).resolves.toContain(
      identities.three().getPrincipal().toString()
    );
  });
  /** End - Add ms one, two, three to whitelist */

  /** Start - Test airdrop logic */
  it("Should identity one send dip20 airdrop request", async () => {
    let result = await msOne.airdrop_request(
      Principal.fromText(dip20_canister_id),
      [
        {
          DIP20: {
            to: identities.two().getPrincipal(),
            amount: BigInt(airdropRequestAmount),
          },
        },
        {
          DIP20: {
            to: identities.three().getPrincipal(),
            amount: BigInt(airdropRequestAmount),
          },
        },
      ]
    );
    expect(result).toEqual({ Ok: "Airdrop request created" });
  });

  it("Should say Insufficient DIP20 balance", async () => {
    let result = await msOne.airdrop_request(
      Principal.fromText(dip20_canister_id),
      [
        {
          DIP20: {
            to: identities.two().getPrincipal(),
            amount: BigInt(insufficientAmount),
          },
        },
      ]
    );
    expect(result).toEqual({ Err: "Insufficient DIP20 balance" });
  });

  it("Should exist pending airdrop request from identity one", async () => {
    let result = await msOne.get_airdrop_requests([{ Pending: null }]);
    expect(result.length).toBeGreaterThan(0);
  });
  /** End - Test airdrop logic */
}
