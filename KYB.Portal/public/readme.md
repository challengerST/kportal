##  整体框架说明
***
###### 以下内容使用markdown语法进行编辑
***
### 1. file watcher的配置

#### 1.1 SASS的设置
##### 1.1.1 [Arguments]
    --no-cache --style compressed --update $FileName$:$ProjectFileDir$\public\stylesheets\css\$FileDirPathFromParent(scss)$$FileNameWithoutExtension$.css

##### 1.1.2 [Output paths to refresh]
    $ProjectFileDir$\public\stylesheets\css\$FileDirPathFromParent(scss)$$FileNameWithoutExtension$.css

#### 1.2 browserify的设置
##### 1.2.0 参考[给WebStorm添加FileWatcher支持Browserify](http://blog.meathill.com/tech/devtools/add-file-watcher-for-webstorm-to-support-browserify.html)

##### 1.2.1 Scope 设置为mall_server
  * 应将需要链入的index.js单个去include
##### 1.2.2 Arguments
    listener.js -o .\bundle.min.js --debug
##### 1.2.3 Working directory
    $ProjectFileDir$\public\javascripts\$FileDirPathFromParent(javascripts)$
##### 1.2.4 Output paths to refresh
    $ProjectFileDir$\public\lib\src\js\