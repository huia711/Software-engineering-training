// 获取百度搜索、必应搜索和谷歌搜索的搜索建议（即联想词)

import axios from "@/plugins/axios"
// 获取百度搜索的联想词
// - : Promise<string[]> 表示这个函数会返回一个 Promise 对象，Promise 对象会包含一个数组，在这个例子中数组的元素都是字符串类型的搜索建议。
export async function getBaiduSuggestion(keyword: string): Promise<string[]> {
  try {
    const { data } = await axios.get<string>("https://suggestion.baidu.com/su", {
      params: {
        p: 3, // 联想词的等级，取值为 0 至 10，默认为 3
        ie: "UTF-8", // 请求的编码格式
        cb: "", // 回调函数名称，这里为空
        wd: keyword // 搜索关键词
      },
      responseType: "text" // 响应数据的类型，需要设置为 text 才能正常解析
    })
    // 使用正则表达式匹配出 JSON 格式字符串，然后解析为数组
    /**
     * . 表示匹配任意字符。
     * * 表示匹配前面的字符零个或多个。
     * ? 表示在量词 * 或 + 或 ? 后面使用时，表示非贪婪匹配，即尽可能少地匹配。
     * s: 表示匹配字符串中的 s: 字符串。
     * \[ 表示匹配字符串中的 [ 字符。
     * .*? 表示非贪婪地匹配任意字符。
     * \] 表示匹配字符串中的 ] 字符。
     * .*? 表示非贪婪地匹配任意字符。
     */
    const find = /.*?s:(\[.*?\]).*?/
    const jsonText = find.exec(data)?.[1] ?? "[]" // 处理 null 值，避免异常
    return JSON.parse(jsonText) // JavaScript 内置的一个函数，用于将 JSON 字符串解析为 JavaScript 对象
  }

  catch {
    return [] // 处理错误，返回空数组
  }
}

// 获取必应搜索的联想词
export async function getBingSuggestion(keyword: string): Promise<string[]> {
  try {
    const { data } = await axios.get<any>("https://api.bing.com/qsonhs.aspx", {
      params: {
        type: "json", // 返回数据的格式，这里是 json
        q: keyword // 搜索关键词
      }
    })
    // 解析数据，获取搜索建议
    interface BingSuggestionItem {
      Txt: string;
      Type: string;
    }
    // 代码首先访问 data 对象中的 "AS" 属性，在 Bing API 的定义中，这是一个名为“自动补全搜索（AutoSuggest）”的功能。"AS" 对象中包含 "Results" 属性，该属性包含搜索建议的结果列表。
    // "Results" 属性是一个数组，其中包含一个或多个搜索建议结果对象。代码访问数组中的第一个元素 [0]，然后继续访问它的 "Suggests" 属性。 "Suggests" 是一个数组，其中包含搜索建议对象的列表。
    const suggests: BingSuggestionItem[] = data["AS"]["Results"][0]["Suggests"]
    // 将 suggests 数组中每个 BingSuggestionItem 对象的 Txt 属性提取出来
    // map:对数组中的每个元素执行一个回调函数，并将回调函数的返回值存储在一个新数组中
    return suggests.map(item => item.Txt)
  }

  catch {
    return [] // 处理错误，返回空数组
  }
}

// 获取谷歌搜索的联想词
export async function getGoogleSuggestion(keyword: string): Promise<string[]> {
  try {
    const { data } = await axios.get<string>("https://suggestqueries.google.com/complete/search", {
      params: {
        client: "gws-wiz", // 客户端类型
        q: keyword, // 搜索关键词
        jsonp: "" // 回调函数名称，这里为空
      },
      responseType: "text" // 响应数据的类型，需要设置为 text 才能正常解析
    })
    // 使用正则表达式匹配出 JSON 格式字符串，然后解析为数组
    const find = /\["(.*?)"/g
    const suggestion: string[] = [] // 定义了一个空数组
    let temp: any = null // 定义了变量 temp 并将其赋值为 null（类型是 any）
    // 这段代码使用正则表达式 find 在 data 中匹配 Google 搜索建议文本，然后将匹配到的文本推入 suggestion 数组中。
    while ((temp = find.exec(data)) != null) {
      suggestion.push(temp[1])
    }
    return suggestion
  }

  catch {
    return [] // 处理错误，返回空数组
  }
}
