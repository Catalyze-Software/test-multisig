import { Ed25519KeyIdentity } from "@dfinity/identity";
import { pbkdf2Sync } from "pbkdf2";

const identityOne = () => {
  // 6s25k-hbv72-gibhe-tjgoy-pk77w-6ipvc-dzerp-rcg3q-o42a4-e6gyt-uqe
  const seed = pbkdf2Sync("one", "salt", 1000, 32, "sha512");
  return Ed25519KeyIdentity.generate(seed as Uint8Array);
};

const identityTwo = () => {
  // xdzj6-37hdr-i42r5-lehfl-cmcc6-mumlz-i6vdx-vfacv-e4hls-gb5bc-nae
  const seed = pbkdf2Sync("two", "salt", 1000, 32, "sha512");
  return Ed25519KeyIdentity.generate(seed as Uint8Array);
};

const identityThree = () => {
  // ca66n-ufugt-mpswh-vmj2w-ps2si-k7qhb-ad3nz-xdtcm-7kpzr-msdem-xqe
  const seed = pbkdf2Sync("three", "salt", 1000, 32, "sha512");
  return Ed25519KeyIdentity.generate(seed as Uint8Array);
};

export default {
  one: identityOne,
  two: identityTwo,
  three: identityThree,
  array: [identityOne, identityTwo, identityThree],
};
