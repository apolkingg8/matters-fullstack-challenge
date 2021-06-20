# Full-stack Engineer Written Challenge

Please answer one or more questions on Section 1 and Section 2, and two or more questions in Section 3. There are no word limits on the answers; you can keep them as concise as possible as long as you have demostrate your thoughts. 

You can directly write your answers in your branch following the questions. 

## Section 1: Architectural Design

*Please answer at lease one of the following questions.*

* Assume that you are building a discussion forum similar with [Hacker News](https://news.ycombinator.com/). The product will be very popular, and your team made the following projection: monthly traffic of 30k page views and 5k posts in the first year, and monthly traffic of 300m page views and 500k posts in the second year. How would you choose your frontend and backend technologies, infrastructures and deploying methods? What methods will you use in scaling your platform and envovling the infrastructures?

30k月流量並不算一個很大的數字，但300m月流量就很驚人了。以類似Hacker News的網站為例，一開始構建的的時候就應該朝static page的方向構建然後掛上CDN，盡少使用後端的資源。

前端的話，第一年可以先用Next.js，放在App Engine或是Cloud Function之類scalable的地方，然後再花時間構建static page generator的部分。輕量化也是必須的。

後端的話，第一年一樣先放在scalable的地方，隨著前端的優化應該會縮小到只有登入/登出/新增/刪除文章時會需要，可以大幅降低loading。

如果這樣沒辦法承受300m月流量的話，要看瓶頸出在哪個部分，CDN上的static page應該沒問題，問題可能會在back-end或sql上，看cloud service有沒有相關的scalable方案可以解決。

CPU loading重的模組（這個案例上感覺沒有，有的話可能是static page generator）可以移出來Cloud Function，request爆量可以用Cloud Run，K8S等方案，卡SQL的話目前還沒有比較好的方法，要從後端的SQL語句優化、排程等方面下手，也可以用Redis開個Buffer pool之類的。

之前做CDN的經驗是，當量大到一定程度時，連單純的log寫入都需要做分流批次處裡，所以我猜最大的優化點（瓶頸）應該還是SQL周遭。

* Assume that you are building a backend service for a medical company. When a request come in, this service needs to take the user input, pass it to a pre-trained computational model, and return the output to the user. The service needs to handle a high request frequency with uncertian average traffic volumne, and the computational model needs to process large amount of data in parallel. How would you design this service and choose the building blocks to achieve the above requirements?

把cpu loading高的模組分發到Cloud Function或Cloud Run（如果模組比較大）之類的scalable service上面，可以同時應付高頻率請求及不確定流量，而且相對省錢。

* Assume that you have an application that is growing very fast. It uses PostgreSQL as data storage, and the growing traffic is making write and read operations slow. What strategies would you take to scale your database horizontally and vertically?

在SQL前面架一個Redis（或類似服務）作為快取，改善讀取的部分，如果有寫入壅塞的情形，可以在後端把非即時性的寫入動作做排程或批次處理。

## Section 2: Distributed Systems and Web3

*Please answer at lease one of the following questions.*

* Assume you are to design a product supporting a social network, which allows users to publish articles, comment on articles, and follow other users' articles and comments. You also want this social network to be decentralized, so that it is not easilier censored, that the network cannot be brought down by single point of failure, and that other developers can build different tools for the network. What technologies and product would be the essential building blocks, what roles would they play, and how would you combine them together?

要做去中心化內容系統的話，IPFS是一個現成的好選項，可以直接把公鏈視為persist data層；問題可能會在於獲取檔案的反應時間，所以前端還是會有一層中心化的快取。

* Assume you are to design a product for crowdfunding creative projects with NFTs, where the creator pre-sale the ownership of the final result as NFTs. From minting the tokens to delivering the final result, what are the UX and techonogical challenges you forsee, and what do you think it takes to solve these problems well?

NFT的一個常見問題是：我確保了檔案本身的唯一性，但沒有確保檔案跟創作者之間的關聯性；也就是說，檔案可能根本不是來自創作者本人。這部分需要設計創作者的驗證機制（非程式端），並且直接把NFT跟創作工具（或收錄工具）進行結合（程式端）。

## Section 3: Personal Passions and Communities

*Please answer at lease two of the following questions.*

* What are some technologies you are recently fascinated with, and why are they interesting to you?

最近主要在學Rust。在我的技能樹中，大多數的事都可以用TypeScript解決，牽扯到平台相關的話我也略懂C#以及Java，但一直缺乏一個極高效能的語言來輔助Javascript。

選中Rust一來是看上他在compiler階段的安全性、先避免掉可能的memory recycle問題，二來是他first-class的支援WebAssembly，對於前端的效能也有幫助。

* What are some open source projects that you are involved with, or enjoy working on? What aspect of the project (e.g. architectural design, scope, community vibe, organization) makes it enjoyable or admirable?

我喜歡一些小而精美、專心做一件小事的project，可以很快地看出整個架構，在code裡感受到作者的想法思路，並和作者互相交流。

* If you were given the resource and freedom to start and maintain an open source project, what problem do you choose to solve, and how would you setup the community guideline and collabration process?

我想開源現在正在做的Tiat。

我一直有一個想法，想要解決跨平台之間file browser體驗不一致的問題，以及太多雜七雜八檔案相關工具（轉檔等等）的問題，Tiat算是一個開始，先做好核心的瀏覽及搜尋並支援影音檔案，框架穩定之後可能延伸到文件檔案以及其他特殊檔案（3d模型等等），還可以以此為主體架構一個不依賴各大龍頭的去中心化檔案網路。

在開發Tiat2的時候，我也參考了一些半開源的Project，把一些功能插件化、讓社群可以一起協作部分常用的功能（file parser, converter, archiver等等）。
