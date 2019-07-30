pragma solidity ^0.4.24;

contract FoodSafety {
    enum State {Output, Check, Transport, Flow}//食品状态：出厂、抽检、运输、流通

    uint public foodId = 0;

    struct Food {
        uint batchNum;//生产批次
        uint proDate;//生产日期
        string name;//食品名称
        string foodImg;//食品图片
        string superImg;//检疫证明
        address supplier;//供应商
        address driver;//司机
        address store;//门店
        State status;//食品状态
    }

    struct Supplier {
        string name;//供应商名称 ipfs
        string legalImg;//资质证书
    }

    struct Driver {
        string carNum;//车牌号
        string name;//司机名称
        string driImg;//驾驶证
    }

    struct Store {
        string name;//门店名称
        string storeImg;//门店经营资质
    }

    mapping(uint => Food) public foods;//食品信息
    mapping(address => Supplier) public suppliers;//供应商信息
    mapping(address => Driver) public drivers;//司机信息
    mapping(address => Store) public stores;

    mapping(address => bool) public suppWhiteList;
    mapping(address => bool) public driWhiteList;
    mapping(address => bool) public storeWhiteList;

    event LogOutput(uint foodId);
    event LogCheck(uint foodId);
    event LogTransport(uint foodId);
    event LogFlow(uint foodId);

    //test
    function getFoodID() public returns(uint) {
        return foodId;
    }

    //食品出厂
    function foodOutput (
            uint batchNum,
            uint proDate,
            string memory foodName,
            string memory foodImg,
            address carAddr,
            address storeAddr)
            public returns(uint){
        require(suppWhiteList[msg.sender] == true, 'Supplier Error.');
        ++foodId;
        foods[foodId] = Food(batchNum, proDate, foodName, foodImg, "", msg.sender, address(0), address(0), State.Output);
        driWhiteList[carAddr] = true;
        storeWhiteList[storeAddr] = true;
        emit LogOutput(foodId);
        return foodId;
    }
    //食品抽检
    function foodCheck(uint checkId, bool checkResult, string memory superImg) public returns(address){
        require(foods[checkId].status == State.Output, 'Food Status Error(check).');
        if(checkResult == true) {
            foods[checkId].superImg = superImg;
            foods[checkId].status = State.Check;
            emit LogCheck(checkId);
        } else {
            foods[checkId].superImg = "Food status: Bad";
        }
        return msg.sender;
    }
    //食品运输
    function foodTrans(uint transId, string memory carNum, string memory driverName, string memory driImg) public returns(address) {
        require(driWhiteList[msg.sender] == true, 'Wrong Driver.');
        require(foods[transId].status == State.Check, 'Food Status Error(transport).');
        drivers[msg.sender] = Driver(carNum, driverName, driImg);
        foods[transId].driver = msg.sender;
        foods[transId].status = State.Transport;
        emit LogTransport(transId);
        return msg.sender;
    }
    //食品流通
    function foodFlow(uint flowId, string memory storeName, string memory storeImg) public returns(address){
        require(storeWhiteList[msg.sender] == true, 'Wrong Stores.');
        require(foods[flowId].status == State.Transport,'Food Status Error(flow).');
        stores[msg.sender] = Store(storeName, storeImg);
        foods[flowId].store = msg.sender;
        foods[flowId].status = State.Flow;
        emit LogFlow(flowId);
        return msg.sender;
    }
    //添加合法供应商
    function addSupplier(address suppAddr, string memory suppName, string memory legalImg) public {
        suppliers[suppAddr] = Supplier(suppName, legalImg);
        suppWhiteList[suppAddr] = true;
    }
}