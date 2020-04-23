# 关于锁定包版本

```
npm shrinkwrap
npm shrinkwrap --dev//将dev-dependencies计算在内
```

shrinkwrap会在根目录生成npm-shrinkwrap.json文件。之后的npm install会参照这个文件的版本来安装。