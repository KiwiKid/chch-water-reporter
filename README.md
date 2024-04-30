This project is an experiment in mapping the relative residential water usage in Christchurch, NZ. Its goal is to raise awareness of water conservation and promote a broader understanding of how we consume our natural resources.

With over 170,000 addresses on the map, the app required a dynamic rendering system for higher zoom levels, which allowed for smooth scrolling without compromising the detail displayed on the map.

![view water usage](img/chch-reporting.PNG)

Collection of the addresses was via a basic Node-Red automation, the site provides lookup based on id and list endpoint

![check property status](img/1_getPropertyStart.png)

![check property status](img/2_CheckPropertyStatus.png)




```bash
npm run dev
# or
yarn dev
```