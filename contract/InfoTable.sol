pragma solidity ^0.4.24;

import "./Table.sol";

contract InfoTable {

    constructor() public {
       createSupplier(); 
       createTrans(); 
    }
    
    function createSupplier() private {
        TableFactory tf = TableFactory(0x1001);
        tf.createTable("supp_info","suppId","retailId,foodNum,outDate,transactNum,suppName,origin,suppImg");
    } 

    function openSuppTab() private returns(Table) {
        TableFactory tf = TableFactory(0x1001);
        Table table = tf.openTable("supp_info");
        return table;
    }

    function createTrans() private {
        TableFactory tf = TableFactory(0x1001);
        tf.createTable("trans_info","transId","suppId,driver,carNum,transDate,foodStatus,temp,driverImg");
    } 

    function openTransTab() private returns(Table) {
        TableFactory tf = TableFactory(0x1001);
        Table table = tf.openTable("trans_info");
        return table;
    }

    function suppAdd(string suppId,string retailId) public returns(int256) {
        Table suppTab = openSuppTab();

        Entry suppEntry = suppTab.newEntry();

        suppEntry.set("suppId",suppId);
        suppEntry.set("retailId",retailId);

        int256 countSupp = suppTab.insert(suppId,suppEntry);
        return countSupp;
    }

    function transAdd(string transId,string suppId) public returns(int256) {
        Table transTab = openTransTab();

        Entry transEntry = transTab.newEntry();

        transEntry.set("transId",transId);
        transEntry.set("suppId",suppId);

        int256 countTrans = transTab.insert(transId,transEntry);
        return countTrans;
    }

    function suppGet(string suppId) public returns(int256) {
        Table suppTab = openSuppTab();

        Condition suppCond = suppTab.newCondition();

        Entries suppEntries = suppTab.select(suppId,suppCond);

        return suppEntries.size();
    }

    function transGet(string transId) public returns(Entries) {
    Table transTab = openTransTab();

    Condition transCond = transTab.newCondition();

    Entries transEntries = transTab.select(transId,transCond);

    return transEntries;
    }
}