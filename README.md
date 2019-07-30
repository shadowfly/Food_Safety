# Food_Safety
##免密登录

[根据该链接配置](<https://blog.csdn.net/github_35817521/article/details/53458217>)

##上传本地文件到服务器相应合约目录

pwd查看路径，将第一个路径替换成本机路径

`scp -P 22 /Users/linyijing/Desktop/blockchain_race/Food_Safety/contract/FoodSafety.sol ubuntu@49.234.194.80:/home/ubuntu/fisco/console/contracts/solidity`

##启动fisco

`cd ~/fisco/console && bash start.sh`

##部署合约

`deployByCNS FoodSafety.sol 1.0`

##call调用（测试） 

getFoodID是一个测试用的函数

`callByCNS FoodSafety:1.0 getFoodID`