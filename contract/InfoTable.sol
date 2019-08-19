pragma solidity ^0.4.24;

import "./Table.sol";
//Suppose: One key reflects one record; It meets the reality of food safety.
contract InfoTable {

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
        tf.createTable("food_info","foodNum","suppId,transId,retailId,outDate,ingredient,temp,foodImg");
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
        tf.createTable("threeParty_info","threePartyId","threePartyName,threePartyImg,company,result");
    }
    function openThreePartyTab() private returns(Table) {
        TableFactory tf = TableFactory(0x1001);
        Table table = tf.openTable("threeParty_info");
        return table;
    }

    //Add food info.
    function suppAdd(string foodNum,string suppId,string outDate,string ingredient,string origin,string foodImg) public {
        Table foodTab = openFoodTab();
        Entry foodEntry = foodTab.newEntry();
        foodEntry.set("foodNum",foodNum);
        foodEntry.set("suppId",suppId);
        foodEntry.set("outDate",outDate);
        foodEntry.set("ingredient",ingredient);
        foodEntry.set("foodImg",foodImg);
        foodTab.insert(foodNum,foodEntry);
    }
    function transAdd(string foodNum,string transId,string temp) public {
        Table foodTab = openFoodTab();
        Entry foodEntry = foodTab.newEntry();
        foodEntry.set("transId",transId);
        foodEntry.set("temp",temp);
        Condition cond = foodTab.newCondition();
        cond.EQ("foodNum", foodNum);
        foodTab.update(foodNum,foodEntry,cond);
    }
    function retailAdd(string foodNum,string retailId) public {
        Table foodTab = openFoodTab();
        Entry foodEntry = foodTab.newEntry();
        foodEntry.set("retailId",retailId);
        Condition cond = foodTab.newCondition();
        cond.EQ("foodNum", foodNum);
        foodTab.update(foodNum,foodEntry,cond);
    }
    //Add supplier info.
    //Use the fisco autority contorl to guarantee that only the suppliers can get access to this table.
    function suppInsert(string suppId,string suppName,string suppImg) public {
        Table suppTab = openSuppTab();
        Entry suppEntry = suppTab.newEntry();
        suppEntry.set("suppId",suppId);
        suppEntry.set("suppName",suppName);
        suppEntry.set("suppImg",suppImg);
        suppTab.insert(suppId,suppEntry);
    }

    //Add transport table.
    //Use the fisco autority contorl to guarantee that only the drivers can get access to this table.
    function transInsert(string transId,string carNum,string driverImg) public {
        Table transTab = openTransTab();
        Entry transEntry = transTab.newEntry();
        transEntry.set("transId",transId);
        transEntry.set("carNum",carNum);
        transEntry.set("driverImg",driverImg);
        transTab.insert(transId,transEntry);
    }

    //Add retailer table.
    //Use the fisco autority contorl to guarantee that only the retailers can get access to this table.
    function retailInsert(string retailId,string retailName,string retailImg) public {
        Table retailTab = openRetailTab();
        Entry retailEntry = retailTab.newEntry();
        retailEntry.set("retailId",retailId);
        retailEntry.set("retailName",retailName);
        retailEntry.set("retailImg",retailImg);
        retailTab.insert(retailId,retailEntry);
    }

    //Add three party table.
    //Use the fisco autority contorl to guarantee that only the supervises can get access to this table.
    function threePartyInsert(string threePartyId,string threePartyName,string threePartyImg,string company,string result) public {
        Table threePartyTab = openThreePartyTab();
        Entry threePartyEntry = threePartyTab.newEntry();
        threePartyEntry.set("threePartyId",threePartyId);
        threePartyEntry.set("threePartyName",threePartyName);
        threePartyEntry.set("threePartyImg",threePartyImg);
        threePartyEntry.set("company",company);
        threePartyEntry.set("result",result);
        threePartyTab.insert(threePartyId,threePartyEntry);
    }
    //Select supplier table.
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
    function threePartySelect(string threePartyId) public constant returns(bytes32[],bytes32[],bytes32[]) {
        Table threePartyTab = openThreePartyTab();
        Condition threePartyCond = threePartyTab.newCondition();
        Entries threePartyEntries = threePartyTab.select(threePartyId,threePartyCond);
        bytes32[] memory name_list = new bytes32[](uint256(threePartyEntries.size()));
        bytes32[] memory company_list = new bytes32[](uint256(threePartyEntries.size()));
        bytes32[] memory result_list = new bytes32[](uint256(threePartyEntries.size()));
        for(int i=0; i<threePartyEntries.size(); ++i) {
            Entry entry = threePartyEntries.get(i);
            name_list[uint256(i)] = entry.getBytes32("threePartyName");
            company_list[uint256(i)] = entry.getBytes32("company");
            result_list[uint256(i)] = entry.getBytes32("result");
        }
        return (name_list,company_list,result_list);
    }
    //Select latest food info.
    function foodSelect(string foodNum) public constant returns(bytes32,bytes32,bytes32,bytes32,bytes32,bytes32,bytes32){
        Table foodTab = openFoodTab();
        Condition foodCond = foodTab.newCondition();
        foodCond.EQ("foodNum",foodNum);
        Entries foodEntries = foodTab.select(foodNum,foodCond);
        Entry foodEntry = foodEntries.get(0);
        return (foodEntry.getBytes32("suppId"),foodEntry.getBytes32("transId"),foodEntry.getBytes32("retailId"),foodEntry.getBytes32("outDate"),foodEntry.getBytes32("ingredient"),foodEntry.getBytes32("temp"),foodEntry.getBytes32("foodImg"));
    }
}