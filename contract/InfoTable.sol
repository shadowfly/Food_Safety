pragma solidity ^0.4.24;

import "./Table.sol";

contract InfoTable {
    event foodInsertEvent(int food);
    event suppInsertEvent(int supp);
    event transInsertEvent(int trans);
    event retailInsertEvent(int retail);
    event threePartyInsertEvent(int threeParty);
    event infoDeleteEvent(int foodNum);

    constructor() public {
        createFood();
        createSupp();
        createTrans();
        createRetail();
        createThreeParty();
    }

    //Food Init
    function createFood() private {
        TableFactory tf = TableFactory(0x1001);
        tf.createTable("food_info","foodNum","suppId,transId,retailId,outDate,ingredient,temp,origin,foodImg,foodState");
    }
    function openFoodTab() private returns(Table) {
        TableFactory tf = TableFactory(0x1001);
        Table table = tf.openTable("food_info");
        return table;
    }

    //Supplier Init
    function createSupp() private {
        TableFactory tf = TableFactory(0x1001);
        tf.createTable("supp_info","suppId","suppName,suppImg");
    } 
    function openSuppTab() private returns(Table) {
        TableFactory tf = TableFactory(0x1001);
        Table table = tf.openTable("supp_info");
        return table;
    }

    //Transport Init
    function createTrans() private {
        TableFactory tf = TableFactory(0x1001);
        tf.createTable("trans_info","transId","carNum,driverImg");
    } 
    function openTransTab() private returns(Table) {
        TableFactory tf = TableFactory(0x1001);
        Table table = tf.openTable("trans_info");
        return table;
    }

    //Retailer Init
    function createRetail() private {
        TableFactory tf = TableFactory(0x1001);
        tf.createTable("retail_info","retailId","retailName,retailImg");
    }
    function openRetailTab() private returns(Table) {
        TableFactory tf = TableFactory(0x1001);
        Table table = tf.openTable("retail_info");
        return table;
    }

    //ThreePartyInit
    function createThreeParty() private {
        TableFactory tf = TableFactory(0x1001);
        tf.createTable("threeParty_info","threePartyId","threePartyName,threePartyImg");
    }
    function openThreePartyTab() private returns(Table) {
        TableFactory tf = TableFactory(0x1001);
        Table table = tf.openTable("threeParty_info");
        return table;
    }

    //Add food info.
    function suppAdd(string foodNum,string suppId,string outDate,string ingredient,string origin,string foodImg) public returns(int256) {
        Table foodTab = openFoodTab();
        Entry foodEntry = foodTab.newEntry();
        foodEntry.set("foodNum",foodNum);
        foodEntry.set("suppId",suppId);
        foodEntry.set("outDate",outDate);
        foodEntry.set("ingredient",ingredient);
        foodEntry.set("origin",origin);
        foodEntry.set("foodImg",foodImg);
        int256 foodCount = foodTab.insert(foodNum,foodEntry);
        return foodCount;
    }
    function transAdd(string foodNum,string transId,string temp) public returns(int256) {
        Table foodTab = openFoodTab();
        Entry foodEntry = foodTab.newEntry();
        foodEntry.set("transId",transId);
        foodEntry.set("temp",temp);
        Condition cond = foodTab.newCondition();
        cond.EQ("foodNum", foodNum);
        int256 foodCount = foodTab.update(foodNum,foodEntry,cond);
        return foodCount;
    }
    function retailAdd(string foodNum,string retailId) public returns(int256) {
        Table foodTab = openFoodTab();
        Entry foodEntry = foodTab.newEntry();
        foodEntry.set("retailId",retailId);
        Condition cond = foodTab.newCondition();
        cond.EQ("foodNum", foodNum);
        int256 foodCount = foodTab.update(foodNum,foodEntry,cond);
        return foodCount;
    }
    //Add supplier info.
    //Use the fisco autority contorl to guarantee that only the suppliers can get access to this table.
    function suppInsert(string suppId,string suppName,string suppImg) public returns(int256) {
        Table suppTab = openSuppTab();
        Entry suppEntry = suppTab.newEntry();
        suppEntry.set("suppId",suppId);
        suppEntry.set("suppName",suppName);
        suppEntry.set("suppImg",suppImg);
        int256 suppCount = suppTab.insert(suppId,suppEntry);
        emit suppInsertEvent(suppCount);
        return suppCount;
    }

    //Add transport tablle.
    //Use the fisco autority contorl to guarantee that only the drivers can get access to this table.
    function transInsert(string transId,string carNum,string driverImg) public returns(int256) {
        Table transTab = openTransTab();
        Entry transEntry = transTab.newEntry();
        transEntry.set("transId",transId);
        transEntry.set("carNum",carNum);
        transEntry.set("driverImg",driverImg);
        int256 transCount = transTab.insert(transId,transEntry);
        emit transInsertEvent(transCount);
        return transCount;
    }

    //Add retailer tablle.
    //Use the fisco autority contorl to guarantee that only the retailers can get access to this table.
    function retailInsert(string retailId,string retailName,string retailImg) public returns(int256) {
        Table retailTab = openRetailTab();
        Entry retailEntry = retailTab.newEntry();
        retailEntry.set("retailId",retailId);
        retailEntry.set("retailName",retailName);
        retailEntry.set("retailImg",retailImg);
        int256 retailCount = retailTab.insert(retailId,retailEntry);
        emit retailInsertEvent(retailCount);
        return retailCount;
    }

    //Add three party tablle.
    //Use the fisco autority contorl to guarantee that only the supervises can get access to this table.
    function threePartyInsert(string threePartyId,string threePartyName,string threePartyImg) public returns(int256) {
        Table threePartyTab = openThreePartyTab();
        Entry threePartyEntry = threePartyTab.newEntry();
        threePartyEntry.set("threePartyId",threePartyId);
        threePartyEntry.set("threePartyName",threePartyName);
        threePartyEntry.set("threePartyImg",threePartyImg);
        int256 threePartyCount = threePartyTab.insert(threePartyId,threePartyEntry);
        emit threePartyInsertEvent(threePartyCount);
        return threePartyCount;
    }

    //Select supplier tablle.
    function suppSelect(string suppId) public constant returns(bytes32,bytes32) {
        Table suppTab = openSuppTab();
        Condition suppCond = suppTab.newCondition();
        suppCond.EQ("suppId", suppId);
        Entries suppEntries = suppTab.select(suppId,suppCond);
        Entry suppEntry = suppEntries.get(0);
        return (suppEntry.getBytes32("suppName"),suppEntry.getBytes32("suppImg"));
    }

    //Select transport table.
    function transSelect(string transId) public constant returns(bytes32,bytes32) {
        Table transTab = openTransTab();
        Condition transCond = transTab.newCondition();
        transCond.EQ("transId", transId);
        Entries transEntries = transTab.select(transId,transCond);
        Entry transEntry = transEntries.get(0);
        return (transEntry.getBytes32("carNum"),transEntry.getBytes32("driverImg"));
    }
    //Select retail table.
    function retailSelect(string retailId) public constant returns(bytes32,bytes32) {
        Table retailTab = openRetailTab();
        Condition retailCond = retailTab.newCondition();
        retailCond.EQ("retailId", retailId);
        Entries retailEntries = retailTab.select(retailId,retailCond);
        Entry retailEntry = retailEntries.get(0);
        return (retailEntry.getBytes32("retailName"),retailEntry.getBytes32("retailImg"));        
    }
    //Select three party table.
    function threePartySelect(string threePartyId) public constant returns(bytes32,bytes32) {
        Table threePartyTab = openThreePartyTab();
        Condition threePartyCond = threePartyTab.newCondition();
        threePartyCond.EQ("threePartyId", threePartyId);
        Entries threePartyEntries = threePartyTab.select(threePartyId,threePartyCond);
        Entry threePartyEntry = threePartyEntries.get(0);
        return (threePartyEntry.getBytes32("threePartyName"),threePartyEntry.getBytes32("threePartyImg"));
    }

    //Point out a three party randomly.
    //Suppose the scale of the three party = 3.
    function pointThreeParty() public returns(uint256) {
        uint256 threePartyId = uint256(keccak256(now))%3;
        return threePartyId;
    }
    //Delete Food Information.
    //After the customer buys the food, he can choose to operate this function to prevent from so many informations in the table.
    function foodDel(string foodNum) public returns(int) {
        Table foodTab = openFoodTab();
        Condition foodCond = foodTab.newCondition();
        foodCond.EQ("foodNum",foodNum);
        int count = foodTab.remove(foodNum,foodCond);
        return count;
    }
}