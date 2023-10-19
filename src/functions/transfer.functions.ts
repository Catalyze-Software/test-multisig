import identities from "../misc/identities";
import { dip20Actor, icrc1Actor, multisigActor } from "../misc/actors";
import { _SERVICE } from "../declarations/multisig.declarations";
import { Principal } from "@dfinity/principal";
import {
  dip20_canister_id,
  icrc1_canister_id,
  multisig_canister_id,
} from "../../_test_environment/testCanisterIds";

// these tests should be ran after the whitelist tests
// so that the whitelist is populated with identities one and three
// initally msOne has funds on the ICRC1 and DIP20 canister

export function transferTest() {
  let dip20One = dip20Actor(identities.one());
  let icrcOne = icrc1Actor(identities.one());

  let msOne = multisigActor(identities.one());
  let msThree = multisigActor(identities.three());

  it("Multisig one canister should be defined", async () => {
    expect(msOne).toBeDefined();
  });
  it("DIP20 one canister should be defined", async () => {
    expect(dip20One).toBeDefined();
  });
  it("ICRC1 one canister should be defined", async () => {
    expect(icrcOne).toBeDefined();
  });
  it("Multisig three canister should be defined", async () => {
    expect(msThree).toBeDefined();
  });

  //
  // IDENTITY ONE IS THE CALLER FOR THE FOLLOWING METHODS
  //
  it("Should send identity one DIP20 funds to multisig wallet", async () => {
    // The default behaviour is modified because the DIP20 canister was relyiant on CAP, which is removed
    // The response now always returns `0` as a response because we dont track the transactions
    let result = await dip20One.transfer(
      Principal.fromText(multisig_canister_id),
      BigInt(1000000000)
    );
    expect(result).toEqual({ Ok: BigInt(0) });
  });

  it("Multisig should have balance of 1000000000 DIP20", async () => {
    let result = await dip20One.balanceOf(
      Principal.fromText(multisig_canister_id)
    );
    // TODO: change this to be equal to the amount sent instead fo `greatherThan`  for testing
    expect(result).toBeGreaterThanOrEqual(BigInt(1000000000));
  });

  it("Should send identity one ICRC1 funds to multisig wallet", async () => {
    // The default behaviour is modified because the DIP20 canister was relyiant on CAP, which is removed
    // The response now always returns `0` as a response because we dont track the transactions
    let result = await icrcOne.icrc1_transfer({
      to: {
        owner: Principal.fromText(multisig_canister_id),
        subaccount: [],
      },
      fee: [],
      memo: [],
      from_subaccount: [],
      created_at_time: [],
      amount: BigInt(1000000000),
    });
    expect(result).toEqual({ Ok: expect.anything() });
  });

  it("Multisig should have balance of 1000000000 ICRC", async () => {
    let result = await icrcOne.icrc1_balance_of({
      owner: Principal.fromText(multisig_canister_id),
      subaccount: [],
    });
    expect(result).toBeGreaterThanOrEqual(BigInt(1000000000));
  });

  it("Should add identity three to the whitelist", async () => {
    const balance = await dip20One.balanceOf(
      Principal.fromText(multisig_canister_id)
    );
    let result = await msOne.whitelist_request({
      Add: identities.three().getPrincipal(),
    });
    if (balance > BigInt(1000000000)) {
      expect(result).toEqual({ Err: "Principal already whitelisted" });
    } else {
      expect(result).toEqual({ Ok: "Whitelist request approved" });
    }
  });

  it("Should have identity one and three in the whitelist", async () => {
    let result = (await msOne.get_whitelist()).map((p) => p.toString());
    await expect(Promise.resolve(result)).resolves.toHaveLength(2);
    await expect(Promise.resolve(result)).resolves.toContain(
      identities.one().getPrincipal().toString()
    );
    await expect(Promise.resolve(result)).resolves.toContain(
      identities.three().getPrincipal().toString()
    );
  });

  //
  // DIP 20
  //
  it("identity one should create a transfer request of 100_000_000 DIP20 tokens to identity two", async () => {
    let result = await msOne.transaction_request(
      Principal.fromText(dip20_canister_id),
      {
        DIP20: {
          to: identities.two().getPrincipal(),
          amount: BigInt(100000000),
        },
      }
    );
    expect(result).toEqual({ Err: "No majority reached" });
  });

  it("Should say the vote is already cast", async () => {
    let result = await msOne.vote_on_transaction_request(0, { Approve: null });
    expect(result).toEqual({ Err: "Approval vote already cast" });
  });

  //
  // IDENTITY THREE IS THE CALLER FOR THE FOLLOWING METHODS
  //
  it("Should approve the transaction request", async () => {
    let result = await msThree.vote_on_transaction_request(0, {
      Approve: null,
    });
    expect(result).toEqual({ Ok: "DIP20 transaction send request approved" });
  });

  it("Identity two should have a balance of 100000000 DIP20 tokens", async () => {
    let result = await dip20One.balanceOf(identities.two().getPrincipal());
    expect(result).toEqual(BigInt(100000000));
  });

  it("Should say the transaction request isnt pending", async () => {
    let result = await msThree.vote_on_transaction_request(0, {
      Approve: null,
    });
    expect(result).toEqual({ Err: "Transaction request is not pending" });
  });

  //
  // ICRC1
  //
  it("identity one should create a transfer request of 100_000_000 ICRC1 tokens to identity two", async () => {
    let result = await msOne.transaction_request(
      Principal.fromText(icrc1_canister_id),
      {
        ICRC1: {
          amount: BigInt(100000000),
          to: {
            owner: identities.two().getPrincipal(),
            subaccount: [],
          },
          fee: [],
          memo: [],
          from_subaccount: [],
          created_at_time: [],
        },
      }
    );
    expect(result).toEqual({ Err: "No majority reached" });
  });

  it("Should say the vote is already cast", async () => {
    let result = await msOne.vote_on_transaction_request(1, { Approve: null });
    expect(result).toEqual({ Err: "Approval vote already cast" });
  });

  //
  // IDENTITY THREE IS THE CALLER FOR THE FOLLOWING METHODS
  //
  it("Should approve the transaction request", async () => {
    let result = await msThree.vote_on_transaction_request(1, {
      Approve: null,
    });
    expect(result).toEqual({ Ok: "ICRC transaction send request approved" });
  });

  it("Identity two should have a balance of 100000000 ICRC1 tokens", async () => {
    let result = await icrcOne.icrc1_balance_of({
      owner: identities.two().getPrincipal(),
      subaccount: [],
    });
    expect(result).toEqual(BigInt(100000000));
  });

  it("Should say the transaction request isnt pending", async () => {
    let result = await msThree.vote_on_transaction_request(1, {
      Approve: null,
    });
    expect(result).toEqual({ Err: "Transaction request is not pending" });
  });
}
