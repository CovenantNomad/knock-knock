import * as MediaLibrary from 'expo-media-library';


export const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const getBlob = async (uri) => {
  return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
      resolve(xhr.response)
    }

    xhr.onerror = () => {
      reject(new TypeError("Network request failed."))
    }

    xhr.responseType = "blob";
    xhr.open("GET", uri, true)
    xhr.send(null)
  })
}

export const getpermissions = async () => {
  const { accessPrivileges, canAskAgain } = await MediaLibrary.getPermissionsAsync();

  if (accessPrivileges === "none" && canAskAgain) {
    const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync()

    return accessPrivileges
  }
}
