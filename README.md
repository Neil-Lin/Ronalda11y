# Ronalda11y

![image](https://badgen.net/badge/license/MIT/orange)

Ronalda11y 專注在製作符合無障礙網頁規範的 web component。我們期望網頁都能達成無障礙，以及減少工程師對於各種套件的依賴程度、降低入門門檻、提升使用靈活性，進而達成在開發時也能擁有易用性、可理解、穩定性高。如此一來，除了製作出的網頁是無障礙，也能各種降低成本。  

Ronalda11y 名稱是由 Ronald L. Mace 與 accessibility(a11y) 組合而成，以此紀念由他帶領制定的通用設計七大原則。  


Ronalda11y focuses on making web components that comply with accessibility standards. We hope that web pages can be barrier-free, reduce engineers' dependence on various packages, lower entry barriers, and improve usage flexibility, so that they can be easy to use, understandable, and stable during development. In this way, in addition to making the web pages barrier-free, it can also reduce costs in various ways.  

The name Ronalda11y is a combination of Ronald L. Mace and 'accessibility' (abbreviated as a11y), to honor the seven major principles of universal design developed under his leadership with his team.  


## 以 Web Component 開發無障礙網頁元件的挑戰 Challenge

- Shadow DOM 的獨立性：確保輔助技術可以使用元件內部的互動和結構。    
- 鍵盤導航與焦點管理：確保鍵盤可以操作元件，並且規劃焦點的順序是合理的。  
- 語義正確性：正確的使用 HTML 標籤與 ARIA，確保讓使用者在接收與發送時的資訊都有正確傳遞。  
- 即時更新通知：確保網頁資料更新時，使用者可以暸解當前網頁狀態。  
- 跨瀏覽器和設備的相容性：桌機、行動裝置、較老舊系統能否使用。  
- 測試和驗證：自動化測試工具有可能沒辦法偵測。  
- 主流前端框架都要可以使用：Ronalda11y 開發時秉持著最簡單「copy and paste」就能用的原則，降低製作無障礙網頁的成本，不再有版本升級的壓力，需要客製化時也可以自行發展。唯要測試各個主流前端框架要怎麼使用，在開發 Ronalda11y 會比較耗時。
  
- Shadow DOM Isolation: Ensure that assistive technologies can access and interact with the internal structure and elements within the component.  
- Keyboard Navigation and Focus Management: Ensure that components are operable via keyboard and that focus order is logical.  
- Semantic Correctness: Use HTML tags and ARIA roles correctly to ensure that information is accurately conveyed during both transmission and reception.  
- Real-Time Update Notifications: Ensure that users are aware of the current state of the web page when data is updated.  
- Cross-Browser and Device Compatibility: Ensure compatibility across desktops, mobile devices, and older systems.  
- Testing and Validation: Be aware that automated testing tools may not be able to detect all accessibility issues.  
- Usability Across Mainstream Frontend Frameworks: Ronalda11y is developed with the principle of "copy and paste" usability to minimize the cost of creating accessible web pages, free from the pressures of version upgrades. Customization can be done independently if needed, though testing how to use Ronalda11y across various mainstream frontend frameworks can be time-consuming.  


## 如何使用 How to use

請直接開啟元件內的 .html 檔觀看詳細資訊，繁體中文請選擇 -zh-hant-tw.html 結尾的檔案。  

Please open the .html file found in each component folder to read more.  


## 關於開發者

請使用 Node.js 20 以上的版本。 

Please use Node.js version 20 or higher.  

### 元件測試 Test

我們使用 [@web/test-runner](https://modern-web.dev/docs/test-runner/overview/) 來測試元件， 
並且使用 `npm ci` 與 `npm run test`，即可測試。  
所有元件的測試檔案放在 test 資料夾裡。  

We use [@web/test-runner](https://modern-web.dev/docs/test-runner/overview/) for component testing.
Run `npm ci` and `npm run test` to test.  
All test files in test folder.

### 打包 components

我們使用 [vite](https://vitejs.dev/guide/) 來打包所有 components，整合到一支 ronalda11y.js 與 ronalda11y.min.js 。  
(其中會使用到 Rollup)
並且使用 `npm run build`，即可打包。  

We use [vite](https://vitejs.dev/guide/) to bundle all components into a single file, resulting in two outputs: ronalda11y.js and ronalda11y.min.js. This process involves using Rollup for the integration.