// cookies读取
const cookie = {
  read(name: string): string | null {
    // ID=39c0cdced3a0e6b5:T=1580471431:S=ALNI_MZTVFKnUvRc12NARs3K8mAll1g6Ng
    // 四个正则片段
    // ^|;\s*  字符串开头或者;开头 空白符或制表符一次或多次
    // name cookie的名称
    // [^;]*  注意 : ^ 在[]中是非的含义

    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
    return match ? decodeURIComponent(match[3]) : null
  }
}

export default cookie
