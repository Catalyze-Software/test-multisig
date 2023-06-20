import identities from "../misc/identities";
import multisigActor from "../misc/actors";
import { _SERVICE } from "../declarations/multisig.declarations";

export function addToWhitelistTest() {
  let msOne = multisigActor(identities.one());
  let msTwo = multisigActor(identities.two());
  let msThree = multisigActor(identities.three());
  let msFour = multisigActor(identities.four());

  it("Multisig one canister should be defined", async () => {
    expect(msOne).toBeDefined();
  });
  it("Multisig two canister should be defined", async () => {
    expect(msTwo).toBeDefined();
  });
  it("Multisig three canister should be defined", async () => {
    expect(msThree).toBeDefined();
  });
  it("Multisig four canister should be defined", async () => {
    expect(msFour).toBeDefined();
  });

  //
  // IDENTITY ONE IS THE CALLER FOR THE FOLLOWING METHODS
  //
  it("Should add identity two to the whitelist", async () => {
    let result = await msOne.whitelist_request({
      Add: identities.two().getPrincipal(),
    });
    expect(result).toEqual({ Ok: "Whitelist request approved" });
  });

  it("Should have identity one and two in the whitelist", async () => {
    let result = (await msOne.get_whitelist()).map((p) => p.toString());

    await expect(Promise.resolve(result)).resolves.toHaveLength(2);
    await expect(Promise.resolve(result)).resolves.toContain(identities.one().getPrincipal().toString());
    await expect(Promise.resolve(result)).resolves.toContain(identities.two().getPrincipal().toString());
  });

  it("Should create request to add identity three to the whitelist", async () => {
    let result = await msOne.whitelist_request({
      Add: identities.three().getPrincipal(),
    });
    expect(result).toEqual({ Err: "No marjority reached" });
  });

  it("Should try to add the request again and say there is already a pending request", async () => {
    let result = await msOne.whitelist_request({
      Add: identities.three().getPrincipal(),
    });
    expect(result).toEqual({ Err: "Already a pending add request" });
  });

  it("Should say the vote is already cast", async () => {
    let result = await msOne.vote_on_whitelist_request(1, { Approve: null });
    expect(result).toEqual({ Err: "Approval vote already cast" });
  });

  it("Should say the vote is already cast", async () => {
    let result = await msOne.vote_on_whitelist_request(1, { Reject: null });
    expect(result).toEqual({ Err: "Approval vote already cast" });
  });

  //
  // IDENTITY TWO IS THE CALLER FOR THE FOLLOWING METHODS
  //
  it("Should say request is deadlocked", async () => {
    let result = await msTwo.vote_on_whitelist_request(1, { Reject: null });
    expect(result).toEqual({ Ok: "Whitelist request deadlocked" });
  });

  //
  // IDENTITY ONE IS THE CALLER FOR THE FOLLOWING METHODS
  //
  it("Should add identity three to the whitelist", async () => {
    let result = await msOne.whitelist_request({
      Add: identities.three().getPrincipal(),
    });
    expect(result).toEqual({ Err: "No marjority reached" });
  });

  //
  // IDENTITY TWO IS THE CALLER FOR THE FOLLOWING METHODS
  //
  it("Should say the whitelist request is not pending (deadlocked)", async () => {
    let result = await msTwo.vote_on_whitelist_request(1, { Approve: null });
    expect(result).toEqual({ Err: "Whitelist request is not pending" });
  });

  it("Should say the whitelist request approved", async () => {
    let result = await msTwo.vote_on_whitelist_request(2, { Approve: null });
    expect(result).toEqual({ Ok: "Whitelist request approved" });
  });

  it("Should have identity one, two and three in the whitelist", async () => {
    let result = (await msTwo.get_whitelist()).map((p) => p.toString());
    await expect(Promise.resolve(result)).resolves.toHaveLength(3);
    await expect(Promise.resolve(result)).resolves.toContain(identities.one().getPrincipal().toString());
    await expect(Promise.resolve(result)).resolves.toContain(identities.two().getPrincipal().toString());
    await expect(Promise.resolve(result)).resolves.toContain(identities.three().getPrincipal().toString());
  });

  it("Should say the principal is not whitelisted", async () => {
    let result = await msTwo.whitelist_request({
      Remove: identities.four().getPrincipal(),
    });
    expect(result).toEqual({ Err: "Principal not whitelisted" });
  });

  //
  // IDENTITY FOUR IS THE CALLER FOR THE FOLLOWING METHODS
  //
  it("Should say the caller is not whitelisted", async () => {
    let result = await msFour.whitelist_request({
      Add: identities.three().getPrincipal(),
    });
    expect(result).toEqual({ Err: "Caller is not whitelisted" });
  });

  it("Should say the caller is not whitelisted", async () => {
    let result = await msFour.whitelist_request({
      Remove: identities.three().getPrincipal(),
    });
    expect(result).toEqual({ Err: "Caller is not whitelisted" });
  });

  //
  // IDENTITY ONE IS THE CALLER FOR THE FOLLOWING METHODS
  //
  it("Should say the there is no majority reached", async () => {
    let result = await msOne.whitelist_request({
      Remove: identities.two().getPrincipal(),
    });
    expect(result).toEqual({ Err: "No marjority reached" });
  });

  //
  // IDENTITY THREE IS THE CALLER FOR THE FOLLOWING METHODS
  //
  it("Should say the request is approved", async () => {
    let result = await msThree.vote_on_whitelist_request(3, { Approve: null });
    expect(result).toEqual({ Ok: "Whitelist request approved" });
  });

  it("Should have identity one and three in the whitelist", async () => {
    let result = (await msThree.get_whitelist()).map((p) => p.toString());
    await expect(Promise.resolve(result)).resolves.toHaveLength(2);
    await expect(Promise.resolve(result)).resolves.toContain(identities.one().getPrincipal().toString());
    await expect(Promise.resolve(result)).resolves.toContain(identities.three().getPrincipal().toString());
  });
}
