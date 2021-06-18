# Full-stack Engineer Written Challenge

Please answer one or more questions on Section 1 and Section 2, and two or more questions in Section 3. There are no word limits on the answers; you can keep them as concise as possible as long as you have demostrate your thoughts. 

You can directly write your answers in your branch following the questions. 

## Section 1: Architectural Design

*Please answer at lease one of the following questions.*

* Assume that you are building a discussion forum similar with [Hacker News](https://news.ycombinator.com/). The product will be very popular, and your team made the following projection: monthly traffic of 30k page views and 5k posts in the first year, and monthly traffic of 300m page views and 500k posts in the second year. How would you choose your frontend and backend technologies, infrastructures and deploying methods? What methods will you use in scaling your platform and envovling the infrastructures?

30k月流量並不算一個很大的數字，但300m月流量就很驚人了。以類似Hacker News的網站為例，一開始構建的的時候就應該朝static page的方向構建然後掛上CDN，盡少使用後端。
前端的話，第一年可以先用Next.js，放在App Engine或是Cloud Function之類scalable的地方，然後再花時間構建static page generator的部分。輕量化也是必須的。
後端的話，第一年一樣先放在scalable的地方，隨著前端的優化應該會縮小到只有登入/登出/新增/刪除文章時會需要，可以大幅降低loading。
如果這樣沒辦法承受300m月流量的話，要看瓶頸出在哪個部分，CDN上的static page應該沒問題，問題可能會在back-end或sql上，看cloud service有沒有相關的scalable方案可以解決。
CPU loading重的模組（感覺上沒有）可以移出來Cloud Function，request爆量可以用Cloud Run，K8S等方案，卡SQL的話目前還沒有比較好的方法，要從後端的SQL語句優化、排程等方面下手，也可以用Redis開個Buffer pool之類的。

* Assume that you are building a backend service for a medical company. When a request come in, this service needs to take the user input, pass it to a pre-trained computational model, and return the output to the user. The service needs to handle a high request frequency with uncertian average traffic volumne, and the computational model needs to process large amount of data in parallel. How would you design this service and choose the building blocks to achieve the above requirements?

把cpu loading高的模組分發到Cloud Function或Cloud Run（如果模組比較大）上面，可以同時應付高頻率請求及不確定流量，而且相對省錢。

* Assume that you have an application that is growing very fast. It uses PostgreSQL as data storage, and the growing traffic is making write and read operations slow. What strategies would you take to scale your database horizontally and vertically?

在SQL前面架一個Redis（或類似服務）作為快取，改善讀取的部分，如果有寫入壅塞的情形，可以在後端把非即時性需求的寫入動作作排程或批次處理。

## Section 2: Distributed Systems and Web3

*Please answer at lease one of the following questions.*

* Assume you are to design a product supporting a social network, which allows users to publish articles, comment on articles, and follow other users' articles and comments. You also want this social network to be decentralized, so that it is not easilier censored, that the network cannot be brought down by single point of failure, and that other developers can build different tools for the network. What technologies and product would be the essential building blocks, what roles would they play, and how would you combine them together?

要做去中心化內容系統的話，IPFS是一個現成的好選項，問題可能會在於獲取檔案的反應時間。

* Assume you are to design a product for crowdfunding creative projects with NFTs, where the creator pre-sale the ownership of the final result as NFTs. From minting the tokens to delivering the final result, what are the UX and techonogical challenges you forsee, and what do you think it takes to solve these problems well?

NFT的一個常見問題是：我確保了檔案本身，但沒有確保檔案跟創作者之間的關聯性；也就是說，檔案的源頭可能根本不是真的來自創作者本人。這部分需要設計創作者的驗證機制，或是直接讓NFT對創作工具進行結合。

## Section 3: Personal Passions and Communities

*Please answer at lease two of the following questions.*

* What are some technologies you are recently fascinated with, and why are they interesting to you?

最近主要在學Rust。

* What are some open source projects that you are involved with, or enjoy working on? What aspect of the project (e.g. architectural design, scope, community vibe, organization) makes it enjoyable or admirable?

* If you were given the resource and freedom to start and maintain an open source project, what problem do you choose to solve, and how would you setup the community guideline and collabration process?


