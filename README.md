# Obsyx

一个 Obsidian 插件，提供类似飞书的 `/` 快速插入功能。在编辑器中输入 `/` 即可弹出内容类型菜单，快速插入 Markdown 和 Obsidian 特有元素。

## 功能演示

在编辑器**行首**或**空格后**输入 `/`，弹出快速插入菜单：

- 继续输入关键词可实时过滤（支持中英文）
- 上下键选择，回车或点击插入
- 选择后自动插入模板并定位光标到可编辑位置

## 支持的内容类型

| 类别 | 内容类型 | 触发关键词 |
|------|---------|-----------|
| 标题 | Heading 1-6 | `h1`-`h6`、`heading`、`标题` |
| 列表 | 无序列表 | `ul`、`list`、`bullet`、`列表` |
| 列表 | 有序列表 | `ol`、`ordered`、`number`、`编号` |
| 列表 | 任务列表 | `task`、`todo`、`checkbox`、`待办` |
| 块 | 代码块 | `code`、`codeblock`、`代码` |
| 块 | 引用 | `quote`、`blockquote`、`引用` |
| 块 | Callout | `callout`、`admonition`、`提示` |
| 块 | 表格 | `table`、`表格` |
| 分隔 | 分割线 | `hr`、`divider`、`line`、`分割线` |
| 链接 | 链接 | `link`、`url`、`链接` |
| 链接 | 图片 | `image`、`img`、`图片` |
| 嵌入 | 嵌入文件 | `embed`、`file`、`嵌入` |
| 图表 | Mermaid 图 | `mermaid`、`diagram`、`流程图` |
| 数学 | 数学公式块 | `math`、`formula`、`latex`、`公式` |
| 引用 | 脚注 | `footnote`、`fn`、`脚注` |
| 标签 | 标签 | `tag`、`标签` |

## 安装

### 手动安装

1. 下载最新 [Release](../../releases) 中的 `main.js`、`manifest.json`、`styles.css`
2. 在你的 Obsidian vault 中创建目录 `.obsidian/plugins/obsyx/`
3. 将下载的三个文件放入该目录
4. 重启 Obsidian，进入 设置 → 第三方插件 → 启用 Obsyx

### 从源码构建

```bash
git clone https://github.com/zhoutaoping/obsyx.git
cd Obsyx
npm install
npm run build
```

构建后将生成 `main.js`，连同 `manifest.json` 和 `styles.css` 一起复制到插件目录即可。

## 开发

```bash
# 安装依赖
npm install

# 开发模式（监听文件变化自动重新构建）
npm run dev

# 生产构建
npm run build
```

## 技术实现

- 基于 Obsidian 的 `EditorSuggest` API
- TypeScript + esbuild 构建
- 触发条件：行首或空格后输入 `/`
- 支持中英文关键词模糊匹配

## License

[MIT](LICENSE)
