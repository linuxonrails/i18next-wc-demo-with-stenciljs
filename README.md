# i18next-wc-demo-with-stenciljs
i18next-wc demo in StencilJS

## Steps

### Create an StencilJS component project

```bash
npm init stencil
```

> ✔ Pick a starter › component
> 
> ✔ Project name › webcomponents

```bash
cd webcomponents/
npm install
```

### Test the demo files

```bash
npm run test
```

```
> webcomponents@0.0.1 test
> stencil test --spec --e2e

[01:19.0]  @stencil/core
[01:19.2]  v2.11.0 🐌
[01:19.3]  testing e2e and spec files
[01:20.3]  build, webcomponents, dev mode, started ...
[01:20.4]  transpile started ...
[01:21.7]  transpile finished in 1.37 s
[01:21.7]  copy started ...
[01:21.7]  generate custom elements bundle started ...
[01:21.7]  generate lazy started ...
[01:21.9]  copy finished (0 files) in 155 ms
[01:22.2]  generate custom elements bundle finished in 470 ms
[01:22.2]  generate lazy finished in 467 ms
[01:22.3]  build finished in 1.96 s

[01:22.3]  jest args: --e2e --spec --max-workers=8
 PASS  src/utils/utils.spec.ts
 PASS  src/components/my-component/my-component.spec.ts
 PASS  src/components/my-component/my-component.e2e.ts

Test Suites: 3 passed, 3 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        1.516 s, estimated 2 s
Ran all test suites.
```

(no errors)

### Apply the following patch

```patch
diff --git a/webcomponents/src/components/my-component/my-component.tsx b/webcomponents/src/components/my-component/my-component.tsx
index 56d51d9..cc71eb4 100644
--- a/webcomponents/src/components/my-component/my-component.tsx
+++ b/webcomponents/src/components/my-component/my-component.tsx
@@ -1,6 +1,30 @@
 import { Component, Prop, h } from '@stencil/core';
 import { format } from '../../utils/utils';
 
+import i18next from "i18next";
+import { intlMessage } from 'i18next-wc'
+
+// initialize i18next
+i18next.init({
+  lng: 'en-GB',
+  fallbackLng: "en",
+  resources: {
+    en: {
+      default: {
+        placeholder: 'fill in here',
+        'Selected language': 'Selected language: {{value}}'
+      },
+    },
+    fr: {
+      default: {
+        placeholder: 'remplir ici',
+        'Selected language': 'Langue choisie : {{value}}'
+      }
+    }
+  },
+  defaultNS: 'default'
+});
+
 @Component({
   tag: 'my-component',
   styleUrl: 'my-component.css',
@@ -27,6 +51,11 @@ export class MyComponent {
   }
 
   render() {
-    return <div>Hello, World! I'm {this.getText()}</div>;
+    return (
+      <div>
+        Hello, World! I'm {this.getText()}
+        <input placeholder={intlMessage({i18next, label: 'placeholder'})} />
+      </div>
+    );
   }
 }
```

### Test the demo files with i18next-wc patch

```bash
npm run test
```

```
> webcomponents@0.0.1 test
> stencil test --spec --e2e

[02:48.0]  @stencil/core
[02:48.2]  v2.11.0 🐌
[02:48.3]  testing e2e and spec files
[02:49.4]  build, webcomponents, dev mode, started ...
[02:49.4]  transpile started ...
[02:50.8]  transpile finished in 1.34 s
[02:50.8]  copy started ...
[02:50.8]  generate custom elements bundle started ...
[02:50.8]  generate lazy started ...
[02:50.9]  copy finished (0 files) in 152 ms
[02:51.5]  generate custom elements bundle finished in 708 ms
[02:51.5]  generate lazy finished in 744 ms

[ ERROR ]  Rollup: Missing Export: ./src/components/my-component/my-component.tsx:5:9
           'intlMessage' is not exported by ./node_modules/i18next-wc/dist/index.js, imported by
           ./src/components/my-component/my-component.tsx

      L4:  import i18next from "i18next";
      L5:  import { intlMessage } from 'i18next-wc'

[02:51.5]  build failed in 2.17 s
```
