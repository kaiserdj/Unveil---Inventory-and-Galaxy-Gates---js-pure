# Unveil - Inventory and Galaxy Gates - js pure
Userscript port https://www.elitepvpers.com/forum/darkorbit/4869026-script-unveil-check-inventory-galaxy-gates-browser.html to pure js to run on darkorbit client

![image](https://user-images.githubusercontent.com/5487950/124509174-c2bcf980-ddd1-11eb-8220-64a04e54e527.png)

![image](https://user-images.githubusercontent.com/5487950/124509157-b9cc2800-ddd1-11eb-907a-e8eed049f8cd.png)


### Install
- Install the darkorbit client: https://github.com/kaiserdj/Darkorbit-client

- Run the client as a developer, adding the -d parameter to the launch

- Enter DarkDev, and in the CustomJs section

- Add a new rule:

 > Match:
```
*.darkorbit.com/indexInternal.es?action=internalStart*
```
 > Action Url:
 ```
https://raw.githubusercontent.com/kaiserdj/Unveil-Inventory-and-Galaxy-Gates-js-pure/main/Inventory%20and%20Galaxy%20Gates.js
``` 

All credits to HORDES.IO - https://www.elitepvpers.com/forum/members/7814556-hordes-io.html
