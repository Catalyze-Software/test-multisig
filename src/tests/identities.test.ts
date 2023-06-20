import identities from "../misc/identities";

describe("identities check", () => {
  test("identity one", () => {
    expect(identities.one().getPrincipal().toString()).toBe(
      "6s25k-hbv72-gibhe-tjgoy-pk77w-6ipvc-dzerp-rcg3q-o42a4-e6gyt-uqe"
    );
  });
  test("identity two", () => {
    expect(identities.two().getPrincipal().toString()).toBe(
      "xdzj6-37hdr-i42r5-lehfl-cmcc6-mumlz-i6vdx-vfacv-e4hls-gb5bc-nae"
    );
  });
  test("identity three", () => {
    expect(identities.three().getPrincipal().toString()).toBe(
      "ca66n-ufugt-mpswh-vmj2w-ps2si-k7qhb-ad3nz-xdtcm-7kpzr-msdem-xqe"
    );
  });
  test("identity four", () => {
    expect(identities.four().getPrincipal().toString()).toBe(
      "kd6bo-htilb-g3mzh-gx7jd-jno2b-bp33o-ycr6y-zjzq2-y4o2l-56mee-tae"
    );
  });
});
