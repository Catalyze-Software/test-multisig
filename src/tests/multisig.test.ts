import identities from "../misc/identities";
import { postGroup_invite_only, postGroup_private, postGroup_public } from "../mock-data/group.mock";
import { createGroupTest, joinPrivateGroupTest, joinPublicGroupTest } from "../functions/group.functions";
import { createProfileTest } from "../functions/profile.functions";
import { postProfile_identity_one_public, postProfile_identity_two_public } from "../mock-data/profile.mock";

// needed for the other tests to run (beforeAll doesnt work)
describe("Add principal to whitelist", () => {
  // createProfileTest(identities.two(), postProfile_identity_two_public);
});
