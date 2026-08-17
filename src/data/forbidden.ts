import { createHash } from "node:crypto";

export type ForbiddenFingerprint = {
  length: number;
  sha256: string;
};

/**
 * One-way fingerprints of identifiers that may not enter this public project.
 * Keeping only fingerprints lets CI enforce the boundary without publishing the
 * identifiers the boundary exists to protect.
 */
export const FORBIDDEN = [
  { length: 9, sha256: "d9a419a640ab61fbd21295458ef7e52dd894ee9d1cf6d7210bd8195ae9ff030a" },
  { length: 17, sha256: "905d0e90d8497bb8079ceca8ae833bec98a36d9e1d4596813b4ed6d4726f2598" },
  { length: 17, sha256: "ded2b4e4ec24bf490b8cac03c42483417e8d732de027482e8724ad9f56c0f840" },
  { length: 16, sha256: "fa066339a2e525bdfc9943210bf74e24ec1561444ee81f01ca42f24e77175996" },
  { length: 32, sha256: "1cc9a2fca825e922b3830c539adb0a07061399a317eceab3cd3d9394abcf9792" },
  { length: 8, sha256: "03c84d96cd1a4393d5c08b2ab62e223710f4d7892c56469d5054f1277e84aab5" },
  { length: 16, sha256: "781d8673c416ae8a76d1a81feb7b7f89ee650a88ed3c15208e64e68fc138492a" },
  { length: 9, sha256: "cc8cb67ea12a8a36f3d8503ac7ee78fcd78928480ea5310af38d5c94b7205d07" },
  { length: 14, sha256: "6d3faaeb2882ae520b7762c65b67c9cbfdb6841f442ac77dd66e9b386387d312" },
  { length: 10, sha256: "081d8af4803e85e1b44713fdc6d267d02fc8c5326bdb04a1bf5fd260591f94fa" },
  { length: 19, sha256: "72608c360fc7ee3129576f7e7ced2e7692ea1b4bd9502a0e3f076c12e4275a41" },
  { length: 14, sha256: "ad546172b8bebf03e311dacff9c5f05aa19ee542ffb62526e557c4f9cb3eeb59" },
  { length: 8, sha256: "e3a56175c39ae982873c3d6740efa69b2937368ed2c6a78e7e6972654077e400" },
  { length: 15, sha256: "195f67328faf6d83833daf5c09804217382547a9d2b1300cf06db37f965f9029" },
  { length: 10, sha256: "c6ff5882a2226770b45faf6feba8a88860fffee4a7c3312dc38b8d338865b28f" },
  { length: 29, sha256: "065043ae4b142a20905b9a71f2425d24ed08cd33e96729a181d652dbe9e35040" },
  { length: 14, sha256: "40f292c95cfbe26eec366016478f076d86f726d2cd2448e2f0929adf1cb39967" },
  { length: 15, sha256: "e234aa72b6e52f78fbf84f39adfa2d4296019afda5f9cfb13414ef99d3e6bc02" },
  { length: 20, sha256: "de27b4101b925b96facb641def9c79623b92e268471e4e0088f88d1ee6c25ce8" },
  { length: 6, sha256: "6e210feae0a0140dd8fd81629305131a92c214d10dadb1924035b3342f61da05" },
  { length: 17, sha256: "9ab8c4f753cb4a5acb46f1aef6074a8000db1b1bded355bee0fa78453cf18c41" },
  { length: 11, sha256: "8641ec6f7b9afd6e10ccf8114bc00911c945ba44671ed327145f8da99d7e3fd0" },
  { length: 15, sha256: "e041de70babbee47052ce550fa447e1f7455d9ad6e0c787cacc7626f25de9b30" },
  { length: 12, sha256: "e0a4e3d90137be502a748c45243cf44b92ffb26db5dc301aad5f54ce238de340" },
  { length: 12, sha256: "9f1a1fd78c415664f2c3cae74535641af806f79f282fb1e8f3e70e8760f2c280" },
  { length: 17, sha256: "11f6eafee554b6ea93d71f9823db203375c9f45212419be7a434839d52a911e6" },
  { length: 16, sha256: "018d2e9e3b3b81728afc812db04c9651acef985a6477ae7aaa77a27e3793cc07" },
  { length: 8, sha256: "9231e4d245c169d2c64898c732ad6f0b358558821b347c9e96fe9fa799efdfb7" },
  { length: 9, sha256: "3ef70bcd583ff0b6c40edda71afd219dd752c885a73afaf363c8d750c0660e13" },
  { length: 7, sha256: "67568956aa1163f346e311fb27626fc44fd4be45bda98b17984d0e5c67346a75" },
  { length: 9, sha256: "3bad8660c8f1afee71083a819e72737498025896e788cd3201c65154c412042b" },
  { length: 14, sha256: "f06b84fa8085ec902cd5908d29d4846622faa61d5d8ec640ef83f5c6165a2145" },
  { length: 11, sha256: "5f04c64cbace646c9889dd4b558579006d2f7389855b8cc62390748edb2aed7b" },
  { length: 8, sha256: "9828595660b55645540390b217f36bfc6ff5241066f044796d795e04f1ada489" },
  { length: 4, sha256: "1ee815f335edb8a9769c8e0ed2564a759e0e89f3ddb03d1325ad977844d7d1ec" },
  { length: 6, sha256: "091d29ac0b09248a6e71774911c4842c6f127355f06e596c9e533670ea37bd7b" },
  { length: 4, sha256: "b0b5f54b20114024d9a08e1ea68051fe795be045f5a83ce86cffd76d3bf56304" },
  { length: 7, sha256: "65b87174be3b1b122e2b0929f0b84888637d31a4a83bb96a860bcff411f5e668" },
  { length: 12, sha256: "7b2d868501a9488d3d7add5ca33a6648df2dda45be5999229494989471f73319" },
  { length: 6, sha256: "94dc354ccaa14e47b774467966de2b443e428ae8ed4849d4e423fb387463d9a0" },
  { length: 12, sha256: "b0ede7d97d74775b61ce9daa4a48622dbfdef947ad2464bd09204ce43e5d9697" },
  { length: 6, sha256: "bf73430c738e6602ffea61623ac4cb5ff2104589fa035ea1896f359521b82937" },
  { length: 7, sha256: "1906c98188f3fce4c269a6a96e48392469220a63a755c53cb182aceb3fc6d200" },
  { length: 7, sha256: "074b8ebbacbd697396a71619993b5278596e67868a07a3b0c696a594b77ae98b" },
  { length: 13, sha256: "014197153bd23be4c91c8f7119c75b86694dfca78205aadd8bd31fd18faedb1a" },
  { length: 8, sha256: "e9edd5704019467ab343da54bc4394cb750ad3ffc23066150c66f9ae16147cfa" },
  { length: 8, sha256: "34d10a5f640a9766a46f767074497cfc1d8d7b25f9ba35c6f28a3c3b4d4009ff" },
  { length: 13, sha256: "0f7465f4971c3f512e14ce47d1724057819a72fe365770627f7e89e31ce06b88" },
  { length: 7, sha256: "10f447d8b2b57bfde58e89639dad462d0a072c084fd46cc8982aacfde3b4bdd4" },
  { length: 8, sha256: "f3da8d18f95b52fe9a25a4d7138168ed7a8096fd43ef38df6b6b800f8697b573" },
  { length: 6, sha256: "ff33e95ab31327d5e5e3f4e6e0e4336d93cfc5555c60bd5ea7a4363c77a8cf66" },
  { length: 10, sha256: "d4bad569636f8a5deb98b99bf0b298258cd8cbf52c06472349396e7fda55d88e" },
  { length: 7, sha256: "fc387845155d7fc07d832398c0baf7d8cb564b395ece80ee4f21a83d6c3a8b66" },
  { length: 6, sha256: "7deead025aea61ac476bb9bb0d13b57a7306b15adea59c1f1b74e6f0abdaf7ad" },
  { length: 8, sha256: "3ae7b1021a3645aaccfc00a8190a86ae34d530de5215a3cfe90c13e4b0e8326f" },
  { length: 7, sha256: "11e9f96ee9890ecf8cd3d4644c0476c4f380e8dd28cc93d6b5ab58cc4e140344" },
  { length: 7, sha256: "6708bf7404c548482d36e6e1d3634e3b97136ac74cc52620ce0bd4a1b5a40f3d" },
] as const satisfies readonly ForbiddenFingerprint[];

const fingerprintsByLength = new Map<number, Set<string>>();
for (const fingerprint of FORBIDDEN) {
  const hashes = fingerprintsByLength.get(fingerprint.length) ?? new Set<string>();
  hashes.add(fingerprint.sha256);
  fingerprintsByLength.set(fingerprint.length, hashes);
}

export function findForbiddenFingerprints(input: string): string[] {
  const corpus = input.toLowerCase();
  const found = new Set<string>();

  for (const [length, hashes] of fingerprintsByLength) {
    for (let index = 0; index <= corpus.length - length; index += 1) {
      const candidate = corpus.slice(index, index + length);
      const fingerprint = createHash("sha256").update(candidate).digest("hex");
      if (hashes.has(fingerprint)) found.add(fingerprint);
    }
  }

  return [...found];
}
