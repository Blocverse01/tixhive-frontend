import Moralis from "moralis";

export const uploadFile = async (fileData) => {
  if (!fileData && !(fileData instanceof File)) {
    throw new Error("Cannot Upload Invalid file");
  }
  const file = new Moralis.File(fileData.name, fileData);
  await file.saveIPFS();
  return [file.ipfs(), file.hash()];
};

export const uploadMetadataObject = async (object) => {
  const file = new Moralis.File(`${object.tokenId}.json`, {
    base64: btoa(JSON.stringify(object)),
  });
  await file.saveIPFS();
  return [file.ipfs(), file.hash()];
};

export const uploadBase64File = async (base64Data) => {
  const file = new Moralis.File("image.png", { base64: base64Data });
  await file.saveIPFS();
  return [file.ipfs(), file.hash()];
};
