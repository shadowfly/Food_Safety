package org.fisco.bcos.controller;

import org.fisco.bcos.Component.Food;
import org.fisco.bcos.Component.Role;
import org.fisco.bcos.contract.InfoTable;
import org.fisco.bcos.web3j.crypto.Credentials;
import org.fisco.bcos.web3j.crypto.Keys;
import org.fisco.bcos.web3j.protocol.Web3j;
import org.fisco.bcos.web3j.protocol.core.methods.response.TransactionReceipt;
import org.fisco.bcos.web3j.tuples.generated.Tuple2;
import org.fisco.bcos.web3j.tuples.generated.Tuple7;
import org.fisco.bcos.web3j.tx.gas.StaticGasProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.math.BigInteger;
import java.util.Random;

import static org.fisco.bcos.constants.GasConstants.GAS_LIMIT;
import static org.fisco.bcos.constants.GasConstants.GAS_PRICE;

@Component
public class Web3Config {

    @Autowired
    private Web3j web3;

    @Autowired
    private IPFSConfig ipfs;

    private Food food;

    private InfoTable asset;

    public InfoTable assetInit() throws Exception {
        // 初始化Web3j对象
        BigInteger blockNumber = web3.getBlockNumber().send().getBlockNumber();
        System.out.println(blockNumber);

        // 初始化Credentials对象
        Credentials credentials = Credentials.create(Keys.createEcKeyPair());

        //首次部署合约
//        InfoTable asset = InfoTable.deploy(web3, credentials, new StaticGasProvider(GAS_PRICE, GAS_LIMIT)).send();

        //根据地址加载合约
        String contractAddress = "0x02bc24528a907aead7774d4c44d4b7233fba31b1";
        InfoTable asset = InfoTable.load(contractAddress, web3, credentials, new StaticGasProvider(GAS_PRICE, GAS_LIMIT));

        return asset;

    }

    public TransactionReceipt suppInsert(String suppId,String suppName,String resultHash) throws Exception {

        InfoTable asset = assetInit();

        TransactionReceipt suppInsert = asset.suppInsert(suppId,suppName,resultHash).send();

        return suppInsert;

    }

    public Role suppSelect (String suppId) throws Exception{

        InfoTable asset = assetInit();

        Tuple2<byte[],byte[]> resultSelect = asset.suppSelect(suppId).send();

        Role role = new Role();

        role.setRole("supp");
        role.setRoleId(suppId);
        role.setRoleName(new String(resultSelect.getValue1()));
        role.setFile(new String(resultSelect.getValue2()));

        return role;
    }

    public TransactionReceipt suppAdd(String foodNum,String suppId,String outDate,String ingredient,String origin,String foodImg) throws Exception {

        InfoTable asset = assetInit();

        TransactionReceipt suppAdd = asset.suppAdd(foodNum, suppId, outDate, ingredient, origin, foodImg).send();

        return suppAdd;

    }

    public TransactionReceipt transInsert(String transId, String carNum, String resultHash) throws Exception {

        InfoTable asset = assetInit();

        TransactionReceipt transInsert = asset.transInsert(transId, carNum, resultHash).send();

        return transInsert;
    }

    public Role transSelect(String transId) throws Exception{

        InfoTable asset = assetInit();

        Tuple2<byte[],byte[]> resultSelect = asset.transSelect(transId).send();

        Role role = new Role();
        role.setRole("trans");
        role.setRoleId(transId);
        role.setRoleName(new String(resultSelect.getValue1()));
        role.setFile(new String(resultSelect.getValue2()));

        return role;

    }

    public TransactionReceipt transAdd(String foodNum,String transId,String temp) throws Exception {

        InfoTable asset = assetInit();

        TransactionReceipt transAdd = asset.transAdd(foodNum, transId, temp).send();

        return transAdd;

    }

    public TransactionReceipt retailInsert(String retailId, String retailName, String resultHash) throws Exception {

        InfoTable asset = assetInit();

        TransactionReceipt retailInsert = asset.retailInsert(retailId, retailName, resultHash).send();

        return retailInsert;

    }

    public Role retailSelect(String retailId) throws Exception {

        InfoTable asset = assetInit();

        Tuple2<byte[],byte[]> resultSelect = asset.retailSelect(retailId).send();

        Role role = new Role();
        role.setRole("retail");
        role.setRoleId(retailId);
        role.setRoleName(new String(resultSelect.getValue1()));
        role.setFile(new String(resultSelect.getValue2()));

        return role;

    }

    public TransactionReceipt retailAdd(String foodNum,String retailId) throws Exception {

        InfoTable asset = assetInit();

        TransactionReceipt retailAdd = asset.retailAdd(foodNum, retailId).send();

        return retailAdd;

    }

    public TransactionReceipt threePartyInsert(String threePartyId, String threePartyName, String resultHash) throws Exception {

        InfoTable asset = assetInit();

        TransactionReceipt threePartyInsert = asset.threePartyInsert(threePartyId, threePartyName, resultHash).send();

        return threePartyInsert;
    }

    public Role threePartySelect (String threePartyId) throws Exception {

        InfoTable asset = assetInit();

        Tuple2<byte[],byte[]> resultSelect = asset.threePartySelect(threePartyId).send();

        Role role = new Role();
        role.setRole("threeParty");
        role.setRoleId(threePartyId);
        role.setRoleName(new String(resultSelect.getValue1()));
        role.setFile(new String(resultSelect.getValue2()));

        return role;

    }

    public Food foodSelect(String foodNum) throws Exception {

        InfoTable asset = assetInit();

        Tuple7<byte[],byte[],byte[],byte[],byte[],byte[],byte[]> resultSelect = asset.foodSelect(foodNum).send();

        food.setFoodNum(foodNum);
        food.setSuppId(new String(resultSelect.getValue1()));
        food.setTransId(new String(resultSelect.getValue2()));
        food.setRetailId(new String(resultSelect.getValue3()));
        food.setOutDate(new String(resultSelect.getValue4()));
        food.setIngredient(new String(resultSelect.getValue5()));
        food.setFoodImg(new String(resultSelect.getValue7()));
        food.setTemp(new String(resultSelect.getValue6()));

        return food;
    }

    public Role pointThreeParty() throws Exception {

        Random random = new Random(1024);
        int threePartyIdInt = random.nextInt(3);
        String threePartyId = String.valueOf(threePartyIdInt);

        InfoTable asset = assetInit();

        Tuple2<byte[],byte[]> resultSelect = asset.threePartySelect(threePartyId).send();

        Role role = new Role();
        role.setRole("threeParty");
        role.setRoleId(threePartyId);
        role.setRoleName(new String(resultSelect.getValue1()));
        role.setFile(new String(resultSelect.getValue2()));

        return role;

    }

    public TransactionReceipt foodDel(String foodNum) throws Exception {

        InfoTable asset = assetInit();

        TransactionReceipt result = asset.foodDel(foodNum).send();

        return result;
    }

}
