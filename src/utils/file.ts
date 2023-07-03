// import { isEmpty } from "./common"
//
// /**
//  * 文件转Base64
//  *
//  * @param file 文件
//  * @returns Base64
//  */
// export async function fileToBase64(file: File) {
//   const reader = new FileReader()
//   reader.readAsDataURL(file)
//
//   await new Promise(resolve => (reader.onload = resolve))
//   return reader.result
// }
//
// /**
//  * Base64转Blob
//  *
//  * @param base64 base64
//  * @returns Blob
//  */
// export function base64ToBlob(base64: string) {
//   const temp = base64.split(","),
//     mime = temp[0].match(/:(.*?);/)![1],
//     data = atob(temp[1]),
//     u8arr = new Uint8Array(data.length)
//
//   let index = data.length
//   while (index--) {
//     u8arr[index] = data.charCodeAt(index)
//   }
//
//   return new Blob([u8arr], { type: mime })
// }
//
// export function getFilename(path: string) {
//   const start = path.lastIndexOf("/") + 1,
//     end = path.lastIndexOf(".")
//
//   return path.substring(start, end)
// }
//
import {isEmpty} from "@/utils/common";

export async function verifyImageUrl(url: string) {
  if (isEmpty(url)) return false

  const tempImg = new Image()
  tempImg.src = url

  try {
    await new Promise((resolve, reject) => {
      tempImg.onload = resolve
      tempImg.onerror = reject
    })
    return true
  } catch {
    return false
  } finally {
    tempImg.remove()
  }
}
//
// export function isImageFile(file: Blob) {
//   const imageType = ["png", "jpeg", "jpg", "gif"]
//
//   let fileType = file.type
//   fileType = fileType.substring(fileType.lastIndexOf("/") + 1, fileType.length)
//
//   return imageType.includes(fileType)
// }
