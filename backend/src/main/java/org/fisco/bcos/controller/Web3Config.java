package org.fisco.bcos.controller;

import org.fisco.bcos.Component.Food;
import org.fisco.bcos.Component.Role;
import org.fisco.bcos.contract.InfoTable;
import org.fisco.bcos.web3j.crypto.Credentials;
import org.fisco.bcos.web3j.crypto.Keys;
import org.fisco.bcos.web3j.protocol.Web3j;
import org.fisco.bcos.web3j.protocol.core.methods.response.TransactionReceipt;
import org.fisco.bcos.web3j.tuples.generated.Tuple2;
import org.fisco.bcos.web3j.tuples.generated.Tuple3;
import org.fisco.bcos.web3j.tuples.generated.Tuple7;
import org.fisco.bcos.web3j.tx.gas.StaticGasProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Constructor;
import java.math.BigInteger;
import java.util.List;
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
        String contractAddress = "0xce13b0fc32a121f82e7e3dc2a73275b19ab6c093";
        InfoTable asset = InfoTable.load(contractAddress, web3, credentials, new StaticGasProvider(GAS_PRICE, GAS_LIMIT));

        return asset;

    }

    public void suppInsert(String suppId,String suppName,String resultHash) throws Exception {

        InfoTable asset = assetInit();

        asset.suppInsert(suppId,suppName,resultHash).send();

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

    public void suppAdd(String foodNum,String suppId,String outDate,String ingredient,String origin,String foodImg) throws Exception {

        InfoTable asset = assetInit();

        asset.suppAdd(foodNum, suppId, outDate, ingredient, origin, foodImg).send();
    }

    public void transInsert(String transId, String carNum, String resultHash) throws Exception {

        InfoTable asset = assetInit();

        asset.transInsert(transId, carNum, resultHash).send();
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

    public void transAdd(String foodNum,String transId,String temp) throws Exception {

        InfoTable asset = assetInit();

        asset.transAdd(foodNum,transId,temp).send();

    }

    public void retailInsert(String retailId, String retailName, String resultHash) throws Exception {

        InfoTable asset = assetInit();

        asset.retailInsert(retailId, retailName, resultHash).send();

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

    public void retailAdd(String foodNum,String retailId) throws Exception {

        InfoTable asset = assetInit();

        asset.retailAdd(foodNum, retailId).send();
    }

    public void threePartyInsert(String threePartyId, String threePartyName, String resultHash, String company, String result) throws Exception {

        InfoTable asset = assetInit();

        asset.threePartyInsert(threePartyId, threePartyName, resultHash,company,result).send();
    }

//    public Role threePartySelect (String threePartyId) throws Exception {
//
//        InfoTable asset = assetInit();
//
//        Tuple3<List<byte[]>, List<byte[]>, List<byte[]>> resultSelect = asset.threePartySelect(threePartyId).send();
//
//        Role role = new Role();
//        role.setRole("threeParty");
//        role.setRoleId(threePartyId);
//        role.setRoleName(new String(resultSelect.getValue1()));
//        role.setFile(new String(resultSelect.getValue2()));
//
//        return role;
//
//    }

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
    //TODO
//    public Role pointThreeParty() throws Exception {
//
//        Random random = new Random(1024);
//        int threePartyIdInt = random.nextInt(3);
//        String threePartyId = String.valueOf(threePartyIdInt);
//
//        InfoTable asset = assetInit();
//
//        Tuple2<byte[],byte[]> resultSelect = asset.threePartySelect(threePartyId).send();
//
//        Role role = new Role();
//        role.setRole("threeParty");
//        role.setRoleId(threePartyId);
//        role.setRoleName(new String(resultSelect.getValue1()));
//        role.setFile(new String(resultSelect.getValue2()));
//
//        return role;
//
//    }
}
